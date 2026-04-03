import { EntityManager } from '@mikro-orm/postgresql';
import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { Shipment } from 'src/domain/entity/shipment.entity';
import { Stop } from 'src/domain/entity/stop.entity';

@Injectable()
export class CreateShipmentService {
    constructor(private readonly em: EntityManager) { }

    async createShipment(data: any) {
        if (!data.title) {
            throw new BadRequestException('Title is required');
        }

        if (!data.stops || data.stops.length === 0) {
            throw new BadRequestException('Shipment requires at least one stop');
        }
        const isPresent = await this.em.findOne(Shipment, { title: data.title });
        if (isPresent) {
            throw new ConflictException("Shipment already exists");
        }
        console.log('1')
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
        console.log('2')
        const shipment = this.em.create(Shipment, {
            title: data.title,
        });
console.log('3')
        stops.map((stop: any) => this.em.create(Stop, {
            sequenceNumber: stop.sequenceNumber,
            type: stop.type,
            shipment
        }));
        console.log('4')
        await this.em.flush();
        console.log('4')
        return { message: "Shipment created successfully" };
    }
}