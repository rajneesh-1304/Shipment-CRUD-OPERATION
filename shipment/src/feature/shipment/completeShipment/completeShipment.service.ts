import { EntityManager } from '@mikro-orm/postgresql';
import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { Shipment, STATUS } from 'src/domain/entity/shipment.entity';
import { Status, Stop } from 'src/domain/entity/stop.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class CompleteShipmentService {
    constructor(private readonly em: EntityManager) { }

    async completeShipment(shipmentId: string) {
        if (!shipmentId) {
            throw new BadRequestException('Shipment id not found');
        }
        const isPresent = await this.em.findOne(Shipment,{  id: shipmentId });
        if (!isPresent) {
            throw new BadRequestException("Shipment not found");
        }
        const stops = await this.em.find(Stop, { shipment: { id: shipmentId }  });
        if (!stops) {
            throw new BadRequestException("No stop is present for shipment");
        }

        for (const stop of stops) {
            if (stop.shipmentStatus !== Status.Completed) {
                throw new BadRequestException('Some stop has pending shipment ');
            }
        }
        if (isPresent.status === STATUS.COMPLETED) {
            throw new ConflictException("Shipment already completed");
        }
        Object.assign(Shipment, { status: STATUS.COMPLETED });
        await this.em.flush();
        return { message: "Shipment completed successfully" };
    }
}