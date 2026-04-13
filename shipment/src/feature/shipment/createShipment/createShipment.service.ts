import { MikroORM } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Shipment } from '../../../domain/entity/shipment.entity';
import { Stop } from '../../../domain/entity/stop.entity';
import { ShipmentTransformer } from '../../../domain/transformer/shipment.transformer';

@Injectable()
export class CreateShipmentService {
  constructor(private readonly orm: MikroORM) { }

  async createShipment(data: any, schema: string) {
    const em = this.orm.em.getContext();

    const shipment = em.create(Shipment, {
      title: data.title,
    }, { schema });

    for (const stopData of data.stops) {
        const stop = em.create(Stop, {
            sequenceNumber: stopData.sequenceNumber,
            type: stopData.type,
            shipment: shipment, 
        }, { schema });
        shipment.stops.push(stop);
    }

    shipment.checkCreate();
    await em.flush();

    return ShipmentTransformer.response(shipment);
  }
}