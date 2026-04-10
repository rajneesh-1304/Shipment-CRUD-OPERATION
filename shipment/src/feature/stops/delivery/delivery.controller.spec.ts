import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { faker } from '@faker-js/faker';
import { ShipmentMother } from '../../../domain/objectMother/shipment/shipmentMother';
import { UserMother } from '../../../domain/objectMother/tenant/createTenant';

describe('DeliveryController', () => {
    let controller: DeliveryController;
    const tenant = new UserMother();
    const tenantName = tenant.get().name;
    const request = {
        tenant: tenantName
    } as unknown as Request;


    const mockService = {
        delivery: jest.fn(),
    };

    beforeEach(async () => {
        jest.clearAllMocks();
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DeliveryController],
            providers: [
                {
                    provide: DeliveryService,
                    useValue: mockService,
                },
            ],
        }).compile();
        controller = module.get<DeliveryController>(DeliveryController);
    });

    it('should throw error if ids are missing', async () => {
        mockService.delivery.mockRejectedValue(
            new BadRequestException('Ids are required')
        );
        await expect(controller.delivery('', '', request)).rejects.toThrow(
            BadRequestException
        )
        expect(mockService.delivery).toHaveBeenCalledWith(
            '',
            '',
            tenantName,
        );
    });

    it('should thrwo error if shipment not found', async () => {
        const shipmentId = faker.string.uuid();
        const stopId = faker.string.uuid();
        mockService.delivery.mockRejectedValue(
            new NotFoundException('Shipment not found')
        );
        await expect(controller.delivery(shipmentId, stopId, request)).rejects.toThrow(
            NotFoundException
        )
        expect(mockService.delivery).toHaveBeenCalledWith(
            shipmentId,
            stopId,
            tenantName
        );
    });

    it('should complete delivery successfully', async () => {
        const shipment = new ShipmentMother();
        const shipmentData = shipment.create();
        const shipmentId = shipmentData.id;
        const random = Math.floor(Math.random() * 5) + 1;
        const stopId = shipmentData.stops[random]?.id;
        const response = { id: stopId };
        mockService.delivery.mockResolvedValue(response);
        const result = await controller.delivery(shipmentId, stopId, request);
        expect(result).toEqual(response);
        expect(mockService.delivery).toHaveBeenCalledWith(
            shipmentId,
            stopId,
            tenantName
        );
    })
});