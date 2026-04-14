import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const arriveAtStop = async (shipmentId: string, stopId: string, schemaId: string) => {
    try {
        const url = `${BASE_URL}/shipments/${shipmentId}/stops/${stopId}/arrive`;
        const res = await axios.patch(url, {}, {
            headers: {
                'x-tenant-id': schemaId,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error in arriving at stop of shipment", error);
        throw error;
    }
};

export const pickupAtStop = async (shipmentId: string, stopId: string, schemaId: string) => {
    try {
        const url = `${BASE_URL}/shipments/${shipmentId}/stops/${stopId}/pickup`;
        const res = await axios.patch(url, {}, {
            headers: {
                'x-tenant-id': schemaId,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error in pickup at stop of shipment", error);
        throw error;
    }
};

export const deliverAtStop = async (shipmentId: string, stopId: string, schemaId: string) => {
    try {
        console.log(shipmentId, stopId, schemaId, 'these are three ids ')
        const url = `${BASE_URL}/shipments/${shipmentId}/stops/${stopId}/delivery`;
        const res = await axios.patch(url, {}, {
            headers: {
                'x-tenant-id': schemaId,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error in delivering at stop of shipment", error);
        throw error;
    }
};