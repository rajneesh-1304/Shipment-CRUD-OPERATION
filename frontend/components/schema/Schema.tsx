'use client'
import React, { useState } from 'react'
import SchemaModal from '../modal/Modal';

const Schema = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div>
                <div>

                </div>
                <div onClick={() => setIsOpen(true)}>Add Schema</div>

            </div>

            {isOpen && <SchemaModal close={()=>setIsOpen(false)}/>}
        </>
    )
}

export default Schema
