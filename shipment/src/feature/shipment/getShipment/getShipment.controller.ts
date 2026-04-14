import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { GetShipmentService } from './getShipment.service';

@Controller('shipments')
export class GetShipmentController {
    constructor(private readonly getShipmentService: GetShipmentService) { }
    @Get()
    getShipment(
        @Req() req: any
    ) {
        const schema = req.tenant;
        return this.getShipmentService.getShipments(schema);
    }
}
