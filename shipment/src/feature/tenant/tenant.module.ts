import { Module } from '@nestjs/common';
import { CreateTenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { CreateSchema } from 'src/infra/database/scripts/migrate-tenants';
@Module({
  controllers: [CreateTenantController],
  providers: [TenantService, CreateSchema],
})
export class TenantModule {}
