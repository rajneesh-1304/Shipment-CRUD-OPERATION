'use client'
import { completeShipmentThunk, getShipmentByIdThunk } from '@/redux/features/shipment/shipmentSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import './stop.css';
import { arriveAtStopThunk, deliverAtStopThunk, pickupAtStopThunk } from '@/redux/features/stops/stopsSlice';
import { Snackbar } from '@mui/material';

const Page = () => {
    const params = useParams();
    const id = params.id;
    const dispatch = useAppDispatch();
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const schema = useAppSelector(state => state.schema.currentSchema);
    const schemaId = schema?.id;
    const shipment = useAppSelector(state => state.shipment.currentShipment);
    const stopError = useAppSelector(state => state.stop.error);
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
            setSnackbarMessage(stopError || "An error occurred");
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

    const handleCompleteShipment = (id: string) => {
        handleAction(
            completeShipmentThunk({ id, schemaId }),
            "Completed Shipment"
        );
    }

    return (
        <div>
            <h1 className='heading'>Shipment {shipment?.title} details</h1>
            <div className='shipment'>
                <div>
                    <div className='status'>Shipment Status: {shipment?.status}</div>
                </div>
                {shipment.status === 'PENDING' && <button className='btn' onClick={() => {
                   handleCompleteShipment(shipment?.id)
                }}>
                    {shipment?.status === 'PENDING' ? 'PENDING' : 'COMPLETED'}
                </button>}
            </div>
            <div>
                {shipment?.stops?.map((stop: any) => (
                    <div className='card' key={stop.id} >
                        <div>
                            <div>Sequence Number: {stop?.sequenceNumber}</div>
                            <div>Stop Status: {stop?.status}</div>
                            <div>Stop Shipment Status: {stop?.shipmentStatus}</div>
                        </div>
                        <div className='buttons'>
                            <button className='btn' onClick={() => handleArrive(stop?.id)}>
                                {stop?.status === 'TRANSIT'  ? 'Arrive at location' : ( stop?.status === 'ARRIVED' ? 'Arrived' : 'Departed') }
                            </button>

                            {stop.shipmentStatus === 'Pending' && (
                                <button className='btn' onClick={() => {
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
        </div>
    )
}

export default Page;
