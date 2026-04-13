import { BadRequestException, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { PickupService } from 'src/feature/stops/pickup/pickup.service';
import { StopMother } from 'src/domain/objectMother/stop/stop.mother';
import { Status, STOPSTATUS, StopType } from 'src/domain/entity/stop.entity';
import { ShipmentMother } from 'src/domain/objectMother/shipment/shipmentMother';
import { StopTransformer } from 'src/domain/transformer/stop.transformer';

describe('PickupService', () => {
  let service: PickupService;

  const mockEm = {
    findOne: jest.fn(),
    find: jest.fn(),
    flush: jest.fn(),
  };

  const mockOrm = {
    em: {
      getContext: () => mockEm,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new PickupService(mockOrm as any);
  });

  it('should pickup successfully', async () => {
    const schema = faker.company.name();

    const prevStop = new StopMother({
      sequenceNumber: 1,
      shipmentStatus: Status.Completed,
      status: STOPSTATUS.DEPARTED,
      type: StopType.PICKUP,
    }).get();

    const currentStop = new StopMother({
      sequenceNumber: 2,
      shipmentStatus: Status.Pending,
      status: STOPSTATUS.ARRIVED,
      type: StopType.PICKUP,
    }).get();

    const shipment = new ShipmentMother().create();
    shipment.stops = [prevStop, currentStop];

    prevStop.shipment = shipment;
    currentStop.shipment = shipment;

    mockEm.findOne.mockResolvedValue(shipment);
    mockEm.find.mockResolvedValue([prevStop, currentStop]);

    const spy = jest.spyOn(StopTransformer, 'response');

    const result = await service.pickup(
      shipment.id,
      currentStop.id,
      schema
    );

    expect(currentStop.shipmentStatus).toBe(Status.Completed);
    expect(currentStop.status).toBe(STOPSTATUS.DEPARTED);

    expect(mockEm.flush).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(currentStop);
    expect(result).toBeDefined();
  });

  it('should throw error if ids are missing', async () => {
    await expect(service.pickup('', '', faker.company.name())).rejects.toThrow(BadRequestException);
  });

  it('should throw error if shipment not found', async () => {
    mockEm.findOne.mockResolvedValue(null);

    await expect(service.pickup(faker.string.uuid(), faker.string.uuid(), faker.company.name())).rejects.toThrow(NotFoundException);
  });
});