import { Controller, Post, Body, Get } from '@nestjs/common';
import { GetTenantService } from './getTenant.service';

@Controller('tenants')
export class GetTenantController {
    constructor(private readonly getTenantService: GetTenantService) { }
    @Get()
    getTenant() {
        return this.getTenantService.getTenant();
    }
}
