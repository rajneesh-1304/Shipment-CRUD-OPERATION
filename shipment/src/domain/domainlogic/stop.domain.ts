import { ConflictException, NotFoundException } from "@nestjs/common";
import { STOPSTATUS, Status, StopType } from "../entity/stop.entity";

export class StopDomain {
    id: string;
    sequenceNumber: number;
    type: StopType;
    status: STOPSTATUS;
    shipmentStatus: Status;
    createAt: Date;
    updatedAt: Date;
    shipment: any;

    checkArrive() {
        if (this.status === STOPSTATUS.ARRIVED) {
            throw new ConflictException("Already arrived");
        }

        if (this.status === STOPSTATUS.DEPARTED) {
            throw new ConflictException("Already departed");
        }

        this.status = STOPSTATUS.ARRIVED
    }

    checkPickup() {
        if (this.type !== StopType.PICKUP) {
            throw new ConflictException("Not a pickup stop");
        }

        if (this.shipmentStatus === Status.Completed) {
            throw new ConflictException("Already picked");
        }

        if(this.status === STOPSTATUS.DEPARTED) {
            throw new ConflictException("Already departed");
        }

        if (this.status !== STOPSTATUS.ARRIVED ) {
            throw new ConflictException("Shipment not arrived");
        }
        this.shipmentStatus = Status.Completed;
        this.status = STOPSTATUS.DEPARTED
    }

    checkDelivery() {
        if (this.type !== StopType.DELIVERY) {
            throw new ConflictException("Not a delivery stop");
        }

        if (this.shipmentStatus === Status.Completed) {
            throw new ConflictException("Already delivered");
        }

        if(this.status === STOPSTATUS.DEPARTED) {
            throw new ConflictException("Already departed");
        }

        if (this.status !== STOPSTATUS.ARRIVED) {
            throw new ConflictException("Shipment not arrived");
        }

        this.shipmentStatus = Status.Completed;
        this.status = STOPSTATUS.DEPARTED
    }
}