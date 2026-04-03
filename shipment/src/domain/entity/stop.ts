// import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// import { Shipment } from "./shipment";

// export enum StopType{
//     PICKUP = "PICKUP",
//     DELIVERY = "DELIVERY"
// }

// export enum STOPSTATUS{
//     ARRIVED = 'ARRIVED',
//     TRANSIT = 'TRANSIT',
//     DEPARTED = 'DEPARTED'
// }

// export enum Status{
//     Pending = "Pending",
//     Completed = "Completed"
// }

// @Entity("Stop")
// export class Stop{
//     @PrimaryGeneratedColumn("uuid")
//     id: string;

//     @Column()
//     sequenceNumber: number;

//     @Column({type:"enum", enum: StopType})
//     type: StopType;

//     @Column({type:"enum", enum: STOPSTATUS, default: STOPSTATUS.TRANSIT})
//     status: STOPSTATUS;

//     @Column({type:"enum", enum: Status, default: Status.Pending})
//     shipmentStatus: Status

//     @CreateDateColumn()
//     createdAt: Date;

//     @UpdateDateColumn()
//     updatedAt: Date;

//     @ManyToOne(() => Shipment, (shipment) => shipment.stops)
//     shipment: Shipment;
// }