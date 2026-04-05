import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class TenantMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const tenantId = req.headers['x-tenant-id'];
        if(!tenantId){
            throw new BadRequestException('Tenant Id is missing');
        }
        req.tenantId = tenantId;
        next();
    }
}