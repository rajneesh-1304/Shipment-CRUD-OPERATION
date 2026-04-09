export class ShipmentMother {
  static create() {
    return {
      title: "First Shipment",
      totalStops: 6,
      stops: [
        {
          sequenceNumber: 1,
          type: "PICKUP",
        },
        {
          sequenceNumber: 2,
          type: "DELIVERY",
        },
        {
          sequenceNumber: 3,
          type: "DELIVERY",
        },
        {
          sequenceNumber: 4,
          type: "PICKUP",
        },
      ],
    };
  }
}