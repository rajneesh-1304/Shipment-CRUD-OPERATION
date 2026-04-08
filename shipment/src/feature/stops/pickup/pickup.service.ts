import { EntityManager, MikroORM } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Shipment } from 'src/domain/entity/shipment.entity';
import { Status, Stop, STOPSTATUS } from 'src/domain/entity/stop.entity';
import { StopDomain } from 'src/domain/logic/stop.domain';
import { StopTransformer } from 'src/domain/transformer/stop.transformer';

@Injectable()
export class PickupService {
    constructor(private readonly orm: MikroORM) { }

    async pickup(shipmentId: string, stopId: string) {
        if (!shipmentId || !stopId) {
            throw new BadRequestException('Ids are required');
        }
        const em = this.orm.em.getContext();

        const shipment = await em.findOne(Shipment, { id: shipmentId });
        if (!shipment) {
            throw new NotFoundException("Shipment not found");
        }

        const stops = await em.find(
            Stop,
            { shipment: { id: shipmentId } }, 
            { populate: ['shipment'], orderBy: { sequenceNumber: 'ASC' } }
        );

        const result = StopDomain.getStop(stops, stopId);
        const stop = result.stop;
        const idx = result.idx;
        const previousCompleted = StopDomain.isPreviousCompleted(stops, idx);
        StopDomain.checkPickup(stop, previousCompleted);

        stop.shipmentStatus = Status.Completed;
        stop.status = STOPSTATUS.DEPARTED;

        await em.flush();

        return StopTransformer.response(stop);
    }
}