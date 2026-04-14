import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Shipment } from 'src/domain/entity/shipment.entity';

@Injectable()
export class GetShipmentService {
    constructor(private readonly em: EntityManager,) { }

    async getShipments(schema: string) {
        const shipments = await this.em.findAll(Shipment, {schema: schema});
        
        return shipments
    }
}