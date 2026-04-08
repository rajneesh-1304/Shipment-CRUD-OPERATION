import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, it } from 'node:test';
import { CreateTenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import databaseConfig from '../../mikro-orm.config';
import { Tenant } from '../../domain/entity/tenant.entity';
import { BadRequestException } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/postgresql';
import { UserMother } from 'src/domain/objectMother/tenant/createTenant';

describe('TenantService', () => {
    let controller: CreateTenantController;
    let service: TenantService;
    let orm: MikroORM;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MikroOrmModule.forRootAsync({ ...databaseConfig }),
                MikroOrmModule.forFeature([Tenant])],
            controllers: [CreateTenantController],
            providers: [TenantService]
        }).compile();

        controller = module.get<CreateTenantController>(CreateTenantController);
        service = module.get<TenantService>(TenantService);
        orm = module.get<MikroORM>(MikroORM);
    })

    it('should save tenant', async () => {
        const data = UserMother.createTenant();
        const exists = await orm.em.findOne(Tenant, { name: data.name });
        if (exists) {
            throw new BadRequestException("Tenant already exists");
        }else{
            throw new BadRequestException("Tenant not found");
        }
    });
});
