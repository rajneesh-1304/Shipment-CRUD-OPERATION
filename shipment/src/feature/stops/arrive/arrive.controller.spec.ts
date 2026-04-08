import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, it } from 'node:test';
import { ArriveController } from './arrive.controller';
import { ArriveService } from './arrive.service';
import { MikroORM } from '@mikro-orm/postgresql';
import { Shipment } from '../../../domain/entity/shipment.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import databaseConfig from '../../../mikro-orm.config';
import { NotFoundException } from '@nestjs/common';

describe('ArriveService', () => {
    let controller: ArriveController;
    let service: ArriveService;
    let orm: MikroORM;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports:[
                MikroOrmModule.forRootAsync({...databaseConfig}),
                MikroOrmModule.forFeature([Shipment])],
            controllers: [ArriveController],
            providers: [ArriveService]
        }).compile();

        controller = module.get<ArriveController>(ArriveController);
        service = module.get<ArriveService>(ArriveService);
        orm = module.get<MikroORM>(MikroORM);
    })

    it('shipmentId and stopId is required', async () => {
        // const shipmentId ='fasdf';
        // const stopId='fasdsf';
        expect(service).toBeDefined();
    });

    it('shipment not found', async () => {
        const shipmentId = '09389b11-2aa8-493f-b832-2c690a4c30c9';
        const shipment = await orm.em.findOne(Shipment, {id: shipmentId}, {schema: 'four'});
        console.log(shipment, '------------------->>>>>>>>>>>>>>>>>>');
        if(!shipment){
            throw new NotFoundException("Shipment not found");
        }
    })

});
