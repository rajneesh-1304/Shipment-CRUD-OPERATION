import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards, UseFilters, Req } from '@nestjs/common';
import { ArriveService } from './arrive.service';

@Controller('shipments/:shipmentId/stops')
export class ArriveController {
  constructor(private readonly arriveService: ArriveService) { }
  @Patch(':stopId/arrive')
  arrive(
    @Param('shipmentId') shipmentId: string,
    @Param('stopId') stopId: string,
    @Req() req: any
  ) {
    const tenantName = req.tenant;
    return this.arriveService.arrive(shipmentId, stopId, tenantName);
  }
}
