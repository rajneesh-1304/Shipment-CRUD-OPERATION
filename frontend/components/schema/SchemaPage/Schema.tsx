'use client'
import SchemaModal from '@/components/modal/schemaModal/SchemaModal';
import { getSchemaThunk, setCurrentSchema } from '@/redux/features/schema/schemaSlice';
import './schema.css'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Box } from '@mui/material';


const Schema = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const schemas = useAppSelector(state => state.schema?.schemas);
  const currentSchema = useAppSelector(state =>  state.schema.currentSchema);
  const router= useRouter();
  useEffect(() => {
    if(currentSchema?.id){
      dispatch(getSchemaThunk());
    }
  }, [])
  return (
      <Box sx={{height:'100vh', width:'100vw',padding:'20px'}}>
      <h1 className= 'head'>Schemas of Multi-Tenant Application</h1>
      <div className='header'>
        <div className='schema-btn'>
          <button className='btn' onClick={() => setIsOpen(true)}>Add Schema</button>
        </div>
        <h1 className= 'schema-head'>All Schemas</h1>
        <div className='list-all'>
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
    </Box>
  )
}

export default Schema
