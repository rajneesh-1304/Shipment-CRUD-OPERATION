import { Controller, Post, Body } from '@nestjs/common';
import { TenantService } from './tenant.service';

@Controller('tenants')
export class CreateTenantController {
    constructor(private readonly tenantService: TenantService) { }
    @Post()
    createTenant(@Body('name') name: string) {
        return this.tenantService.createTenant(name);
    }
}
