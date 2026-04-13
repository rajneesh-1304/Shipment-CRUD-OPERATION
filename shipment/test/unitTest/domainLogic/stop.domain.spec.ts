import { ConflictException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Status, STOPSTATUS, StopType } from 'src/domain/entity/stop.entity';
import { ShipmentMother } from 'src/domain/objectMother/shipment/shipmentMother';
import { StopMother } from 'src/domain/objectMother/stop/stop.mother';

describe('StopDomain', () => {

    const shipmentData = new ShipmentMother().withStopDetails(new StopMother()).create();

    it('should throw if already arrived', () => {
        const stop = new StopMother({
            status: STOPSTATUS.ARRIVED
        }).get();

        expect(() => stop.checkArrive()).toThrow(ConflictException);
    });

    it('should throw if already departed', () => {
        const stop = new StopMother({
            status: STOPSTATUS.DEPARTED
        }).get();

        expect(() => stop.checkArrive()).toThrow(ConflictException);
    });

    it('should arrive successfully', () => {
        const stop = new StopMother({
            status: STOPSTATUS.TRANSIT
        }).get();

        stop.checkArrive();
        expect(stop.status).toBe(STOPSTATUS.ARRIVED);
    });

    it('should throw if not pickup type', () => {
        const stop = new StopMother({
            type: StopType.DELIVERY,
            status: STOPSTATUS.ARRIVED
        }).get();

        expect(() => stop.checkPickup()).toThrow(ConflictException);
    });

    it('should throw if already picked', () => {
        const stop = new StopMother({
            type: StopType.PICKUP,
            shipmentStatus: Status.Completed
        }).get();

        expect(() => stop.checkPickup()).toThrow(ConflictException);
    });

    it('should throw if already departed', () => {
        const stop = new StopMother({
            type: StopType.PICKUP,
            status: STOPSTATUS.DEPARTED
        }).get();

        expect(() => stop.checkPickup()).toThrow(ConflictException);
    });

    it('should throw if not arrived', () => {
        const stop = new StopMother({
            type: StopType.PICKUP,
            status: STOPSTATUS.TRANSIT
        }).get();

        expect(() => stop.checkPickup()).toThrow(ConflictException);
    });

    it('should pickup successfully', () => {
        const stop = new StopMother({
            type: StopType.PICKUP,
            status: STOPSTATUS.ARRIVED
        }).get();

        stop.checkPickup();

        expect(stop.status).toBe(STOPSTATUS.DEPARTED);
        expect(stop.shipmentStatus).toBe(Status.Completed);
    });

    it('should throw if not delivery type', () => {
        const stop = new StopMother({
            type: StopType.PICKUP,
            status: STOPSTATUS.ARRIVED
        }).get();

        expect(() => stop.checkDelivery()).toThrow(ConflictException);
    });

    it('should throw if already delivered', () => {
        const stop = new StopMother({
            type: StopType.DELIVERY,
            shipmentStatus: Status.Completed
        }).get();

        expect(() => stop.checkDelivery()).toThrow(ConflictException);
    });

    it('should throw if already departed ', () => {
        const stop = new StopMother({
            type: StopType.DELIVERY,
            status: STOPSTATUS.DEPARTED
        }).get();

        expect(() => stop.checkDelivery()).toThrow(ConflictException);
    });

    it('should throw if not arrive', () => {
        const stop = new StopMother({
            type: StopType.DELIVERY,
            status: STOPSTATUS.TRANSIT
        }).get();

        expect(() => stop.checkDelivery()).toThrow(ConflictException);
    });

    it('should deliver successfully', () => {
        const stop = new StopMother({
            type: StopType.DELIVERY,
            status: STOPSTATUS.ARRIVED
        }).get();

        stop.checkDelivery();
        expect(stop.status).toBe(STOPSTATUS.DEPARTED);
        expect(stop.shipmentStatus).toBe(Status.Completed);
    });

});