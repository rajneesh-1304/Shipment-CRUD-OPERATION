import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ArriveController } from './arrive.controller';
import { ArriveService } from './arrive.service';


describe('ArriveController', () => {
    let controller: ArriveController;

    const mockService = {
        arrive: jest.fn(),
    };

    beforeEach(async () => {
        jest.clearAllMocks();
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ArriveController],
            providers: [
                {
                    provide: ArriveService,
                    useValue: mockService,
                },
            ],
        }).compile();
        controller = module.get<ArriveController>(ArriveController);
    });

    it('should throw error if ids are missing', async () => {
        mockService.arrive.mockRejectedValue(
            new BadRequestException('Ids are required')
        );
        await expect(controller.arrive('', '')).rejects.toThrow(
            BadRequestException
        )
    });

    it('should thrwo error if shipment not found', async ()=>{
        mockService.arrive.mockRejectedValue(
            new NotFoundException('Shipment not found')
        );
        await expect(controller.arrive('', '')).rejects.toThrow(
            NotFoundException
        )
    });

    it('should arrive successfully', async () => {
        const shipmentId = 's1';
        const stopId = 'st1';  
        const response = { id: stopId };
        mockService.arrive.mockResolvedValue(response);
        const result = await controller.arrive(shipmentId, stopId);
        expect(result).toEqual(response);
        expect(mockService.arrive).toHaveBeenCalledWith(
            shipmentId,
            stopId
        );
    })
});