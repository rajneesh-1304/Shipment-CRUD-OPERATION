import { EntityManager, MikroORM, RequestContext } from "@mikro-orm/postgresql";
import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { Tenant } from "src/domain/entity/tenant.entity";

@Injectable()
export class TenantMiddleware implements NestMiddleware {
    constructor(private readonly orm: MikroORM) { }
    async use(req: any, res: any, next: () => void) {
        RequestContext.create(this.orm.em, async () => {
            const em = this.orm.em.getContext();
            const tenantId = req.headers['x-tenant-id'];
            if (!tenantId) {
                throw new BadRequestException('Tenant Id is missing');
            }
            req.tenantId = tenantId;
            try {
                const isExists = await em.findOne(Tenant, { id: tenantId }, {schema:"public"});
                if(isExists){
                    req.tenant = isExists.name;
                }
            } catch (error) {
                console.log(error);
            }
            next();
        })
    }
}