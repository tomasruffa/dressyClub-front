import {combineReducers} from '@reduxjs/toolkit';

import { carsApi } from '../model/request/cars.api';

export default combineReducers({
  [carsApi.reducerPath]: carsApi.reducer,
});
