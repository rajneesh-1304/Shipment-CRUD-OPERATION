import { EntityManager, MikroORM } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Shipment } from '../../../domain/entity/shipment.entity';
import { Status, Stop, STOPSTATUS } from '../../../domain/entity/stop.entity';
import { StopTransformer } from '../../../domain/transformer/stop.transformer';
import { StopDomain } from '../../../domain/domainlogic/stop.domain';

@Injectable()
export class DeliveryService {
    constructor(private readonly orm: MikroORM) { }

    async delivery(shipmentId: string, stopId: string, schema: string) {

        if (!shipmentId || !stopId) {
            throw new BadRequestException('Ids are required');
        }
        const em = this.orm.em.getContext();

        const shipment = await em.findOne(Shipment, { id: shipmentId }, {schema: schema, populate: ['stops']});
        if (!shipment) {
            throw new NotFoundException("Shipment not found");
        }

        const stop = shipment.stops.find(s => s.id === stopId);
        if (!stop) throw new NotFoundException("Stop not found");

        if (!shipment.stops.length) {
            throw new NotFoundException("Stops not found");
        }

        shipment.checkPrevious(stop.sequenceNumber);
        stop.checkDelivery();


        await em.flush();

        return StopTransformer.response(stop);
    }
}