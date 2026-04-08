import { EntityManager, MikroORM } from '@mikro-orm/postgresql';
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
    constructor(private readonly orm: MikroORM) { }

    async completeShipment(id: string) {
        const em = this.orm.em.getContext();

        const shipment = await em.findOne(Shipment, { id});
        if (!shipment) 
            {throw new BadRequestException("Shipment not found");}

        const stops = await em.find(Stop, { shipment: { id} });

        ShipmentDomain.checkCompleteShipment(stops, shipment.status);

        shipment.status = STATUS.COMPLETED;

        await em.flush();

        return { message: "Shipment completed successfully" };
    }
}