import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateShipmentController } from './createShipment.controller';
import { CreateShipmentService } from './createShipment.service';
import { ShipmentMother } from '../../../domain/objectMother/shipment/shipmentMother';

describe('CreateShipment', () => {
    let controller: CreateShipmentController;

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
        const data = ShipmentMother.create();
        mockService.createShipment.mockRejectedValue(
            new BadRequestException('Invalid data')
        );
        await expect(controller.createShipment(data)).rejects.toThrow(
            BadRequestException
        )
    });

    it('should create shipment successfully', async () => {
        const data = ShipmentMother.create();
        const response ={ id:'s1', title: data.title};
        mockService.createShipment.mockResolvedValue(response);

        const result = await controller.createShipment(data);
        expect(result).toEqual(response);
        expect(mockService.createShipment).toHaveBeenCalledWith(data);
     });
});