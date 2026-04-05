import { STOPSTATUS, Status, StopType } from "src/domain/entity/stop.entity";

export class StopTransformer {

    static response(stop) {

        const shipmentId = stop.shipment?.id;

        const links: any = {};

        if (
            stop.status === STOPSTATUS.ARRIVED &&
            stop.shipmentStatus === Status.Pending
        ) {
            if (stop.type === StopType.PICKUP) {
                links.pickup = {
                    href: `/shipments/${shipmentId}/stops/${stop.id}/pickup`,
                    method: 'PATCH'
                };
            }

            if (stop.type === StopType.DELIVERY) {
                links.delivery = {
                    href: `/shipments/${shipmentId}/stops/${stop.id}/delivery`,
                    method: 'PATCH'
                };
            }
        }

        if (stop.status === STOPSTATUS.TRANSIT) {
            links.arrive = {
                href: `/shipments/${shipmentId}/stops/${stop.id}/arrive`,
                method: 'PATCH'
            };
        }

        return {
            id: stop.id,
            sequenceNumber: stop.sequenceNumber,
            type: stop.type,
            status: stop.status,
            shipmentStatus: stop.shipmentStatus,

            _links: links,

            _meta: {
                tenantId: stop.tenant?.id || stop.tenant || null
            }
        };
    }
}