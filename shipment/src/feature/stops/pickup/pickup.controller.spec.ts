import { Test, TestingModule } from '@nestjs/testing';
import { PickupController } from './pickup.controller';
import { PickupService } from './pickup.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PickupController', () => {
    let controller: PickupController;

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
        await expect(controller.pickup('', '')).rejects.toThrow(
            BadRequestException
        );
    });

    it('should throw error if shipment not found', async () => {
        mockService.pickup.mockRejectedValue(
            new NotFoundException('Shipment not found')
        );
        await expect(controller.pickup('s1', 'st1')).rejects.toThrow(
            NotFoundException
        );
    });

    it('should complete pickup successfully', async () => {
        const shipmentId = 's1';
        const stopId = 'st1';

        const response = { id: stopId };

        mockService.pickup.mockResolvedValue(response);
        const result = await controller.pickup(shipmentId, stopId);
        expect(result).toEqual(response);
        expect(mockService.pickup).toHaveBeenCalledWith(
            shipmentId,
            stopId
        );
    });
});