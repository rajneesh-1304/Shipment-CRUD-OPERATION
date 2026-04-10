import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateShipmentController } from './createShipment.controller';
import { CreateShipmentService } from './createShipment.service';
import { ShipmentMother } from '../../../domain/objectMother/shipment/shipmentMother';
import { UserMother } from '../../../domain/objectMother/tenant/createTenant';

describe('CreateShipment', () => {
    let controller: CreateShipmentController;

    const tenant = new UserMother();
    const tenantName = tenant.get().name;
    const request = {
        tenant: tenantName
    } as unknown as Request;

    const mockService = {
        createShipment: jest.fn(),
    };

    beforeEach(async () => {
        jest.clearAllMocks();
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CreateShipmentController],
            providers: [
                {
                    provide: CreateShipmentService,
                    useValue: mockService,
                },
            ],
        }).compile();
        controller = module.get<CreateShipmentController>(CreateShipmentController);
    });

    it('should throw error if data is invalid', async () => {
        const shipment = new ShipmentMother();
        const shipmentData = shipment.create();
        mockService.createShipment.mockRejectedValue(
            new BadRequestException('Invalid data')
        );
        await expect(controller.createShipment(shipmentData, request)).rejects.toThrow(
            BadRequestException
        )
        expect(mockService.createShipment).toHaveBeenCalledWith(
            shipmentData,
            tenantName,
        );
    });

    it('should create shipment successfully', async () => {
        const shipment = new ShipmentMother();
        const data = shipment.create();
        mockService.createShipment.mockResolvedValue(data);
        const result = await controller.createShipment(data, request);
        expect(result).toEqual(data);
        expect(mockService.createShipment).toHaveBeenCalledWith(data, tenantName);
    });
});