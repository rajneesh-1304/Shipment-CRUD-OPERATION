'use client'
import SchemaModal from '@/components/modal/schemaModal/SchemaModal';
import { getSchemaThunk, setCurrentSchema } from '@/redux/features/schema/schemaSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import './schema.css'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';


const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const schemas = useAppSelector(state => state.schema?.schemas);
  const router= useRouter();
  useEffect(() => {
    dispatch(getSchemaThunk());
  }, [])
  return (
    <div className='container'>
      <div className='header'>
        <div className='btn' onClick={() => setIsOpen(true)}>Add Schema</div>
        <div className='list'>
          {schemas?.map((schema: any) => (
            <div className='card' key={schema.id}
              onClick={() => {
                dispatch(setCurrentSchema(schema));
                router.push('/shipment');
              }}
            >{schema.name}</div>
          ))}
        </div>
      </div>

      {isOpen && <SchemaModal close={() => setIsOpen(false)} />}
    </div>
  )
}

export default page
