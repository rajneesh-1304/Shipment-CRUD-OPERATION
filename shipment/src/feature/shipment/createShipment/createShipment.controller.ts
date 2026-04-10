import { Controller, Post, Body, UseFilters, Req } from '@nestjs/common';
import { CreateShipmentService } from './createShipment.service';

@Controller('shipments')
export class CreateShipmentController {
  constructor(private readonly shipmentService: CreateShipmentService) { }
  @Post()
  createShipment(
    @Body() data: any,
    @Req() req: any
  ) {
    const schema = req.tenant;
    return this.shipmentService.createShipment(data, schema);
  }
}
