'use client'
import React, { useState } from 'react'
import ShipmentModal from '../modal/Modal';
import { useAppSelector } from '@/redux/hooks';

const Shipment = () => {
    const [isOpen, setIsOpen] = useState(false);
    const schema = useAppSelector(state => state.schema?.currentSchema);
    console.log("current schema in shipment page", schema);
    return (
        <>
            <div>
                <div>

                </div>
                <div onClick={() => setIsOpen(true)}>Add Shipment</div>

            </div>

            {isOpen && <ShipmentModal close={()=>setIsOpen(false)}/>}
        </>
    )
}

export default Shipment
