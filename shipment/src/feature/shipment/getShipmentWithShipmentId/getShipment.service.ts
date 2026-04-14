import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Shipment } from 'src/domain/entity/shipment.entity';

@Injectable()
export class GetShipmentWithShipmentIdService {
    constructor(private readonly em: EntityManager,) { }

    async getShipmentWithShipmentId(id: string, schema: string) {
        const shipment = await this.em.findOne(Shipment,{id: id} ,{schema: schema, populate: ['stops']});
        
        return shipment
    }
}