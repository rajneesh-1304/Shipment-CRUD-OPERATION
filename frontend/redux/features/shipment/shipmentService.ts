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

