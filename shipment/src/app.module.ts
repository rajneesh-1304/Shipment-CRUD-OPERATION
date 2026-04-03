import { Module, Controller, Get, UseGuards } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import databaseConfig from './mikro-orm.config';
import { ShipmentModule } from './feature/shipment/shipment.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './domain/exception.filter';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory:()=>databaseConfig
    }), 
    ShipmentModule,
    // StopModule
    
  ],
  controllers: [AppController],
  providers: [AppService,{
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ]
})
export class AppModule {}
