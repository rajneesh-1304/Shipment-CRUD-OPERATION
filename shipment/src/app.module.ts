import { Module, Controller, Get, UseGuards, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import databaseConfig from './mikro-orm.config';
import { ShipmentModule } from './feature/shipment/shipment.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './domain/exception.filter';
import { StopModule } from './feature/stops/stop.module';
import { TenantModule } from './feature/tenant/tenant.module';
import { TenantMiddleware } from './infra/middleware/middleware';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory:()=>databaseConfig
    }), 
    ShipmentModule,
    StopModule,
    TenantModule
  ],
  controllers: [AppController],
  providers: [AppService,{
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ]
})
export class AppModule implements NestModule {   
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .exclude('tenants')
      .forRoutes('*'); 
  }
}
