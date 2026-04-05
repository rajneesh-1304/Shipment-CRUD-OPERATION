import { Controller, Post, Body, UseFilters, Req } from '@nestjs/common';
import { CreateShipmentService } from './createShipment.service';
import { HttpExceptionFilter } from 'src/domain/exception.filter';

@Controller('shipments')
export class CreateShipmentController {
  constructor(private readonly shipmentService: CreateShipmentService) { }
  @Post()
  createShipment(
    @Body() data: any,
    @Req() req: any
  ) {
    const tenantId = req.tenantId;
    return this.shipmentService.createShipment(data, tenantId);
  }
}
