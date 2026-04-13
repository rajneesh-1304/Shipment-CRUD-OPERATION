import { Test, TestingModule } from '@nestjs/testing';
import { CreateTenantController } from 'src/feature/tenant/tenant.controller';
import { TenantService } from 'src/feature/tenant/tenant.service';
import { BadRequestException } from '@nestjs/common';
import { UserMother } from 'src/domain/objectMother/tenant/createTenant';

describe('CreateTenantController', () => {
    let controller: CreateTenantController;

    const mockService = {
        createTenant: jest.fn(),
    };
    beforeEach(async () => {
        jest.clearAllMocks();
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CreateTenantController],
            providers: [
                {
                    provide: TenantService,
                    useValue: mockService,
                },
            ],
        }).compile();

        controller = module.get<CreateTenantController>(CreateTenantController);
    });

    it('should save tenant', async () => {
        const data = new UserMother().get();
        mockService.createTenant.mockResolvedValue(data.name);
        const result = await controller.createTenant(data.name);
        expect(result).toEqual(data.name);
        expect(mockService.createTenant).toHaveBeenCalledWith(data.name);
    });

    it('should throw error if tenant already exists', async () => {
        const data = new UserMother().get();
        mockService.createTenant.mockRejectedValue(
            new BadRequestException('Tenant already exists')
        );
        await expect(controller.createTenant(data.name)).rejects.toThrow(BadRequestException);
        expect(mockService.createTenant).toHaveBeenCalledWith(data.name);
    });
});