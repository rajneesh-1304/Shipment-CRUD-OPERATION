import { Status, Stop, STOPSTATUS, StopType } from "../../../domain/entity/stop.entity";
import { faker } from '@faker-js/faker';

export class StopMother {
    constructor(
        private readonly params: {
            id?: string;
            sequenceNumber?: number;
            type?: StopType;
            status?: STOPSTATUS;
            shipmentStatus?: Status;
        } = {},
    ) {}

    public get() {
        const stop = new Stop();
        stop.id = this.params.id || faker.string.uuid();
        stop.sequenceNumber = this.params.sequenceNumber || faker.number.int({ min:1, max:10});
        stop.type = this.params.type || (Math.random() < 0.5 ? StopType.PICKUP : StopType.DELIVERY);
        stop.status = this.params.status || STOPSTATUS.TRANSIT;
        stop.shipmentStatus = this.params.shipmentStatus || Status.Pending;
        return stop
    }


}