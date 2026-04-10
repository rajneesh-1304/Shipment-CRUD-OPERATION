import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { MikroORM } from '@mikro-orm/postgresql';
import { Shipment } from '../../../domain/entity/shipment.entity';
import { Stop, STOPSTATUS } from '../../../domain/entity/stop.entity';
import { StopDomain } from '../../../domain/logic/stop.domain';
import { StopTransformer } from '../../../domain/transformer/stop.transformer';

@Injectable()
export class ArriveService {
    constructor(private readonly orm: MikroORM) { }

    async arrive(shipmentId: string, stopId: string, schema: string) {

        if (!shipmentId || !stopId) {
            throw new BadRequestException('Ids are required');
        }
        const em = this.orm.em.getContext();

        const shipment = await em.findOne(Shipment, { id: shipmentId }, {schema: schema});
        if (!shipment) {
            throw new NotFoundException("Shipment not found");
        }

        const stops = await em.find(
            Stop,
            { shipment: { id: shipmentId } },
            { populate: ['shipment'], orderBy: { sequenceNumber: 'ASC' }, schema: schema}
        );

        if (!stops.length) {
            throw new NotFoundException("Stops not found");
        }

        const stopDomain = new StopDomain();
        const result = stopDomain.getStop(stops, stopId);
        const stop = result.stop;
        const idx = result.idx;
        const previousCompleted = stopDomain.isPreviousCompleted(stops, idx);
        stopDomain.checkArrive(stop, previousCompleted);

        stop.status = STOPSTATUS.ARRIVED;

        await em.flush();

        return StopTransformer.response(stop);
    }
}