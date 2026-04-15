import { MikroORM } from '@mikro-orm/postgresql';
import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Shipment } from '../../../domain/entity/shipment.entity';

@Injectable()
export class CompleteShipmentService {
    constructor(private readonly orm: MikroORM) { }

    async completeShipment(id: string, schema: string) {
        const em = this.orm.em.getContext();
        if (!id) {
            throw new BadRequestException('ShipmentId is required')
        }

        const shipment = await em.findOne(Shipment, { id }, { schema: schema, populate: ['stops'], });
        if (!shipment) { throw new NotFoundException("Shipment not found"); }

        shipment.checkCompleteShipment();

        await em.flush();

        return { message: "Shipment completed successfully" };
    }
}