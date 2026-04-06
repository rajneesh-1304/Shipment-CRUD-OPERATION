// import {
//     BadRequestException,
//     Injectable,
//     NotFoundException,
// } from '@nestjs/common';
// import { EntityManager } from '@mikro-orm/postgresql';
// import { Shipment } from 'src/domain/entity/shipment.entity';
// import { Stop, STOPSTATUS } from 'src/domain/entity/stop.entity';
// import { StopDomain } from 'src/domain/logic/stop.domain';
// import { StopTransformer } from 'src/domain/transformer/stop.transformer';

// @Injectable()
// export class ArriveService {
//     constructor(private readonly em: EntityManager) { }

//     async arrive(shipmentId: string, stopId: string, tenantId: string) {

//         if (!shipmentId || !stopId) {
//             throw new BadRequestException('Ids are required');
//         }

//         const shipment = await this.em.findOne(Shipment, { id: shipmentId, tenant: tenantId });
//         if (!shipment) {
//             throw new NotFoundException("Shipment not found");
//         }

//         const stops = await this.em.find(
//             Stop,
//             { shipment: { id: shipmentId, tenant: tenantId } },
//             { populate: ['shipment'], orderBy: { sequenceNumber: 'ASC' } }
//         );

//         if (!stops.length) {
//             throw new NotFoundException("Stops not found");
//         }

//         const result = StopDomain.getStop(stops, stopId);
//         const stop = result.stop;
//         const idx = result.idx;
//         const previousCompleted = StopDomain.isPreviousCompleted(stops, idx);
//         StopDomain.checkArrive(stop, previousCompleted);

//         stop.status = STOPSTATUS.ARRIVED;

//         await this.em.flush();

//         return StopTransformer.response(stop);
//     }
// }