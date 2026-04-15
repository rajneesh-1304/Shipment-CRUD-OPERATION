'use client'
import SchemaModal from '@/components/modal/schemaModal/SchemaModal';
import React, { useState } from 'react'

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
