import { Controller, Patch, Param} from '@nestjs/common';
import { ArriveService } from './arrive.service';

@Controller('shipments/:shipmentId/stops')
export class ArriveController {
  constructor(private readonly arriveService: ArriveService) { }
  @Patch(':stopId/arrive')
  arrive(
    @Param('shipmentId') shipmentId: string,
    @Param('stopId') stopId: string,
  ) {
    return this.arriveService.arrive(shipmentId, stopId);
  }
}
