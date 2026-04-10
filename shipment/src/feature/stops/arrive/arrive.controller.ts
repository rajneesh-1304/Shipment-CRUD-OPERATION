import { Controller, Patch, Param, Req} from '@nestjs/common';
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
    const schema = req.tenant;
    return this.arriveService.arrive(shipmentId, stopId, schema);
  }
}
