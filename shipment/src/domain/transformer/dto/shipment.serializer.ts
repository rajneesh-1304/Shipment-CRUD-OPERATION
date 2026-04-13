import { Expose } from 'class-transformer';

export class ShipmentDto {

    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    status: string;
}