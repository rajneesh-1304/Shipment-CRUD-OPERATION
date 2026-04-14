import { useAppSelector } from "@/redux/hooks";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createShipment = async (data: any, schemaId: string) => {
    try {
        const url = `${BASE_URL}/shipments`;
        const res = await axios.post(url, data, {
            headers: {
                'x-tenant-id': schemaId,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error in creating shipment", error);
        throw error;
    }
};

export const getShipment = async (schemaId: string) => {
    try {
        const url = `${BASE_URL}/shipments`;
        const res = await axios.get(url, {
            headers: {
                'x-tenant-id': schemaId,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error in getting shipments", error);
        throw error;
    }
}

export const getShipmentById = async (id: string, schemaId: string) => {
    try {
        const url = `${BASE_URL}/shipments/${id}`;
        const res = await axios.get(url, {
            headers: {
                'x-tenant-id': schemaId,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error in getting shipment", error);
        throw error;
    }
}

export const completeShipment = async (id: string, schemaId: string) => {
    try {
        const url = `${BASE_URL}/shipments/${id}`;
        const res = await axios.patch(url, {}, {
            headers: {
                'x-tenant-id': schemaId,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error in completing shipment", error);
        throw error;
    }
}