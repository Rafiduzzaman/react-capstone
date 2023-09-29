import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './homeReducer/HomeSlice';
import detailReducer from './detailReducer/detailSlice';

const store = configureStore({
  reducer: {
    AllKats: homeReducer,
    CatBreeds: detailReducer,
  },
});

export default store;
