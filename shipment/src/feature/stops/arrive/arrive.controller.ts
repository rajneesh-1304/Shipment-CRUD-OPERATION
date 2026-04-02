import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { ArriveService } from './arrive.service';
@Controller('stop')
export class ArriveController {
  constructor(private readonly arriveService: ArriveService) { }
  @Patch('arrive')
    arrive(
      @Body('shipmentId') shipmentId: string,
      @Body('stopId') stopId: string,
    ){
      return this.arriveService.arrive(shipmentId, stopId);
    }
}
