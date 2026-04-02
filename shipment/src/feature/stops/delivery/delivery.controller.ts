import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
@Controller('stop')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) { }
  @Patch('delivery')
    delivery(
      @Body('shipmentId') shipmentId: string,
      @Body('stopId') stopId: string,
    ){
      return this.deliveryService.delivery(shipmentId, stopId);
    }
}
