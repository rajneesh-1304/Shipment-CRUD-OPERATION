// import { EntityManager } from '@mikro-orm/postgresql';
// import {
//     BadRequestException,
//     ConflictException,
//     Injectable,
// } from '@nestjs/common';
// import { Shipment } from 'src/domain/entity/shipment.entity';
// import { Stop } from 'src/domain/entity/stop.entity';
// import { ShipmentDomain } from 'src/domain/logic/shipment.domain';
// import { ShipmentTransformer } from 'src/domain/transformer/shipment.transformer';

// @Injectable()
// export class CreateShipmentService {
//     constructor(private readonly em: EntityManager) { }

//     async createShipment(data: any, tenantId: string) {
    
//     ShipmentDomain.checkCreate(data);

//     const exists = await this.em.findOne(Shipment, { title: data.title, tenant: tenantId });
//     if (exists) {
//         throw new ConflictException("Already exists");
//     }

//     const shipment = this.em.create(Shipment, {
//         title: data.title,
//         tenant: tenantId
//     });

//     data.stops.forEach(stop => {
//         this.em.create(Stop, {
//             sequenceNumber: stop.sequenceNumber,
//             type: stop.type,
//             shipment,
//             tenant: tenantId
//         });
//     });

//     await this.em.flush();

//     return ShipmentTransformer.response(shipment);
// }
// }