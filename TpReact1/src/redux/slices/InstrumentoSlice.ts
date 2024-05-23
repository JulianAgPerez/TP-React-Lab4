// src/store/instrumentoSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Instrumento } from "../../types/types";

interface InstrumentoState {
  instrumentos: Instrumento[];
  loading: boolean;
  error: string | null;
}

const initialState: InstrumentoState = {
  instrumentos: [],
  loading: false,
  error: null,
};

export const fetchInstrumentos = createAsyncThunk("instrumentos/fetchInstrumentos", async () => {
  const response = await fetch("http://localhost:8080/instrumentos/productos");
  return (await response.json()) as Instrumento[];
});

const instrumentoSlice = createSlice({
  name: "instrumentos",
  initialState,
  reducers: {    setInstrumentos(state, action: PayloadAction<Instrumento[]>) {
    state.instrumentos = action.payload;
  },},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstrumentos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstrumentos.fulfilled, (state, action) => {
        state.loading = false;
        state.instrumentos = action.payload;
      })
      .addCase(fetchInstrumentos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch instrumentos";
      });
  },
});
export const {setInstrumentos} = instrumentoSlice.actions;
export default instrumentoSlice.reducer;
