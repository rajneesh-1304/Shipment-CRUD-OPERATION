import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { Shipment } from 'src/domain/entity/shipment';
import { Stop } from 'src/domain/entity/stop';
import { DataSource } from 'typeorm';

@Injectable()
export class CreateShipmentService {
    constructor(private readonly dataSource: DataSource) { }

    async createShipment(data: any) {
        if (!data.title) {
            throw new BadRequestException('Title is required');
        }

        if (!data.stops || data.stops.length === 0) {
            throw new BadRequestException('Shipment requires at least one stop');
        }
        const shipmentRepo = this.dataSource.getRepository(Shipment);
        const stopRepo = this.dataSource.getRepository(Stop);
        const isPresent = await shipmentRepo.findOne({ where: { title: data.title } });
        if (isPresent) {
            throw new ConflictException("Shipment already exists");
        }
        const stops = data.stops;
        const sequenceNumbers = new Set();

        for (const stop of stops) {
            if (stop.sequenceNumber) {
                if (sequenceNumbers.has(stop.sequenceNumber)) {
                    throw new BadRequestException('Sequence number cannot be duplicate');
                }
                sequenceNumbers.add(stop.sequenceNumber);
            }
        }

        const shipment = shipmentRepo.create({
            title: data.title,
            totalStops: data.totalStops
        });
        await shipmentRepo.save(shipment);

        const promises = stops.map((stop: any) => stopRepo.create({
            sequenceNumber: stop.sequenceNumber,
            type: stop.type,
            shipment
        }));
        await stopRepo.save(promises);

        return { message: "Shipment created successfully" };
    }
}