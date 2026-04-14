import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { completeShipment, createShipment, getShipment, getShipmentById } from "./shipmentService";

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
  async ({data, schemaId}: any, { rejectWithValue }) => {
    try {
      return await createShipment(data, schemaId);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getShipmentThunk = createAsyncThunk(
  "shipment/get",
  async (schemaId: any, { rejectWithValue }) => {
    try {
      return await getShipment( schemaId);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getShipmentByIdThunk = createAsyncThunk(
  "shipment/getbyid",
  async ({id,schemaId}: any, { rejectWithValue }) => {
    try {
      return await getShipmentById(id, schemaId);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const completeShipmentThunk = createAsyncThunk(
  "shipment/complete",
  async ({id,schemaId}: any, { rejectWithValue }) => {
    try {
      return await completeShipment(id, schemaId);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const shipmentSlice = createSlice({
  name: "shipment",
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
      .addCase(createShipmentThunk.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(getShipmentThunk.fulfilled, (state, action) => {
        state.shipments = action.payload;
        state.loading = false;
      })
      .addCase(getShipmentThunk.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShipmentThunk.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(getShipmentByIdThunk.fulfilled, (state, action) => {
        state.currentShipment = action.payload;
        state.loading = false;
      })
      .addCase(getShipmentByIdThunk.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShipmentByIdThunk.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(completeShipmentThunk.fulfilled, (state, action) => {
        state.currentShipment = action.payload;
        state.loading = false;
      })
      .addCase(completeShipmentThunk.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeShipmentThunk.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
      })

  },
});

export const { clearShipment } = shipmentSlice.actions;
export default shipmentSlice.reducer;
