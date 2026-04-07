import { EntityManager, MikroORM } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Shipment } from 'src/domain/entity/shipment.entity';
import { Status, Stop, STOPSTATUS } from 'src/domain/entity/stop.entity';
import { StopDomain } from 'src/domain/logic/stop.domain';
import { StopTransformer } from 'src/domain/transformer/stop.transformer';

@Injectable()
export class DeliveryService {
    constructor(private readonly orm: MikroORM) { }

    async delivery(shipmentId: string, stopId: string, tenantName: string) {

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

        const result = StopDomain.getStop(stops, stopId);
        const stop = result.stop;
        const idx = result.idx;
        const previousCompleted = StopDomain.isPreviousCompleted(stops, idx);
        StopDomain.checkDelivery(stop, previousCompleted);

        stop.shipmentStatus = Status.Completed;
        stop.status = STOPSTATUS.DEPARTED;

        await em.flush();

        return StopTransformer.response(stop);
    }
}