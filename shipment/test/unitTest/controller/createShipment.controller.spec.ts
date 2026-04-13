import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CreateShipmentController } from 'src/feature/shipment/createShipment/createShipment.controller';
import { CreateShipmentService } from 'src/feature/shipment/createShipment/createShipment.service';
import { ShipmentMother } from 'src/domain/objectMother/shipment/shipmentMother';
import { UserMother } from 'src/domain/objectMother/tenant/createTenant';
import { StopMother } from 'src/domain/objectMother/stop/stop.mother';

describe('CreateShipment', () => {
    let controller: CreateShipmentController;
    let tenantName: string;
    let request: any;

    const mockService = {
        createShipment: jest.fn(),
    };

    beforeEach(async () => {
        jest.clearAllMocks();
        const tenant = new UserMother().get();
        tenantName = tenant.name;
        request = { tenant: tenantName };

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
        const shipmentData = new ShipmentMother().withStopDetails(new StopMother()).create();
        mockService.createShipment.mockRejectedValue(
            new BadRequestException('Invalid data')
        );
        await expect(controller.createShipment(shipmentData, request)).rejects.toThrow(BadRequestException);
        expect(mockService.createShipment).toHaveBeenCalledWith(
            shipmentData,
            tenantName,
        );
    });

    it('should create shipment successfully', async () => {
        const data = new ShipmentMother().withStopDetails(new StopMother()).create();
        mockService.createShipment.mockResolvedValue(data);
        const result = await controller.createShipment(data, request);
        expect(result).toEqual(data);
        expect(mockService.createShipment).toHaveBeenCalledWith(data,tenantName);
    });
});