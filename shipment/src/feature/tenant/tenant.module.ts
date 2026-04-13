import { Get, Module } from '@nestjs/common';
import { CreateTenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { CreateSchema } from 'src/infra/database/scripts/migrate-tenants';
import { GetTenantService } from './getTenant/getTenant.service';
import { GetTenantController } from './getTenant/getTenant.controller';
@Module({
  controllers: [CreateTenantController, GetTenantController],
  providers: [TenantService, CreateSchema, GetTenantService],
})
export class TenantModule {}
