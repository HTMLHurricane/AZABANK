/* eslint-disable @typescript-eslint/no-unused-vars */
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'BASE_URL',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token') || '';
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-type', 'application/json');
            headers.set('Accept', 'application/json');
            return headers;
        },
    }),
    endpoints: () => ({}),
});
