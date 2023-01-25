import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const wordApi  = createApi({
    reducerPath: 'wordApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'localhost:3333/word/'
    }),
    endpoints: (builder) => ({
        getRandomWordToken: builder.query<string, string>({
            query:(randomWord) => randomWord
        }),
    }),
})


export const  { useGetRandomWordTokenQuery } = wordApi