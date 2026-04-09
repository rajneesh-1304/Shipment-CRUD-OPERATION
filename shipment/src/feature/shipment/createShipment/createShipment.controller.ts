import { Controller, Post, Body, UseFilters, Req } from '@nestjs/common';
import { CreateShipmentService } from './createShipment.service';

@Controller('shipments')
export class CreateShipmentController {
  constructor(private readonly shipmentService: CreateShipmentService) { }
  @Post()
  createShipment(
    @Body() data: any,
  ) {
    return this.shipmentService.createShipment(data);
  }
}
