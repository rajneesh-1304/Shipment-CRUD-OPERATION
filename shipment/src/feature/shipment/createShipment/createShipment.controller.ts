import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards, UseFilters } from '@nestjs/common';
import { CreateShipmentService } from './createShipment.service';
import { HttpExceptionFilter } from 'src/domain/exception.filter';
@Controller('shipment')
export class CreateShipmentController {
  constructor(private readonly shipmentService: CreateShipmentService) { }
  @Post('create')
  @UseFilters(HttpExceptionFilter)
  createShipment(
    @Body() data: any,
  ) {
    return this.shipmentService.createShipment(data);
  }
}
