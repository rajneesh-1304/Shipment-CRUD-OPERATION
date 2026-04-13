import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createSchema = async (data: any) => {
  try {
    const url = `${BASE_URL}/tenants`
    const res = await axios.post(url, data);
    return res.data;
  } catch (error) {
    console.error("Error in creating schema ", error);
    throw error;
  }
}

export const getSchema = async () => {
  try {
    const url = `${BASE_URL}/tenants`
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error("Error in getting schema ", error);
    throw error;
  }
}
