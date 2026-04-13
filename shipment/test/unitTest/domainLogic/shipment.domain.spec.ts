import { ShipmentMother } from '../../../src/domain/objectMother/shipment/shipmentMother';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { StopMother } from '../../../src/domain/objectMother/stop/stop.mother';
import { ShipmentDomain } from '../../../src/domain/domainlogic/shipment.domain';
import { STATUS } from '../../../src/domain/entity/shipment.entity';
import { STOPSTATUS, Status } from '../../../src/domain/entity/stop.entity';

describe('ShipmentDomain', () => {

    let shipmentDomain: ShipmentDomain;

    beforeEach(() => {
        shipmentDomain = new ShipmentDomain();
    });

    it('should throw error if title is missing', () => {
        const shipmentData = new ShipmentMother().withStopDetails(new StopMother()).create();
        shipmentDomain.stops = shipmentData.stops;

        expect(() => shipmentDomain.checkCreate()).toThrow(BadRequestException);
    });

    it('should throw error if stops are missing', () => {
        const shipmentData = new ShipmentMother().create();

        shipmentDomain.title = shipmentData.title;
        shipmentDomain.stops = [];

        expect(() => shipmentDomain.checkCreate())
            .toThrow(BadRequestException);
    });

    it('should throw error for duplicate sequence numbers', () => {
        const stop = new StopMother().get();

        shipmentDomain.title = 'Test Shipment';
        shipmentDomain.stops = [
            { ...stop, sequenceNumber: 1 },
            { ...stop, sequenceNumber: 1 },
        ];

        expect(() => shipmentDomain.checkCreate())
            .toThrow(BadRequestException);
    });

    it('should throw error if shipment already completed', () => {
        const shipmentData = new ShipmentMother()
            .withStopDetails(new StopMother())
            .create();

        shipmentDomain.status = STATUS.COMPLETED;
        shipmentDomain.stops = shipmentData.stops.map(stop => ({
            ...stop,
            status: STOPSTATUS.DEPARTED,
            shipmentStatus: Status.Completed
        }));

        expect(() => shipmentDomain.checkCompleteShipment())
            .toThrow(ConflictException);
    });

});