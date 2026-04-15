import { BadRequestException, ConflictException } from "@nestjs/common";
import { STATUS } from "../entity/shipment.entity";
import { Status, STOPSTATUS } from "../entity/stop.entity";

export class ShipmentDomain {
  id: string;
  title: string;
  status: STATUS;
  createdAt: Date;
  updatedAt: Date;
  stops: any[];

  constructor( ){
    this.stops = []; 
  }

  checkCreate() {
    if (!this.title) {
      throw new BadRequestException('Title is required');
    }
    const stops = this.stops;
    if (!stops.length) {
      throw new BadRequestException('At least one stop required');
    }
    const set = new Set();
    for (const stop of stops) {
      if (set.has(stop.sequenceNumber)) {
        throw new BadRequestException('Duplicate sequence number');
      }
      set.add(stop.sequenceNumber);
    }
  }

  checkCompleteShipment() {
    if (this.status === STATUS.COMPLETED) {
      throw new ConflictException("Already completed");
    }
    const stops = this.stops;

    for (const stop of this.stops) {
      if (stop.status !== STOPSTATUS.DEPARTED &&  stop.shipmentStatus !== Status.Completed) {
        throw new ConflictException("Stops pending");
      }
    }
    this.status = STATUS.COMPLETED;
  }

  checkPrevious(currentSequenceNumber: number){
    const stops = this.stops;
        for (const stop of stops) {
          if (stop.sequenceNumber < currentSequenceNumber) {
            if (stop.status !== STOPSTATUS.DEPARTED || stop.shipmentStatus !== Status.Completed) {
              throw new ConflictException(
                "previous stops are pending"
              );
            }
          }
        }
      }

}