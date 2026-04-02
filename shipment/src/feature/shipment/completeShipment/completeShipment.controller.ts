import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { CompleteShipmentService } from './completeShipment.service';
@Controller('shipment')
export class CompleteShipmentController {
  constructor(private readonly completeShipment: CompleteShipmentService) { }
  @Patch('complete')
    Complete(
      @Body('shipmentId') shipmentId: string,
    ){
      return this.completeShipment.completeShipment(shipmentId);
    }
}
