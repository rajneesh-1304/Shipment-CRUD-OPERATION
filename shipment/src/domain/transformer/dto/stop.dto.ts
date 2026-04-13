import { Expose } from 'class-transformer';

export class StopDto {
    @Expose()
    id: string;

    @Expose()
    sequenceNumber: number;

    @Expose()
    type: string;

    @Expose()
    status: string;

    @Expose()
    shipmentStatus: string;
}