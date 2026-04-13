import { faker } from '@faker-js/faker';
import { Shipment } from 'src/domain/entity/shipment.entity';
import { Stop, StopType } from 'src/domain/entity/stop.entity';
import { ShipmentMother } from 'src/domain/objectMother/shipment/shipmentMother';
import { StopMother } from 'src/domain/objectMother/stop/stop.mother';
import { CreateShipmentService } from 'src/feature/shipment/createShipment/createShipment.service';

describe('CreateShipmentService', () => {
  let service: CreateShipmentService;

  const mockEm = {
    create: jest.fn(),
    flush: jest.fn(),
  };

  const mockOrm = {
    em: {
      getContext: jest.fn().mockReturnValue(mockEm),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new CreateShipmentService(mockOrm as any);
  });

  it('should create shipment successfully', async () => {

    const stop1 = new StopMother({
      sequenceNumber: 1,
      type: StopType.PICKUP,
    }).get();

    const stop2 = new StopMother({
      sequenceNumber: 2,
      type: StopType.DELIVERY,
    }).get();

    const shipmentData = new ShipmentMother({
      stops: [stop1, stop2],
    }).create();

    const schema = faker.company.name();

    const createdShipment = {
      id: shipmentData.id,
      title: shipmentData.title,
      checkCreate: jest.fn(),
    };

    mockEm.create.mockReturnValueOnce(createdShipment);

    const result = await service.createShipment(shipmentData, schema);

    expect(mockEm.create).toHaveBeenCalledWith(
      Shipment,
      { title: shipmentData.title },
      { schema }
    );

    shipmentData.stops.forEach(stop => {
      expect(mockEm.create).toHaveBeenCalledWith(
        Stop,
        expect.objectContaining({
          sequenceNumber: stop.sequenceNumber,
          type: stop.type,
          shipment: createdShipment,
        }),
        { schema }
      );
    });

    expect(mockEm.flush).toHaveBeenCalled();
  });
});