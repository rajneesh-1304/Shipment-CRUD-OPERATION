import { Module } from '@nestjs/common';
import { CreateShipmentController } from './createShipment/createShipment.controller';
import { CreateShipmentService } from './createShipment/createShipment.service';
import { CompleteShipmentService } from './completeShipment/completeShipment.service';
import { CompleteShipmentController } from './completeShipment/completeShipment.controller';
import { GetShipmentController } from './getShipment/getShipment.controller';
import { GetShipmentService } from './getShipment/getShipment.service';
import { GetShipmentWithShipmentIdController } from './getShipmentWithShipmentId/getShipment.controller';
import { GetShipmentWithShipmentIdService } from './getShipmentWithShipmentId/getShipment.service';

@Module({
  controllers: [CreateShipmentController, CompleteShipmentController, GetShipmentController, GetShipmentWithShipmentIdController],
  providers: [CreateShipmentService, CompleteShipmentService, GetShipmentService, GetShipmentWithShipmentIdService],
})
export class ShipmentModule {}
