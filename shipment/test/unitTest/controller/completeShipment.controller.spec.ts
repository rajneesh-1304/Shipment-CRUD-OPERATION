import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CompleteShipmentService } from 'src/feature/shipment/completeShipment/completeShipment.service';
import { CompleteShipmentController } from 'src/feature/shipment/completeShipment/completeShipment.controller';
import { ShipmentMother } from 'src/domain/objectMother/shipment/shipmentMother';
import { faker } from '@faker-js/faker';
import { UserMother } from 'src/domain/objectMother/tenant/createTenant';
import { StopMother } from 'src/domain/objectMother/stop/stop.mother';

describe('CompleteShipmentController', () => {
    let controller: CompleteShipmentController;
    let tenantName: string;
    let request: any;

    const mockService = {
        completeShipment: jest.fn(),
    };

    beforeEach(async () => {
        jest.clearAllMocks();
        const tenant = new UserMother().get();
        tenantName = tenant.name;
        request = { tenant: tenantName };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [CompleteShipmentController],
            providers: [
                {
                    provide: CompleteShipmentService,
                    useValue: mockService,
                },
            ],
        }).compile();

        controller = module.get<CompleteShipmentController>(CompleteShipmentController);
    });

    it('should throw error if id is missing', async () => {
        mockService.completeShipment.mockRejectedValue(
            new BadRequestException('ShipmentId is required')
        );

        await expect(controller.completeShipment('', request) ).rejects.toThrow(BadRequestException);
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

        await expect(controller.completeShipment(shipmentId, request)).rejects.toThrow(NotFoundException);
        expect(mockService.completeShipment).toHaveBeenCalledWith(
            shipmentId,
            tenantName,
        );
    });

    it('should complete shipment successfully', async () => {
        const shipmentData = new ShipmentMother().withStopDetails(new StopMother()).create();
        const response = { message: "Shipment completed successfully" };
        mockService.completeShipment.mockResolvedValue(response);

        const result = await controller.completeShipment( shipmentData.id, request );

        expect(result).toEqual(response);
        expect(mockService.completeShipment).toHaveBeenCalledWith(shipmentData.id,tenantName);
    });
});