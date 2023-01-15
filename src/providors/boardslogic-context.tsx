import {createContext} from 'react';

export interface RefsApi {
    [key: string]: React.RefObject<HTMLInputElement>;
}

export const BoardsContext = createContext<RefsApi | {}>({})
