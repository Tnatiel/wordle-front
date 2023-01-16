import { createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface GameState {
    word: string,
    win: boolean,
    lose: boolean,
};

const initialState: GameState = {
    word: "moral",
    win: false,
    lose: false,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setWord: (state, action: PayloadAction<string>) => {
            state.word = action.payload;
        },
        setSuccess: (state, action: PayloadAction<boolean>) => {
            state.win = action.payload;
        },
        setFailure: (state, action: PayloadAction<boolean>) => {
            state.lose = action.payload;
        },

        
    }
});

export const { setWord,  setFailure, setSuccess} = gameSlice.actions;
export default gameSlice.reducer;
