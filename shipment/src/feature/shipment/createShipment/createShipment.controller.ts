import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { CreateShipmentService } from './createShipment.service';
@Controller('shipment')
export class CreateShipmentController {
  constructor(private readonly shipmentService: CreateShipmentService) { }
  @Post('create')
    createShipment(
      @Body() data: any,
    ){
      return this.shipmentService.createShipment(data);
    }
}
