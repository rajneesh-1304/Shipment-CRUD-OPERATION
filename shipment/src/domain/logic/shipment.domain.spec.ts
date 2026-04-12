import { ShipmentDomain } from './shipment.domain';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { STATUS } from '../entity/shipment.entity';
import { Status } from '../entity/stop.entity';
import { ShipmentMother } from '../objectMother/shipment/shipmentMother';
import { StopMother } from '../objectMother/stop/stop.mother';

describe('ShipmentDomain', () => {
    const shipmentDomain = new ShipmentDomain();
    const shipmentData = new ShipmentMother().withStopDetails(new StopMother()).create();
    it('should throw error if title is missing', () => {
         const data = {
            stops: shipmentData.stops
        };

        expect(() => shipmentDomain.checkCreate(data)).toThrow(BadRequestException);
    });

    it('should throw error if stops are missing', () => {
        const data = {
            title: shipmentData.title,
            stops: []
        };

        expect(() => shipmentDomain.checkCreate(data)).toThrow(BadRequestException);
    });

    it('should throw error for duplicate sequence numbers', () => {
        const data = {
            title: shipmentData.title,
            stops: [
                { sequenceNumber: shipmentData.stops[0]?.sequenceNumber },
                { sequenceNumber: shipmentData.stops[0]?.sequenceNumber },
            ]
        };

        expect(() => shipmentDomain.checkCreate(data)).toThrow(BadRequestException);
    });

    it('should throw error if shipment already completed', () => {
        const stops = [
            { shipmentStatus: shipmentData.status },
        ];

        expect(() =>
            shipmentDomain.checkCompleteShipment(stops, shipmentData.status)).toThrow(ConflictException);
    });


});