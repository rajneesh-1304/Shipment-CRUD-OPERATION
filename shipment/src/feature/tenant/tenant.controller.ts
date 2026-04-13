import { Controller, Post, Body } from '@nestjs/common';
import { TenantService } from './tenant.service';

@Controller('tenants')
export class CreateTenantController {
    constructor(private readonly tenantService: TenantService) { }
    @Post()
    createTenant(@Body('title') title: string) {
        console.log(title)
        return this.tenantService.createTenant(title);
    }
}
