import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Shipment } from 'src/domain/entity/shipment.entity';
import { Status, Stop, STOPSTATUS } from 'src/domain/entity/stop.entity';
import { StopDomain } from 'src/domain/logic/stop.domain';
import { StopTransformer } from 'src/domain/transformer/stop.transformer';

@Injectable()
export class DeliveryService {
    constructor(private readonly em: EntityManager) { }

    async delivery(shipmentId: string, stopId: string) {

        if (!shipmentId || !stopId) {
            throw new BadRequestException('Ids are required');
        }

        const shipment = await this.em.findOne(Shipment, { id: shipmentId });
        if (!shipment) {
            throw new NotFoundException("Shipment not found");
        }

        const stops = await this.em.find(
            Stop,
            { shipment: { id: shipmentId } },
            { populate: ['shipment'], orderBy: { sequenceNumber: 'ASC' } }
        );

        const result = StopDomain.getStop(stops, stopId);
        const stop = result.stop;
        const idx = result.idx;
        const previousCompleted = StopDomain.isPreviousCompleted(stops, idx);
        StopDomain.checkDelivery(stop, previousCompleted);

        stop.shipmentStatus = Status.Completed;
        stop.status = STOPSTATUS.DEPARTED;

        await this.em.flush();

        return StopTransformer.response(stop);
    }
}