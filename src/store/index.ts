import {configureStore} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';
import rootReducer from './root-reducer';
import {carsApi} from '../model/request/cars.api';

const middleware: any[] = [];

middleware.push(carsApi.middleware);

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }).concat(middleware),
  devTools: false,
});

export type StoreRootState = ReturnType<typeof store.getState>;

const persistor = persistStore(store);

export {store, persistor};
