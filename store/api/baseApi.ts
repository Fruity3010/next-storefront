import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const allTagTypes = ['cart'] as const;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: false,
  endpoints: () => ({}),
  tagTypes: allTagTypes
});
