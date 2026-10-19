import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const allTagTypes = ['cart'] as const;

export const baseQuery = fetchBaseQuery({ baseUrl: '/api' });

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: false,
  endpoints: () => ({}),
  tagTypes: allTagTypes
});
