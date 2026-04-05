import { BadRequestException, ConflictException } from "@nestjs/common";
import { STATUS } from "../entity/shipment.entity";
import { Status } from "../entity/stop.entity";

export class ShipmentDomain {
    static checkCreate(data: any) {
        if (!data.title) {
            throw new BadRequestException("Title is required");
        }

        if (!data.stops?.length) {
            throw new BadRequestException("At least one stop required");
        }

        const set = new Set();
        for (const stop of data.stops) {
            if (set.has(stop.sequenceNumber)) {
                throw new BadRequestException("Duplicate sequence number");
            }
            set.add(stop.sequenceNumber);
        }
    }

    static checkCompleteShipment(stops: any[], shipmentStatus: STATUS) {
        if (shipmentStatus === STATUS.COMPLETED) {
            throw new ConflictException("Already completed");
        }

        for (const stop of stops) {
            if (stop.shipmentStatus !== Status.Completed) {
                throw new ConflictException("Stops pending");
            }
        }
    }

}