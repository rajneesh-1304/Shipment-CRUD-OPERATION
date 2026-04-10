import { EntityManager, MikroORM } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Shipment } from '../../../domain/entity/shipment.entity';
import { Status, Stop, STOPSTATUS } from '../../../domain/entity/stop.entity';
import { StopDomain } from '../../../domain/logic/stop.domain';
import { StopTransformer } from '../../../domain/transformer/stop.transformer';

@Injectable()
export class DeliveryService {
    constructor(private readonly orm: MikroORM) { }

    async delivery(shipmentId: string, stopId: string, schema: string) {

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
            { populate: ['shipment'], orderBy: { sequenceNumber: 'ASC' }, schema: schema }
        );
        const stopDomain = new StopDomain();
        const result = stopDomain.getStop(stops, stopId);
        const stop = result.stop;
        const idx = result.idx;
        const previousCompleted = stopDomain.isPreviousCompleted(stops, idx);
        stopDomain.checkDelivery(stop, previousCompleted);

        stop.shipmentStatus = Status.Completed;
        stop.status = STOPSTATUS.DEPARTED;

        await em.flush();

        return StopTransformer.response(stop);
    }
}