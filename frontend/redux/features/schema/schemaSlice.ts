import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSchema } from "./service";

interface Schema {
  id: string;
  name: string;
}

interface SchemaState {
  schemas: any[];
  currentSchema: Schema | null;
  loading: boolean;
  error: string | null;
}

const initialState: SchemaState = {
  schemas: [],
  currentSchema: null,
  loading: false,
  error: null,
};

export const createSchemaThunk = createAsyncThunk(
  "schema/create",
  async (data: any, { rejectWithValue }) => {
    try {
      console.log(data, 'this is schema data ')
      return await createSchema(data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);



const schemaSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearSchemas: (state: any) => {
      state.currentSchema = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSchemaThunk.fulfilled, (state, action) => {
        state.currentSchema = action.payload;
        state.loading = false;
      })
      .addCase(createSchemaThunk.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSchemaThunk.rejected, (state, action) => {
        state.error = action.payload.error;
        state.loading = false;
      })

  },
});

export const { clearSchemas } = schemaSlice.actions;
export default schemaSlice.reducer;
