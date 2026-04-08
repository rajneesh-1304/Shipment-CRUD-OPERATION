import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards, UseFilters, Req } from '@nestjs/common';
import { PickupService } from './pickup.service';

@Controller('shipments/:shipmentId/stops')
export class PickupController {
  constructor(private readonly pickupService: PickupService) { }
  @Patch(':stopId/pickup')
  pickup(
    @Param('shipmentId') shipmentId: string,
    @Param('stopId') stopId: string,
  ) {
    return this.pickupService.pickup(shipmentId, stopId);
  }
}
