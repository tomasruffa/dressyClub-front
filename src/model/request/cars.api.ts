import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithAuthHandler} from '../../store/rtk-base-query';
import { CarData } from '../entities/car-data';

export const carsApi = createApi({
  reducerPath: 'carsApi',
  baseQuery: baseQueryWithAuthHandler,
  endpoints: build => ({
    getCars: build.query<CarData[], void>({
      query: () => ({
        url: `/cars`,
        method: 'GET',
      }),
    }),
    postCar: build.mutation<CarData[], CarData>({
      query: (body) => ({
        url: `/cars`,
        method: 'POST',
        body,
      }),
    }),
    putCar: build.mutation<CarData[], CarData[]>({
      query: (body) => ({
        url: `/cars`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {useLazyGetCarsQuery, usePostCarMutation, usePutCarMutation} = carsApi;
