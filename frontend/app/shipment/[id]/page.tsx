'use client'
import { getShipmentByIdThunk } from '@/redux/features/shipment/shipmentSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import './stop.css';
import { arriveAtStopThunk, deliverAtStopThunk, pickupAtStopThunk } from '@/redux/features/stops/stopsSlice';
import { Snackbar } from '@mui/material';

const page = () => {
    const params = useParams();
    const id = params.id;
    const dispatch = useAppDispatch();
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const schema = useAppSelector(state => state.schema.currentSchema);
    const schemaId = schema?.id;
    const shipment = useAppSelector(state => state.shipment.currentShipment);
    useEffect(() => {
        dispatch(getShipmentByIdThunk({ id, schemaId }));
    }, [])

    const handleArrive = async (stopId: string) => {
        try {
            await dispatch(arriveAtStopThunk({ shipmentId: shipment?.id, stopId, schemaId }));
            dispatch(getShipmentByIdThunk({ id, schemaId }));
            setSnackbarMessage("Arrived at location");
            setSnackbarOpen(true);
            setTimeout(() => close(), 800);
        } catch (error: any) {
            setSnackbarMessage(error);
            setSnackbarOpen(true);
        }
    }

    const handlePick = async (stopId: string) => {
        try {
           await dispatch(pickupAtStopThunk({ shipmentId: shipment?.id, stopId, schemaId }));
           dispatch(getShipmentByIdThunk({ id, schemaId }));
           setSnackbarMessage("Picked up from location");
            setSnackbarOpen(true);
            setTimeout(() => close(), 800);
        } catch (error: any) {
            setSnackbarMessage(error);
            setSnackbarOpen(true);
        }
    }

    const handleDeliver = async (stopId: string) => {
        try {
            await dispatch(deliverAtStopThunk({ shipmentId: shipment?.id, stopId, schemaId }));
            dispatch(getShipmentByIdThunk({ id, schemaId }));
            setSnackbarMessage("Picked up from location");
            setSnackbarOpen(true);
            setTimeout(() => close(), 800);
        } catch (error: any) {
            setSnackbarMessage(error);
            setSnackbarOpen(true);
        }
    }

    return (
        <div>
            <h1 className='heading'>Shipment {shipment?.title} details</h1>
            <div className='status'>Shipment Status: {shipment?.status}</div>
            <div>
                {shipment?.stops?.map((stop: any) => (
                    <div className='card' key={stop.id}
                    >
                        <div>
                            <div>Sequence Number: {stop?.sequenceNumber}</div>
                            <div>Stop Status: {stop?.status}</div>
                            <div>Stop Shipment Status: {stop?.shipmentStatus}</div>
                        </div>

                        <div className='buttons'>
                            <button className='btn' onClick={() => handleArrive(stop?.id)}>{stop?.status === 'TRANSIT' ? 'Arrive at location' : (stop?.status === 'ARRIVED' && stop.shipmentStatus === 'Pending' ? 'Arrived from location' : 'Departed from location')}</button>
                            {stop.shipmentStatus === 'Pending' && <button className='btn' onClick={() => {
                                stop?.type === 'PICKUP' ? handlePick(stop?.id) : handleDeliver(stop?.id)
                            }}>{stop?.type === 'PICKUP' ? 'Pickup at location' : 'Deliver at location'}</button>}
                        </div>
                    </div>
                ))}
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </div>
    )
}

export default page
