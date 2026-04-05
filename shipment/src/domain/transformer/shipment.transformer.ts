export class ShipmentTransformer {

    static response(shipment) {
        return {
            id: shipment.id,
            title: shipment.title,
            status: shipment.status,

            _links: {
                self: { href: `/shipments/${shipment.id}`, method:'POST' },
                complete: { href: `/shipments/${shipment.id}/complete`, method: 'PATCH' },
            },
            _meta: {
                tenantId: shipment.tenant?.id || shipment.tenant
            }
        };
    }
}