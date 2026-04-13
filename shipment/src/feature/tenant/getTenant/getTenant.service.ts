import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Tenant } from 'src/domain/entity/tenant.entity';

@Injectable()
export class GetTenantService {
    constructor(private readonly em: EntityManager,) { }

    async getTenant() {
        const schemas = await this.em.findAll(Tenant);
        
        return schemas
    }
}