import { Module, Controller, Get, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShipmentModule } from './feature/shipment/shipment.module';
import { StopModule } from './feature/stops/stop.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions, 
    }),  
    ShipmentModule,
    StopModule
  ],
  controllers: [AppController],
  providers: [AppService,]
})
export class AppModule {}
