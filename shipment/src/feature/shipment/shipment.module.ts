import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from 'src/domain/entity/shipment';
import { Stop } from 'src/domain/entity/stop';
import { CreateShipmentController } from './createShipment/createShipment.controller';
import { CreateShipmentService } from './createShipment/createShipment.service';
import { CompleteShipmentService } from './completeShipment/completeShipment.service';
import { CompleteShipmentController } from './completeShipment/completeShipment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment, Stop]), ],
  controllers: [CreateShipmentController, CompleteShipmentController],
  providers: [CreateShipmentService, CompleteShipmentService],
})
export class ShipmentModule {}
