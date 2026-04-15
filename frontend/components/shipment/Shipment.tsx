'use client'
import React, { useEffect, useState } from 'react'
import ShipmentModal from '../modal/Modal';
import './shipment.css';
import { getShipmentThunk } from '@/redux/features/shipment/shipmentSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';

const Shipment = () => {
    const [isOpen, setIsOpen] = useState(false);
    const schema = useAppSelector(state => state.schema?.currentSchema);
    const currentSchemaId = schema?.id;
    const shipments = useAppSelector(state => state.shipment.shipments);
    const dispatch = useAppDispatch();
    const router = useRouter();
    useEffect(() => {
        if(currentSchemaId){
            dispatch(getShipmentThunk(currentSchemaId));
        }
    }, [])
    return (
        <>
            <div className='containerr'>
                <h1 className='heading'>Shipments of Schema {schema?.name}</h1>
                <div className='shipment-btn'>
                    <button className='shipmentbtn' onClick={() => setIsOpen(true)}>Add Shipment</button>
                </div>
                <div>
                    {shipments?.map((shipment: any) => (
                        <div className='shipment-card' key={shipment.id}
                            onClick={() => {
                                router.push(`/shipment/${shipment.id}`);
                            }}
                        >
                            <div>
                                Shipment: {shipment.title}
                            </div>
                            <div>
                                Status: {shipment.status}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isOpen && <ShipmentModal close={() => setIsOpen(false)} />}
        </>
    )
}

export default Shipment
