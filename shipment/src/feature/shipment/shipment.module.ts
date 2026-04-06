import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { CreateShipmentController } from './createShipment/createShipment.controller';
// import { CreateShipmentService } from './createShipment/createShipment.service';
// import { CompleteShipmentService } from './completeShipment/completeShipment.service';
// import { CompleteShipmentController } from './completeShipment/completeShipment.controller';
// import { Shipment } from 'src/domain/entity/shipment.entity';
// import { Stop } from 'src/domain/entity/stop.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([Shipment, Stop]), ],
  // controllers: [CreateShipmentController, CompleteShipmentController],
  // providers: [CreateShipmentService, CompleteShipmentService],
})
export class ShipmentModule {}
