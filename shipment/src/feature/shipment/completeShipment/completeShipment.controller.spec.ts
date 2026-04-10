import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CompleteShipmentService } from './completeShipment.service';
import { CompleteShipmentController } from './completeShipment.controller';
import { ShipmentMother } from '../../../domain/objectMother/shipment/shipmentMother';
import { faker } from '@faker-js/faker';
import { UserMother } from '../../../domain/objectMother/tenant/createTenant';

describe('CompleteShipmentController', () => {
    let controller: CompleteShipmentController;
    const tenant = new UserMother();
    const tenantName = tenant.get().name;
    const request = {
        tenant: tenantName
    } as unknown as Request;

    const mockService = {
        completeShipment: jest.fn(),
    };

    beforeEach(async () => {
        jest.clearAllMocks();

        const module: TestingModule = await Test.createTestingModule({
            controllers: [CompleteShipmentController],
            providers: [
                {
                    provide: CompleteShipmentService,
                    useValue: mockService,
                },
            ],
        }).compile();

        controller = module.get(CompleteShipmentController);
    });

    it('should throw error if id is missing', async () => {
        mockService.completeShipment.mockRejectedValue(
            new BadRequestException('ShipmentId is required')
        );

        await expect(controller.CompleteShipment('', request)).rejects.toThrow(
            BadRequestException
        );
        expect(mockService.completeShipment).toHaveBeenCalledWith(
            '',
            tenantName,
        );
    });

    it('should throw error if shipment not found', async () => {
        const shipmentId = faker.string.uuid();
        mockService.completeShipment.mockRejectedValue(
            new NotFoundException('Shipment not found')
        );

        await expect(controller.CompleteShipment(shipmentId, request)).rejects.toThrow(
            NotFoundException
        );
        expect(mockService.completeShipment).toHaveBeenCalledWith(
            shipmentId,
            tenantName,
        );
    });

    it('should complete shipment successfully', async () => {
        const shipment = new ShipmentMother();
        const shipmentData = shipment.create();
        const response = { message: "Shipment completed successfully" };
        mockService.completeShipment.mockResolvedValue(response);

        const result = await controller.CompleteShipment(shipmentData.id, request);

        expect(result).toEqual(response);
        expect(mockService.completeShipment).toHaveBeenCalledWith(shipmentData.id, tenantName);
    });
});