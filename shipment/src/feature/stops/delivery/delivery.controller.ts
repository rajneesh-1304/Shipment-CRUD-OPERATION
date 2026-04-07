import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards, UseFilters, Req } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Controller('shipments/:shipmentId/stops')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) { }
  @Patch(':stopId/delivery')
  delivery(
    @Param('shipmentId') shipmentId: string,
    @Param('stopId') stopId: string,
    @Req() req: any
  ) {
    const tenantName = req.tenant;
    return this.deliveryService.delivery(shipmentId, stopId, tenantName);
  }
}
