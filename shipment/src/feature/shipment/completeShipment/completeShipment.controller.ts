import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards, UseFilters, Req } from '@nestjs/common';
import { CompleteShipmentService } from './completeShipment.service';

@Controller('shipments')
export class CompleteShipmentController {
  constructor(private readonly completeShipment: CompleteShipmentService) { }
 
  @Patch(':shipmentId/complete')
  Complete(
    @Param('shipmentId') shipmentId: string,
    @Req() req: any
  ) {
    const tenantName = req.tenant;
    return this.completeShipment.completeShipment(shipmentId, tenantName);
  }
}
