import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CompleteShipmentService } from './completeShipment.service';
import { CompleteShipmentController } from './completeShipment.controller';

describe('CompleteShipmentController', () => {
    let controller: CompleteShipmentController;

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

        await expect(controller.CompleteShipment('')).rejects.toThrow(
            BadRequestException
        );
    });

    it('should throw error if shipment not found', async () => {
        mockService.completeShipment.mockRejectedValue(
            new NotFoundException('Shipment not found')
        );

        await expect(controller.CompleteShipment('s1')).rejects.toThrow(
            NotFoundException
        );
    });

    it('should complete shipment successfully', async () => {
        const shipmentId = 's1';
        const response = { message: "Shipment completed successfully" };
        mockService.completeShipment.mockResolvedValue(response);

        const result = await controller.CompleteShipment(shipmentId);

        expect(result).toEqual(response);
        expect(mockService.completeShipment).toHaveBeenCalledWith(shipmentId);
    });
});