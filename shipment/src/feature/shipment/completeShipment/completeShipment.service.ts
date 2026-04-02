import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { Shipment, STATUS } from 'src/domain/entity/shipment';
import { Status, Stop } from 'src/domain/entity/stop';
import { DataSource } from 'typeorm';

@Injectable()
export class CompleteShipmentService {
    constructor(private readonly dataSource: DataSource) { }

    async completeShipment(shipmentId: string) {
        if (!shipmentId) {
            throw new BadRequestException('Shipment id not found');
        }
        const shipmentRepo = this.dataSource.getRepository(Shipment);
        const stopRepo = this.dataSource.getRepository(Stop);
        const isPresent = await shipmentRepo.findOne({ where: { id: shipmentId } });
        if (!isPresent) {
            throw new BadRequestException("Shipment not found");
        }
        const stops = await stopRepo.find({where: {shipment:{id: shipmentId}}});
        if(!stops){
            throw new BadRequestException("No stop is present for shipment");
        }

        for (const stop of stops) {
                if(stop.shipmentStatus !== Status.Completed){
                    throw new BadRequestException('Some stop has pending shipment ');
                }
            }
        await shipmentRepo.update({id: shipmentId}, {status: STATUS.COMPLETED});   
        return {message: "Shipment created successfully"};
        }
    }
