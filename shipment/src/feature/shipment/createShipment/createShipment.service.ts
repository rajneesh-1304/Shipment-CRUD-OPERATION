import { MikroORM } from '@mikro-orm/postgresql';
import {
    Injectable,
} from '@nestjs/common';
import { Shipment } from '../../../domain/entity/shipment.entity';
import { Stop } from '../../../domain/entity/stop.entity';
import { ShipmentDomain } from '../../../domain/logic/shipment.domain';
import { ShipmentTransformer } from '../../../domain/transformer/shipment.transformer';

@Injectable()
export class CreateShipmentService {
    constructor(private readonly orm: MikroORM) { }

    async createShipment(data: any, schema: string ) {
    const shipmentDomain = new ShipmentDomain;
    shipmentDomain.checkCreate(data);
    const em = this.orm.em.getContext();
    const shipment = em.create(Shipment, {
        title: data.title,
    },{schema: schema});

    data.stops.forEach(stop => {
        em.create(Stop, {
            sequenceNumber: stop.sequenceNumber,
            type: stop.type,
            shipment,
        },{schema: schema});
    });

    await em.flush();

    return ShipmentTransformer.response(shipment);
}
}