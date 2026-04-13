import { BadRequestException, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { CompleteShipmentService } from 'src/feature/shipment/completeShipment/completeShipment.service';
import { StopMother } from 'src/domain/objectMother/stop/stop.mother';
import { Status } from 'src/domain/entity/stop.entity';
import { ShipmentMother } from 'src/domain/objectMother/shipment/shipmentMother';
import { STATUS } from 'src/domain/entity/shipment.entity';

describe('CompleteShipmentService', () => {
  let service: CompleteShipmentService;

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
    service = new CompleteShipmentService(mockOrm as any);
  });

  it('should complete shipment successfully', async () => {
    const schema = faker.company.name();

    const stop1 = new StopMother({
      shipmentStatus: Status.Completed,
    }).get();

    const stop2 = new StopMother({
      shipmentStatus: Status.Completed,
    }).get();

    const shipment = new ShipmentMother({
      stops: [stop1, stop2],
    }).create();

    shipment.status = STATUS.PENDING;

    mockEm.findOne.mockResolvedValue(shipment);
    mockEm.find.mockResolvedValue([stop1, stop2]);

    const result = await service.completeShipment(shipment.id, schema);

    expect(result).toEqual({
      message: 'Shipment completed successfully',
    });

    expect(shipment.status).toBe(STATUS.COMPLETED);
    expect(mockEm.flush).toHaveBeenCalled();
  });

  it('should throw error if id is missing', async () => {
    await expect(
      service.completeShipment('', faker.company.name())
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw error if shipment not found', async () => {
    mockEm.findOne.mockResolvedValue(null);

    await expect(
      service.completeShipment(faker.string.uuid(), faker.company.name())
    ).rejects.toThrow(NotFoundException);
  });
});