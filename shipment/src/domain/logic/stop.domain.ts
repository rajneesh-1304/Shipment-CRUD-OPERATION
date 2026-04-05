import { ConflictException, NotFoundException } from "@nestjs/common";
import { STOPSTATUS, Status, StopType } from "../entity/stop.entity";

export class StopDomain {

    static getStop(stops: any[], stopId: string) {
        const idx = stops.findIndex(s => s.id === stopId);
        if (idx === -1) {
            throw new NotFoundException("Stop not found");
        }
        return { stop: stops[idx], idx };
    }

    static isPreviousCompleted(stops: any[], idx: number) {
        if (idx === 0) return true;
        if(stops[idx-1].shipmentStatus === Status.Completed && stops[idx-1].status === STOPSTATUS.DEPARTED){
            return true;
        }

        return false;
    }

    static checkArrive(stop, previousCompleted: boolean) {

        if (stop.status === STOPSTATUS.ARRIVED) {
            throw new ConflictException("Already arrived");
        }

        if (stop.status === STOPSTATUS.DEPARTED) {
            throw new ConflictException("Already departed");
        }

        if (!previousCompleted) {
            throw new ConflictException("Previous stop not completed");
        }
    }

    static checkPickup(stop, previousCompleted: boolean) {

        if (stop.type !== StopType.PICKUP) {
            throw new ConflictException("Not a pickup stop");
        }

        if (stop.shipmentStatus === Status.Completed) {
            throw new ConflictException("Already picked");
        }

        if(stop.status === STOPSTATUS.DEPARTED) {
            throw new ConflictException("Already departed");
        }

        if (stop.status !== STOPSTATUS.ARRIVED ) {
            throw new ConflictException("Shipment not arrived");
        }

        if (!previousCompleted) {
            throw new ConflictException("Previous pickup pending");
        }
    }

    static checkDelivery(stop, previousCompleted: boolean) {

        if (stop.type !== StopType.DELIVERY) {
            throw new ConflictException("Not a delivery stop");
        }

        if (stop.shipmentStatus === Status.Completed) {
            throw new ConflictException("Already delivered");
        }

        if(stop.status === STOPSTATUS.DEPARTED) {
            throw new ConflictException("Already departed");
        }

        if (stop.status !== STOPSTATUS.ARRIVED) {
            throw new ConflictException("Shipment not arrived");
        }

        if (!previousCompleted) {
            throw new ConflictException("Previous delivery pending");
        }
    }
}