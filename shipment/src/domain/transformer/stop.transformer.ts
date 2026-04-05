import { plainToInstance } from "class-transformer";
import { STOPSTATUS, Status, StopType } from "src/domain/entity/stop.entity";
import { StopDto } from "../dto/stop.dto";

export class StopTransformer {

    static response(stop) {

        const shipmentId = stop.shipment?.id;

        const links: any = {};

        const data = plainToInstance(StopDto, stop, {
            excludeExtraneousValues: true
        });

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
            data,

            _links: links,

            _meta: {
                tenantId: stop.tenant?.id || stop.tenant || null
            }
        };
    }
}