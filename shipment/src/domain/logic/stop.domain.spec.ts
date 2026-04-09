import { StopDomain } from './stop.domain';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { STOPSTATUS, Status, StopType } from '../entity/stop.entity';

describe('StopDomain', () => {

    it('should throw error if stop not found', () => {
        const stops = [{ id: 's1' }];

        expect(() => StopDomain.getStop(stops, 's2')).toThrow(NotFoundException);
    });


    it('should throw if already arrived', () => {
        const stop = { status: STOPSTATUS.ARRIVED };

        expect(() => StopDomain.checkArrive(stop, true)).toThrow(ConflictException);
    });

    it('should throw if already departed', () => {
        const stop = { status: STOPSTATUS.DEPARTED };

        expect(() => StopDomain.checkArrive(stop, true)).toThrow(ConflictException);
    });

    it('should throw if previous not completed', () => {
        const stop = { status: STOPSTATUS.TRANSIT };

        expect(() => StopDomain.checkArrive(stop, false)).toThrow(ConflictException);
    });


    it('should throw if not pickup type', () => {
        const stop = { type: StopType.DELIVERY };

        expect(() => StopDomain.checkPickup(stop, true)).toThrow(ConflictException);
    });

    it('should throw if already picked', () => {
        const stop = {
            type: StopType.PICKUP,
            shipmentStatus: Status.Completed,
        };

        expect(() => StopDomain.checkPickup(stop, true)).toThrow(ConflictException);
    });

    it('should throw if not arrived', () => {
        const stop = {
            type: StopType.PICKUP,
            shipmentStatus: Status.Pending,
            status: STOPSTATUS.TRANSIT,
        };

        expect(() => StopDomain.checkPickup(stop, true)).toThrow(ConflictException);
    });

    it('should throw if previous not completed', () => {
        const stop = {
            type: StopType.PICKUP,
            shipmentStatus: Status.Pending,
            status: STOPSTATUS.ARRIVED,
        };

        expect(() => StopDomain.checkPickup(stop, false)).toThrow(ConflictException);
    });


    it('should throw if already delivered', () => {
        const stop = {
            type: StopType.DELIVERY,
            shipmentStatus: Status.Completed,
        };

        expect(() => StopDomain.checkDelivery(stop, true))
            .toThrow(ConflictException);
    });

    it('should throw if not arrived', () => {
        const stop = {
            type: StopType.DELIVERY,
            shipmentStatus: Status.Pending,
            status: STOPSTATUS.TRANSIT,
        };

        expect(() => StopDomain.checkDelivery(stop, true)).toThrow(ConflictException);
    });

    it('should throw if previous not completed', () => {
        const stop = {
            type: StopType.DELIVERY,
            shipmentStatus: Status.Pending,
            status: STOPSTATUS.ARRIVED,
        };

        expect(() => StopDomain.checkDelivery(stop, false)).toThrow(ConflictException);
    });

});