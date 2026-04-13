import { Module, Controller, Get, UseGuards, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ShipmentModule } from './feature/shipment/shipment.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './domain/exception.filter';
import { StopModule } from './feature/stops/stop.module';
import { TenantModule } from './feature/tenant/tenant.module';
import { TenantMiddleware } from './infra/middleware/middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './infra/database/config/mikro-orm.config';
// import {RequestContextModule} from 'nestjs-request-context'

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory:()=>databaseConfig,
    }), 
    ShipmentModule,
    StopModule,
    TenantModule,
    ConfigModule
    // RequestContextModule
  ],
  controllers: [AppController],
  providers: [AppService,{
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },ConfigService
  ]
})
export class AppModule implements NestModule {   
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .exclude(
        { path: 'tenants', method: RequestMethod.GET },
        { path: 'tenants', method: RequestMethod.POST }
      )
      .forRoutes('*'); 
  }
}
