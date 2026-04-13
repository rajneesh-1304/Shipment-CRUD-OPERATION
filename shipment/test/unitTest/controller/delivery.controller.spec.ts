import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { faker } from '@faker-js/faker';
import { ShipmentMother } from '../../../domain/objectMother/shipment/shipmentMother';
import { UserMother } from '../../../domain/objectMother/tenant/createTenant';
import { StopMother } from '../../../domain/objectMother/stop/stop.mother';
import { STOPSTATUS, StopType } from '../../../domain/entity/stop.entity';

describe('DeliveryController', () => {
    let controller: DeliveryController;
    let tenantName: string;
    let request: any;


    const mockService = {
        delivery: jest.fn(),
    };

    beforeEach(async () => {
        jest.clearAllMocks();
        const tenant = new UserMother().get();
        tenantName = tenant.name;
        request = { tenant: tenantName };
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
        const stop = new StopMother({
            type: StopType.DELIVERY,
            status: STOPSTATUS.ARRIVED,
            sequenceNumber: 2,
        }).get();
         const shipmentData = new ShipmentMother({
            stops: [stop],
        }).create();
        const shipmentId = shipmentData.id;
        const stopId = stop.id;
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