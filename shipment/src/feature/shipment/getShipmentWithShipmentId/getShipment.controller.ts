import { Controller, Post, Body, Get, Req, Param } from '@nestjs/common';
import { GetShipmentWithShipmentIdService } from './getShipment.service';

@Controller('shipments')
export class GetShipmentWithShipmentIdController {
    constructor(private readonly getShipmentWithShipmentIdService: GetShipmentWithShipmentIdService) { }
    @Get(':id')
    getShipment(
        @Param('id') id: string,
        @Req() req: any
    ) {
        const schema = req.tenant;
        return this.getShipmentWithShipmentIdService.getShipmentWithShipmentId(id,schema);
    }
}
