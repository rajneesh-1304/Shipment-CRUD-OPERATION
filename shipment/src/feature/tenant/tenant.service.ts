import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Tenant } from 'src/domain/entity/tenant.entity';
import { CreateSchema } from 'src/infra/scripts/migrate-tenants';

@Injectable()
export class TenantService {
    constructor(private readonly em: EntityManager, private readonly createSchema: CreateSchema) { }

    async createTenant(name: string) {
        const exists = await this.em.findOne(Tenant, { name: name });
        if (exists) {
            throw new BadRequestException("Tenant already exists");
        }
        const tenant = this.em.create(Tenant, {
            name: name,
        });
        await this.em.flush();
        
        await this.createSchema.createSchema(name);

        return {
            id: tenant.id,
            name: tenant.name,
        };
    }
}