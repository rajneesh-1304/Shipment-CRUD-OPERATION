import { plainToInstance } from "class-transformer";
import { ShipmentDto } from "./dto/shipment.serializer";

export class ShipmentTransformer {

    static response(shipment) {
        const data = plainToInstance(ShipmentDto, shipment, {
            excludeExtraneousValues: true
        });
        return {
            data,
            _links: {
                self: { href: `/shipments/${shipment.id}`, method: 'POST' },
                complete: { href: `/shipments/${shipment.id}/complete`, method: 'PATCH' },
            },
            _meta: {
                tenantId: shipment.tenant?.id || shipment.tenant
            }
        };
    }
}