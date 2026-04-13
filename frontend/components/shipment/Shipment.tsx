'use client'
import React, { useState } from 'react'
import ShipmentModal from '../modal/Modal';

const Shipment = () => {
    const [isOpen, setIsOpen] = useState(false);
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
