'use client'
import { completeShipmentThunk, getShipmentByIdThunk } from '@/redux/features/shipment/shipmentSlice';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import './stop.css';
import { arriveAtStopThunk, deliverAtStopThunk, pickupAtStopThunk } from '@/redux/features/stops/stopsSlice';
import { Box, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const Stops = () => {
    const params = useParams();
    const id = params.id;
    const dispatch = useAppDispatch();
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const schema = useAppSelector(state => state.schema.currentSchema);
    const schemaId = schema?.id;
    const shipment: any = useAppSelector(state => state.shipment.currentShipment);
    const stopError: any = useAppSelector(state => state.stop.error);
    const shipmentError: any = useAppSelector(state => state.shipment.error);
    useEffect(() => {
        if (id && schemaId) {
            dispatch(getShipmentByIdThunk({ id, schemaId }));
        }
    }, [dispatch, id, schemaId])

    const handleAction = async (actionThunk: any, successMessage: string) => {
        try {
            await dispatch(actionThunk).unwrap();
            dispatch(getShipmentByIdThunk({ id, schemaId }));
            setSnackbarMessage(successMessage);
            setSnackbarOpen(true);
        } catch (err: any) {
            setSnackbarMessage(stopError || 'an error occured');
            setSnackbarOpen(true);
        }
    }

    const handleArrive = (stopId: string) => {
        handleAction(
            arriveAtStopThunk({ shipmentId: shipment?.id, stopId, schemaId }),
            "Arrived at location"
        );
    }

    const handlePick = (stopId: string) => {
        handleAction(
            pickupAtStopThunk({ shipmentId: shipment?.id, stopId, schemaId }),
            "Picked up from location"
        );
    }

    const handleDeliver = (stopId: string) => {
        handleAction(
            deliverAtStopThunk({ shipmentId: shipment?.id, stopId, schemaId }),
            "Delivered at location"
        );
    }

    const handleCompleteShipment = async (id: string) => {
        try {
            const response = await dispatch(completeShipmentThunk({ id, schemaId })).unwrap();
            dispatch(getShipmentByIdThunk({ id, schemaId }));
            setSnackbarMessage(response.message);
            setSnackbarOpen(true);
        } catch (err: any) {
            setSnackbarMessage(shipmentError || 'an error occured');
            setSnackbarOpen(true);
        }
    }

    return (
            <Box className='stops-main'>
                <h1 className='head'>Shipment {shipment?.title} details</h1>
                <div className='shipment'>
                    <div>
                        <div className='status'>Shipment Status: {shipment?.status}</div>
                    </div>
                    {shipment.status === 'PENDING' && <button className='bttn' onClick={() => {
                        handleCompleteShipment(shipment?.id)
                    }}>
                        {shipment?.status === 'PENDING' ? 'PENDING' : 'COMPLETED'}
                    </button>}
                </div>
                <div>
                    {shipment?.stops?.map((stop: any) => (
                        <div className='all-card' key={stop.id} >
                            <div>
                                <div>Sequence Number: {stop?.sequenceNumber}</div>
                                <div>Stop Status: {stop?.status}</div>
                                <div>Stop Shipment Status: {stop?.shipmentStatus}</div>
                            </div>
                            <div className='buttons'>
                                <button className='bttn' onClick={() => handleArrive(stop?.id)}>
                                    {stop?.status === 'TRANSIT' ? 'Arrive at location' : (stop?.status === 'ARRIVED' ? 'Arrived' : 'Departed')}
                                </button>

                                {stop.shipmentStatus === 'Pending' && (
                                    <button className='bttn' onClick={() => {
                                        stop?.type === 'PICKUP' ? handlePick(stop?.id) : handleDeliver(stop?.id)
                                    }}>
                                        {stop?.type === 'PICKUP' ? 'Pickup' : 'Deliver'}
                                    </button>
                                )}
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
            </Box>
    )
}

export default Stops;
