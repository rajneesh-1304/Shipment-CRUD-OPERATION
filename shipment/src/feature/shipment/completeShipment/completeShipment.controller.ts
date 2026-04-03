import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards, UseFilters } from '@nestjs/common';
import { CompleteShipmentService } from './completeShipment.service';
import { HttpExceptionFilter } from 'src/domain/exception.filter';
@Controller('shipment')
export class CompleteShipmentController {
  constructor(private readonly completeShipment: CompleteShipmentService) { }
  @Patch('complete')
  @UseFilters(HttpExceptionFilter)
  Complete(
    @Body('shipmentId') shipmentId: string,
  ) {
    return this.completeShipment.completeShipment(shipmentId);
  }
}
