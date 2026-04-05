import { Controller, Post, Body, UseFilters, Req } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/domain/exception.filter';
import { TenantService } from './tenant.service';

@Controller('tenants')
export class CreateTenantController {
    constructor(private readonly tenantService: TenantService) { }
    @Post()
    createTenant(@Body('name') name: string) {
        return this.tenantService.createTenant(name);
    }
}
