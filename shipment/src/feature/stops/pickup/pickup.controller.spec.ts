import { Test, TestingModule } from '@nestjs/testing';
import { PickupController } from './pickup.controller';
import { PickupService } from './pickup.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ShipmentMother } from '../../../domain/objectMother/shipment/shipmentMother';
import { faker } from '@faker-js/faker';
import { UserMother } from '../../../domain/objectMother/tenant/createTenant';

describe('PickupController', () => {
    let controller: PickupController;
    const tenant = new UserMother();
    const tenantName = tenant.get().name;
    const request = {
        tenant: tenantName
    } as unknown as Request;

    const mockService = {
        pickup: jest.fn(),
    };

    beforeEach(async () => {
        jest.clearAllMocks();
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PickupController],
            providers: [
                {
                    provide: PickupService,
                    useValue: mockService,
                },
            ],
        }).compile();
        controller = module.get<PickupController>(PickupController);
    });

    it('should throw error if ids are missing', async () => {
        mockService.pickup.mockRejectedValue(
            new BadRequestException('Ids are required')
        );
        await expect(controller.pickup('', '', request)).rejects.toThrow(
            BadRequestException
        );
        expect(mockService.pickup).toHaveBeenCalledWith(
            '',
            '',
            tenantName,
        );
    });

    it('should throw error if shipment not found', async () => {
        const shipmentId = faker.string.uuid();
        const stopId = faker.string.uuid();
        mockService.pickup.mockRejectedValue(
            new NotFoundException('Shipment not found')
        );
        await expect(controller.pickup(shipmentId, stopId, request)).rejects.toThrow(
            NotFoundException
        );
        expect(mockService.pickup).toHaveBeenCalledWith(
            shipmentId,
            stopId,
            tenantName
        );
    });

    it('should complete pickup successfully', async () => {
        const shipment = new ShipmentMother();
        const shipmentData = shipment.create();
        const shipmentId = shipmentData.id;
        const random = Math.floor(Math.random() * 5) + 1;
        const stopId = shipmentData.stops[random]?.id;
        const response = { id: stopId };

        mockService.pickup.mockResolvedValue(response);
        const result = await controller.pickup(shipmentId, stopId, request);
        expect(result).toEqual(response);
        expect(mockService.pickup).toHaveBeenCalledWith(
            shipmentId,
            stopId,
            tenantName
        );
    });
});