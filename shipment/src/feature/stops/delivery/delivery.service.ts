import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Shipment } from 'src/domain/entity/shipment';
import { Status, Stop, STOPSTATUS, StopType } from 'src/domain/entity/stop';
import { DataSource } from 'typeorm';

@Injectable()
export class DeliveryService {
    constructor(private readonly dataSource: DataSource) { }

    async delivery(shipmentId: string, stopId: string) {
        if (!shipmentId || !stopId) {
            throw new BadRequestException('Ids are not present');
        }
        const shipmentRepo = this.dataSource.getRepository(Shipment);
        const stopRepo = this.dataSource.getRepository(Stop);
        const isShipment = await shipmentRepo.findOne({ where: { id: shipmentId } });
        if (!isShipment) {
            throw new NotFoundException("Shipment not found");
        }

        const isStop = await stopRepo.find({ where: { shipment: { id: shipmentId } }, order: { sequenceNumber: "ASC" } });
        if (!isStop) {
            throw new NotFoundException("STops not found");
        }
        let shipmentStop = isStop[0];
        for (const stop of isStop) {
            if(stop.shipmentStatus === 'Pending' && shipmentStop.shipmentStatus === 'Pending'){
                throw new BadRequestException("Previous delivery is pending");
            }
            if (stopId === stop.id && stop.status === STOPSTATUS.ARRIVED && stop.shipmentStatus === Status.Pending && stop.type === StopType.PICKUP) {
                throw new BadRequestException("Cannot delivery at pickup location");
            }

            if (stopId === stop.id && stop.status === STOPSTATUS.DEPARTED && stop.shipmentStatus === Status.Pending && stop.type === StopType.DELIVERY) {
                throw new BadRequestException("Cannot delivery as stop is already departed");
            }

            if (stopId === stop.id && stop.status === STOPSTATUS.ARRIVED && stop.shipmentStatus === Status.Pending && stop.type === StopType.DELIVERY) {
                await stopRepo.update({ id: stopId }, { shipmentStatus: Status.Completed });
                return {message: "Delivery succesful"};
            }

            if (stopId === stop.id && stop.status !== STOPSTATUS.ARRIVED && stop.shipmentStatus === Status.Pending && stop.type === StopType.DELIVERY) {
                throw new BadRequestException('The shipment has not arrived at stop');
            }
            shipmentStop = stop;
        }
        
        throw new BadRequestException('Cannot delivery at non existing stop');

    }
}