import { EntityManager } from '@mikro-orm/postgresql';
import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { Shipment, STATUS } from 'src/domain/entity/shipment.entity';
import { Status, Stop } from 'src/domain/entity/stop.entity';
import { ShipmentDomain } from 'src/domain/logic/shipment.domain';

@Injectable()
export class CompleteShipmentService {
    constructor(private readonly em: EntityManager) { }

    async completeShipment(id: string, tenantId: string) {

        const shipment = await this.em.findOne(Shipment, { id, tenant: tenantId });
        if (!shipment) 
            {throw new BadRequestException("Shipment not found");}

        const stops = await this.em.find(Stop, { shipment: { id, tenant:tenantId } });

        ShipmentDomain.checkCompleteShipment(stops, shipment.status);

        shipment.status = STATUS.COMPLETED;

        await this.em.flush();

        return { message: "Shipment completed successfully" };
    }
}