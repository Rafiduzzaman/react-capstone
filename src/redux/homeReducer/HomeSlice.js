import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchKatBreeds = createAsyncThunk('Fetch/AllKats',
  async () => {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  });

const homeReducer = createSlice({
  name: 'AllKats',
  initialState: {
    breedList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKatBreeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKatBreeds.fulfilled, (state, action) => {
        state.loading = false;
        state.breedList = action.payload.map((eachKat) => ({
          id: eachKat.id,
          name: eachKat.name,
          origin: eachKat.origin,
        }));
      })
      .addCase(fetchKatBreeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default homeReducer.reducer;
