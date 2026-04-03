// import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// import { Stop } from "./stop";

// export enum STATUS{
//     PENDING = "PENDING",
//     COMPLETED = "COMPLETED"
// }

// @Entity("shipment")
// export class Shipment{
//     @PrimaryGeneratedColumn("uuid")
//     id: string;

//     @Column()
//     title: string;

//     @OneToMany(() => Stop, (stop) => stop.shipment, { cascade: true })
//     stops: Stop[];

//     @Column({type:"enum", enum: STATUS, default: STATUS.PENDING})
//     status: STATUS;

//     @Column()
//     totalStops: number;

//     @Column({default: 0})
//     coveredStops: number;
    
//     @CreateDateColumn()
//     createdAt: Date;

//     @UpdateDateColumn()
//     updatedAt: Date;


// }