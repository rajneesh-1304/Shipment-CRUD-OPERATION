import { Module } from '@nestjs/common';
import { CreateTenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
@Module({
  controllers: [CreateTenantController],
  providers: [TenantService],
})
export class TenantModule {}
