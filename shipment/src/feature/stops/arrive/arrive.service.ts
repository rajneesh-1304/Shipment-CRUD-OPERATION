import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { MikroORM } from '@mikro-orm/postgresql';
import { Shipment } from '../../../domain/entity/shipment.entity';
import { StopTransformer } from '../../../domain/transformer/stop.transformer';

@Injectable()
export class ArriveService {
    constructor(private readonly orm: MikroORM) { }

    async arrive(shipmentId: string, stopId: string, schema: string) {

        if (!shipmentId || !stopId) {
            throw new BadRequestException('Ids are required');
        }
        const em = this.orm.em.getContext();

        const shipment = await em.findOne(Shipment, { id: shipmentId }, { schema: schema, populate: ['stops'] });
        if (!shipment) {
            throw new NotFoundException("Shipment not found");
        }

        const stop = shipment.stops.find(s => s.id === stopId);
        if (!stop) throw new NotFoundException("Stop not found");

        if (!shipment.stops.length) {
            throw new NotFoundException("Stops not found");
        }

        shipment.checkPrevious(stop.sequenceNumber);
        stop.checkArrive();

        await em.flush();

        return StopTransformer.response(stop);
    }
}