import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from 'src/domain/entity/shipment';
import { Stop } from 'src/domain/entity/stop';
import { DeliveryController } from './delivery/delivery.controller';
import { PickupController } from './pickup/pickup.controller';
import { DeliveryService } from './delivery/delivery.service';
import { PickupService } from './pickup/pickup.service';
import { ArriveController } from './arrive/arrive.controller';
import { ArriveService } from './arrive/arrive.service';
@Module({
  imports: [TypeOrmModule.forFeature([Shipment, Stop]), ],
  controllers: [DeliveryController, PickupController, ArriveController],
  providers: [DeliveryService, PickupService, ArriveService],
})
export class StopModule {}
