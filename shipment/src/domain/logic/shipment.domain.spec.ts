import { ShipmentDomain } from './shipment.domain';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { STATUS } from '../entity/shipment.entity';
import { Status } from '../entity/stop.entity';

describe('ShipmentDomain', () => {

    it('should throw error if title is missing', () => {
        const data = {
            title: '',
            stops: [{ sequenceNumber: 1 }]
        };

        expect(() => ShipmentDomain.checkCreate(data)).toThrow(BadRequestException);
    });

    it('should throw error if stops are missing', () => {
        const data = {
            title: 'Test Shipment',
            stops: []
        };

        expect(() => ShipmentDomain.checkCreate(data)).toThrow(BadRequestException);
    });

    it('should throw error for duplicate sequence numbers', () => {
        const data = {
            title: 'Test Shipment',
            stops: [
                { sequenceNumber: 1 },
                { sequenceNumber: 1 },
            ]
        };

        expect(() => ShipmentDomain.checkCreate(data)).toThrow(BadRequestException);
    });

    it('should throw error if shipment already completed', () => {
        const stops = [
            { shipmentStatus: Status.Completed },
        ];

        expect(() =>
            ShipmentDomain.checkCompleteShipment(stops, STATUS.COMPLETED)).toThrow(ConflictException);
    });


});