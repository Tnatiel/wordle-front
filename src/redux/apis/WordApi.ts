import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
interface Hash {
    content: string;
    key: string;
    iv: string;
}

interface CheckGuessResult {
    classes: string[];
    correct: boolean;
}

export const wordApi  = createApi({
    reducerPath: 'wordApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'localhost:3333/'
    }),
    endpoints: (builder) => ({
        getRandomWordData: builder.query<Hash, string>({
            query:(random) => `word/${random}`
        }),
        checkGuess: builder.query<CheckGuessResult, string>({
            query:(check) => `word/${check}`
        }),
    }),
})


export const  { useCheckGuessQuery, useGetRandomWordDataQuery } = wordApi