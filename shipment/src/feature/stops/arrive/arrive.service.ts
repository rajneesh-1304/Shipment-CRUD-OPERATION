import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Shipment } from 'src/domain/entity/shipment';
import { Status, Stop, STOPSTATUS } from 'src/domain/entity/stop';
import { DataSource } from 'typeorm';

@Injectable()
export class ArriveService {
    constructor(private readonly dataSource: DataSource) { }

    async arrive(shipmentId: string, stopId: string) {
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
            throw new NotFoundException("Stops not found");
        }
        let state = false;
        for (const stop of isStop) {
            console.log(stopId, stop.id, stop.status, 'this is the answer');
            if(stopId === stop.id && stop.status === STOPSTATUS.ARRIVED){
                throw new BadRequestException('Cannot arrive at already arrived location');
            }

            if (stopId === stop.id && stop.status === STOPSTATUS.TRANSIT && stop.shipmentStatus === Status.Pending  && !state) {
                await stopRepo.update({ id: stopId }, { status: STOPSTATUS.ARRIVED });
                return {message: "Arrived at location"};
            }

            if (stopId === stop.id && stop.status === STOPSTATUS.DEPARTED && stop.shipmentStatus === Status.Pending ) {
                throw new BadRequestException("Cannot arrive at departed location");
            } 
            if(stop.status === 'DEPARTED' ){
                state =true;
            }
        }
        
        throw new BadRequestException('Cannot arrive at non existing stop');

    }
}