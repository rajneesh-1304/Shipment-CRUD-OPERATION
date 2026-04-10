import { Stop, StopType } from "../../../domain/entity/stop.entity";
import { faker } from '@faker-js/faker';

export class StopMother {
    constructor(
        private readonly params: {
            id?: string;
            sequenceNumber?: number;
            type?: StopType
        } = {},
    ) {}

    public get() {
        const stop = new Stop();
        stop.id = this.params.id || faker.string.uuid();
        stop.sequenceNumber = this.params.sequenceNumber || faker.number.int();
        stop.type = this.params.type || Math.random() < 0.5 ? StopType.PICKUP : StopType.DELIVERY;
        return stop
    }


}