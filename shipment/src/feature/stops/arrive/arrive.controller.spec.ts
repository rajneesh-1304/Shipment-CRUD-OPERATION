import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ArriveController } from './arrive.controller';
import { ArriveService } from './arrive.service';
import { ShipmentMother } from '../../../domain/objectMother/shipment/shipmentMother';
import { faker } from '@faker-js/faker';
import { UserMother } from '../../../domain/objectMother/tenant/createTenant';

describe('ArriveController', () => {
    let controller: ArriveController;
    const tenant = new UserMother();
    const tenantName = tenant.get().name;
    const request = {
        tenant: tenantName
    } as unknown as Request;

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
        await expect(controller.arrive('', '', request)).rejects.toThrow(
            BadRequestException
        )
        expect(mockService.arrive).toHaveBeenCalledWith(
            '',
            '',
            tenantName,
        );
    });

    it('should thrwo error if shipment not found', async () => {
        const shipmentId = faker.string.uuid();
        const stopId = faker.string.uuid();
        mockService.arrive.mockRejectedValue(
            new NotFoundException('Shipment not found')
        );
        await expect(controller.arrive(shipmentId, stopId, request)).rejects.toThrow(
            NotFoundException
        )
        expect(mockService.arrive).toHaveBeenCalledWith(
            shipmentId,
            stopId,
            tenantName
        );
    });

    it('should arrive successfully', async () => {
        const shipment = new ShipmentMother();
        const shipmentData = shipment.create();
        const shipmentId = shipmentData.id;
        const random = Math.floor(Math.random() * 5) + 1;
        const stopId = shipmentData.stops[random]?.id;
        const response = { id: stopId };
        mockService.arrive.mockResolvedValue(response);

        const result = await controller.arrive(shipmentId, stopId, request);

        expect(result).toEqual(response);
        expect(mockService.arrive).toHaveBeenCalledWith(
            shipmentId,
            stopId,
            tenantName
        );
    })
});