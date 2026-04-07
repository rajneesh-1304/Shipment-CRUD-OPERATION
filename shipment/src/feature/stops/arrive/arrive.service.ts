import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { EntityManager, MikroORM } from '@mikro-orm/postgresql';
import { Shipment } from 'src/domain/entity/shipment.entity';
import { Stop, STOPSTATUS } from 'src/domain/entity/stop.entity';
import { StopDomain } from 'src/domain/logic/stop.domain';
import { StopTransformer } from 'src/domain/transformer/stop.transformer';

@Injectable()
export class ArriveService {
    constructor(private readonly orm: MikroORM) { }

    async arrive(shipmentId: string, stopId: string, tenantName: string) {

        if (!shipmentId || !stopId) {
            throw new BadRequestException('Ids are required');
        }
        const em = this.orm.em;

        const shipment = await em.findOne(Shipment, { id: shipmentId }, {schema: tenantName});
        if (!shipment) {
            throw new NotFoundException("Shipment not found");
        }

        const stops = await em.find(
            Stop,
            { shipment: { id: shipmentId } },
            { populate: ['shipment'], orderBy: { sequenceNumber: 'ASC' }, schema: tenantName }
        );

        if (!stops.length) {
            throw new NotFoundException("Stops not found");
        }

        const result = StopDomain.getStop(stops, stopId);
        const stop = result.stop;
        const idx = result.idx;
        const previousCompleted = StopDomain.isPreviousCompleted(stops, idx);
        StopDomain.checkArrive(stop, previousCompleted);

        stop.status = STOPSTATUS.ARRIVED;

        await em.flush();

        return StopTransformer.response(stop);
    }
}