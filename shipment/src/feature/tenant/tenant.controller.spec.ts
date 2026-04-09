import { Test, TestingModule } from '@nestjs/testing';
import { CreateTenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { BadRequestException } from '@nestjs/common';
import { UserMother } from '../../domain/objectMother/tenant/createTenant';

describe('CreateTenantController', () => {
    let controller: CreateTenantController;
    let service: TenantService;
    const mockService = {
        createTenant: jest.fn(),
    };
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CreateTenantController],
            providers: [{
                provide: TenantService,
                useValue: mockService,
            }]
        }).compile();

        controller = module.get<CreateTenantController>(CreateTenantController);
        service = module.get<TenantService>(TenantService);
    })

    it('should save tenant', async () => {
        const data = UserMother.createTenant();
        mockService.createTenant.mockResolvedValue(data)
        const result = await controller.createTenant(data.name);
        expect(result).toEqual(data);
        expect(service.createTenant).toHaveBeenCalledWith(data.name);
    });

    it('should throw error if tenant already exists', async () => {
        const data = UserMother.createTenant();
        mockService.createTenant.mockRejectedValue(
            new BadRequestException('Tenant already exists')
        );
        await expect(controller.createTenant(data.name)).rejects.toThrow(
            BadRequestException 
        );
    });
});