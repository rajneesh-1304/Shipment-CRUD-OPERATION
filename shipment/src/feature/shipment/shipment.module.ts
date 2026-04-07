import { Module } from '@nestjs/common';
import { CreateShipmentController } from './createShipment/createShipment.controller';
import { CreateShipmentService } from './createShipment/createShipment.service';
import { CompleteShipmentService } from './completeShipment/completeShipment.service';
import { CompleteShipmentController } from './completeShipment/completeShipment.controller';

@Module({
  controllers: [CreateShipmentController, CompleteShipmentController],
  providers: [CreateShipmentService, CompleteShipmentService],
})
export class ShipmentModule {}
