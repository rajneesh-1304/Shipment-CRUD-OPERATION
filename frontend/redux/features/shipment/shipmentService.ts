import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createShipment } from "./shipmentSlice";

interface Shipment {
  id: string;
  title: string;
  totalStops: number;
  stops: []
}

interface ShipmentState {
  shipments: any[];
  currentShipment: Shipment | null;
  loading: boolean;
  error: string | null;
}

const initialState: ShipmentState = {
  shipments: [],
  currentShipment: null,
  loading: false,
  error: null,
};

export const createShipmentThunk = createAsyncThunk(
  "shipment/create",
  async (data: any, { rejectWithValue }) => {
    try {
      console.log(data, 'this is shipment data ')
      return await createShipment(data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);



const shipmentSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearShipment: (state: any) => {
      state.currentShipment = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createShipmentThunk.fulfilled, (state, action) => {
        state.currentShipment = action.payload;
        state.loading = false;
      })
      .addCase(createShipmentThunk.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShipmentThunk.rejected, (state, action) => {
        state.error = action.payload.error;
        state.loading = false;
      })

  },
});

export const { clearShipment } = shipmentSlice.actions;
export default shipmentSlice.reducer;
