import { StopDomain } from './stop.domain';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ShipmentMother } from '../objectMother/shipment/shipmentMother';
import { StopMother } from '../objectMother/stop/stop.mother';
import { faker } from '@faker-js/faker';

describe('StopDomain', () => {
    const stopDomain = new StopDomain();
    const shipmentMother = new ShipmentMother();
    const shipmentData = shipmentMother.create();

    const stopMother = new StopMother();
    const stopData = stopMother.get();

    it('should throw error if stop not found', () => {
        const stops = shipmentData.stops;
        const id = faker.string.uuid();
        expect(() => stopDomain.getStop(stops, id)).toThrow(NotFoundException);
    });


    it('should throw if already arrived', () => {
        const stop = { status: stopData.status };

        expect(() => stopDomain.checkArrive(stop, false)).toThrow(ConflictException);
    });

    it('should throw if already departed', () => {
        const stop = { status: stopData.status };

        expect(() => stopDomain.checkArrive(stop, false)).toThrow(ConflictException);
    });

    it('should throw if previous not completed', () => {
        const stop = { status: stopData.status };

        expect(() => stopDomain.checkArrive(stop, false)).toThrow(ConflictException);
    });


    it('should throw if not pickup type', () => {
        const stop = { type: stopData.type };

        expect(() => stopDomain.checkPickup(stop, true)).toThrow(ConflictException);
    });

    it('should throw if already picked', () => {
        const stop = {
            type: stopData.type,
            shipmentStatus: stopData.shipmentStatus,
        };

        expect(() => stopDomain.checkPickup(stop, true)).toThrow(ConflictException);
    });

    it('should throw if not arrived', () => {
        const stop = {
            type: stopData.type,
            shipmentStatus: stopData.shipmentStatus,
            status: stopData.status,
        };

        expect(() => stopDomain.checkPickup(stop, true)).toThrow(ConflictException);
    });

    it('should throw if previous not completed', () => {
        const stop = {
            type: stopData.type,
            shipmentStatus: stopData.shipmentStatus,
            status: stopData.status,
        };

        expect(() => stopDomain.checkPickup(stop, false)).toThrow(ConflictException);
    });


    it('should throw if already delivered', () => {
        const stop = {
            type: stopData.type,
            shipmentStatus: stopData.shipmentStatus,
        };

        expect(() => stopDomain.checkDelivery(stop, true))
            .toThrow(ConflictException);
    });

    it('should throw if not arrived', () => {
        const stop = {
            type: stopData.type,
            shipmentStatus: stopData.shipmentStatus,
            status: stopData.status,
        };

        expect(() => stopDomain.checkDelivery(stop, true)).toThrow(ConflictException);
    });

    it('should throw if previous not completed', () => {
        const stop = {
            type: stopData.type,
            shipmentStatus: stopData.shipmentStatus,
            status: stopData.status,
        };

        expect(() => stopDomain.checkDelivery(stop, false)).toThrow(ConflictException);
    });

});