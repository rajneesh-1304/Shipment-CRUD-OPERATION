import { useAppSelector } from "@/redux/hooks";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createShipment = async (data: any) => {
    const currentSchemaId = useAppSelector(state => state.schema.id);
    try {
        const url = `${BASE_URL}/shipment`
        const res = await axios.post(url, data, {
            headers: {
                'x-tenant-id': currentSchemaId,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error in creating schema ", error);
        throw error;
    }
}