import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { PickupService } from './pickup.service';
@Controller('stop')
export class PickupController {
  constructor(private readonly pickupService: PickupService) { }
  @Patch('pick')
  pickup(
    @Body('shipmentId') shipmentId: string,
    @Body('stopId') stopId: string,
  ) {
    return this.pickupService.pickup(shipmentId, stopId);
  }
}
