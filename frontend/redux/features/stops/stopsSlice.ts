import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { arriveAtStop, deliverAtStop, pickupAtStop } from "./stopsService";

interface StopState {
  loading: boolean;
  error: string | null;
}

const initialState: StopState = {
  loading: false,
  error: null,
};

export const arriveAtStopThunk = createAsyncThunk(
  "stop/arrive",
  async ({shipmentId, stopId, schemaId}: any, { rejectWithValue }) => {
    try {
      return await arriveAtStop(shipmentId, stopId, schemaId);
    } catch (err: any) {
      return rejectWithValue(err.response.data.title);
    }
  }
);

export const pickupAtStopThunk = createAsyncThunk(
  "stop/pickup",
  async ({shipmentId, stopId, schemaId}: any, { rejectWithValue }) => {
    try {
      return await pickupAtStop(shipmentId, stopId, schemaId);
    } catch (err: any) {
      console.log(err, 'this is error ')
      return rejectWithValue(err.response.data.title);
    }
  }
);

export const deliverAtStopThunk = createAsyncThunk(
  "stop/deliver",
  async ({shipmentId, stopId, schemaId}: any, { rejectWithValue }) => {
    try {
      return await deliverAtStop(shipmentId, stopId, schemaId);
    } catch (err: any) {
      console.log(err, 'this is error ')
      return rejectWithValue(err.response.data.title);
    }
  }
);

const stopSlice = createSlice({
  name: "stop",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(arriveAtStopThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(arriveAtStopThunk.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(arriveAtStopThunk.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(pickupAtStopThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(pickupAtStopThunk.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(pickupAtStopThunk.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(deliverAtStopThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deliverAtStopThunk.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deliverAtStopThunk.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
      })

  },
});

export default stopSlice.reducer;
