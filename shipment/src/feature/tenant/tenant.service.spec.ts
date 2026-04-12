import { TenantService } from './tenant.service';
import { BadRequestException } from '@nestjs/common';
import { UserMother } from '../../domain/objectMother/tenant/createTenant';

describe('TenantService', () => {
  let service: TenantService;

  const mockEm = {
    findOne: jest.fn(),
    create: jest.fn(),
    flush: jest.fn(),
  };

  const mockCreateSchema = {
    createSchema: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    service = new TenantService(
      mockEm as any,
      mockCreateSchema as any
    );
  });

  it('should throw error if tenant already exists', async () => {
    const tenantData = new UserMother().get();

    mockEm.findOne.mockResolvedValue(tenantData);
    await expect(service.createTenant(tenantData.name)).rejects.toThrow(BadRequestException);
    expect(mockEm.findOne).toHaveBeenCalledWith(expect.anything(), {
      name: tenantData.name,
    });
  });

  it('should create tenant successfully', async () => {
    const tenantData = new UserMother().get();

    mockEm.findOne.mockResolvedValue(null);
    mockEm.create.mockReturnValue(tenantData);

    const result = await service.createTenant(tenantData.name);
    expect(result).toEqual({
      id: tenantData.id,
      name: tenantData.name,
    });
    expect(mockEm.create).toHaveBeenCalledWith(expect.anything(), { name: tenantData.name, });
    expect(mockCreateSchema.createSchema).toHaveBeenCalledWith(tenantData.name);
  });
});