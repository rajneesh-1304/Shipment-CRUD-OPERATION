import { EntityManager, MikroORM } from '@mikro-orm/postgresql';
import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Shipment, STATUS } from '../../../domain/entity/shipment.entity';
import { Stop } from '../../../domain/entity/stop.entity';
import { ShipmentDomain } from '../../../domain/logic/shipment.domain';

@Injectable()
export class CompleteShipmentService {
    constructor(private readonly orm: MikroORM) { }

    async completeShipment(id: string, schema: string) {
        const em = this.orm.em.getContext();
        if(!id){
            throw new BadRequestException('ShipmentId is required')
        }

        const shipment = await em.findOne(Shipment, { id}, {schema : schema});
        if (!shipment) 
            {throw new NotFoundException("Shipment not found");}

        const stops = await em.find(Stop, { shipment: { id}}, {schema: schema});
        const shipmentDomain = new ShipmentDomain();
        shipmentDomain.checkCompleteShipment(stops, shipment.status);

        shipment.status = STATUS.COMPLETED;

        await em.flush();

        return { message: "Shipment completed successfully" };
    }
}