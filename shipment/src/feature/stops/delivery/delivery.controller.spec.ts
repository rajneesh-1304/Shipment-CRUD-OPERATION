import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';

describe('DeliveryController', () => {
    let controller: DeliveryController;

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
        await expect(controller.delivery('', '')).rejects.toThrow(
            BadRequestException
        )
    });

    it('should thrwo error if shipment not found', async ()=>{
        mockService.delivery.mockRejectedValue(
            new NotFoundException('Shipment not found')
        );
        await expect(controller.delivery('', '')).rejects.toThrow(
            NotFoundException
        )
    });

    it('should complete delivery successfully', async () => {
        const shipmentId = 's1';
        const stopId = 'st1';  
        const response = { id: stopId };
        mockService.delivery.mockResolvedValue(response);
        const result = await controller.delivery(shipmentId, stopId);
        expect(result).toEqual(response);
        expect(mockService.delivery).toHaveBeenCalledWith(
            shipmentId,
            stopId
        );
    })
});