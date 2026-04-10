import { faker } from '@faker-js/faker';
import { StopMother } from '../stop/stop.mother';
import { Shipment } from '../../../domain/entity/shipment.entity';

export class ShipmentMother {
  private stops: StopMother;

  constructor(private readonly params: {
    id?: string;
    title?: string;
    stops?: any[];
  } = {}) {
    this.params = params;
  }

  public withStopDetails(mother: StopMother) {
    this.stops = mother;
    return this;
  }

  public create() {
    const shipment = new Shipment();
    shipment.id = this.params.id || faker.string.uuid();
    shipment.title = this.params.title || faker.company.name();
    shipment.stops = this.params.stops || [];

    if (this.stops) {
      let randomStops = Math.floor(Math.random() * 5) + 1;

      for (let i = 0; i < randomStops; i++) {
        shipment.stops.push(this.stops.get());
      }
    }
    return shipment;
  }

}