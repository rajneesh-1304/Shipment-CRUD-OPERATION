import { faker } from '@faker-js/faker';
import { StopMother } from '../stop/stop.mother';
import { Shipment, STATUS } from '../../../domain/entity/shipment.entity';
import { ShipmentDomain } from '../../../domain/domainlogic/shipment.domain';

export class ShipmentMother {
  private stops: StopMother;

  constructor(private readonly params: {
    id?: string;
    title?: string;
    status?: STATUS;
    stops?: any[];
  } = {}) {
    this.params = params;
  }

  public withStopDetails(mother: StopMother) {
    this.stops = mother;
    return this;
  }

  public create() {
    const shipment = new ShipmentDomain();
    shipment.id = this.params.id || faker.string.uuid();
    shipment.title = this.params.title || faker.company.name();
    shipment.status = this.params.status || STATUS.PENDING;

    if (this.stops) {
      let randomStops = Math.floor(Math.random() * 5) + 1;

      for (let i = 0; i < randomStops; i++) {
        shipment.stops.push(this.stops.get());
      }
    }
    return shipment;
  }

}