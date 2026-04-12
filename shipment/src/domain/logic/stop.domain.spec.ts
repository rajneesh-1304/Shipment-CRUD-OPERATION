import { StopDomain } from './stop.domain';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ShipmentMother } from '../objectMother/shipment/shipmentMother';
import { StopMother } from '../objectMother/stop/stop.mother';
import { faker } from '@faker-js/faker';
import { StopType, Status, STOPSTATUS } from '../entity/stop.entity';

describe('StopDomain', () => {
    const stopDomain = new StopDomain();

    const shipmentData = new ShipmentMother().withStopDetails(new StopMother()).create();

    it('should throw error if stop not found', () => {
        const id = faker.string.uuid();
        expect(() => stopDomain.getStop(shipmentData.stops, id))
            .toThrow(NotFoundException);
    });

    it('should throw if already arrived', () => {
        const stop = new StopMother({
            status: STOPSTATUS.ARRIVED
        }).get();

        expect(() => stopDomain.checkArrive(stop, true))
            .toThrow(ConflictException);
    });

    it('should throw if already departed', () => {
        const stop = new StopMother({
            status: STOPSTATUS.DEPARTED
        }).get();

        expect(() => stopDomain.checkArrive(stop, true))
            .toThrow(ConflictException);
    });

    it('should throw if previous not completed', () => {
        const stop = new StopMother({
            shipmentStatus: Status.Pending
        }).get();

        expect(() => stopDomain.checkArrive(stop, false))
            .toThrow(ConflictException);
    });

    it('should throw if not pickup type', () => {
        const stop = new StopMother({
            type: StopType.DELIVERY,
            status: STOPSTATUS.ARRIVED
        }).get();

        expect(() => stopDomain.checkPickup(stop, true))
            .toThrow(ConflictException);
    });

    it('should throw if already picked', () => {
        const stop = new StopMother({
            type: StopType.PICKUP,
            status: STOPSTATUS.DEPARTED
        }).get();

        expect(() => stopDomain.checkPickup(stop, true))
            .toThrow(ConflictException);
    });

    it('should throw if not arrived', () => {
        const stop = new StopMother({
            type: StopType.PICKUP,
            status: STOPSTATUS.TRANSIT
        }).get();

        expect(() => stopDomain.checkPickup(stop, true))
            .toThrow(ConflictException);
    });

    it('should throw if previous not completed (pickup)', () => {
        const stop = new StopMother({
            type: StopType.PICKUP,
            status: STOPSTATUS.ARRIVED
        }).get();

        expect(() => stopDomain.checkPickup(stop, false))
            .toThrow(ConflictException);
    });

    it('should throw if already delivered', () => {
        const stop = new StopMother({
            type: StopType.DELIVERY,
            status: STOPSTATUS.DEPARTED
        }).get();

        expect(() => stopDomain.checkDelivery(stop, true))
            .toThrow(ConflictException);
    });

    it('should throw if not arrived (delivery)', () => {
        const stop = new StopMother({
            type: StopType.DELIVERY,
            status: STOPSTATUS.TRANSIT
        }).get();

        expect(() => stopDomain.checkDelivery(stop, true))
            .toThrow(ConflictException);
    });

    it('should throw if previous not completed (delivery)', () => {
        const stop = new StopMother({
            type: StopType.DELIVERY,
            status: STOPSTATUS.ARRIVED
        }).get();

        expect(() => stopDomain.checkDelivery(stop, false))
            .toThrow(ConflictException);
    });

});