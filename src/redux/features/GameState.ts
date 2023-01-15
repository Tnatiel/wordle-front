import { createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface GameState {
    word: string,
    win: boolean,
    lose: boolean,
    currentGuess: string[],
};

const initialState: GameState = {
    word: "moral",
    win: false,
    lose: false,
    currentGuess: [],
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
        resetGuess: (state) => {
            state.currentGuess = [];
        },
        addGussedLetter: (state, action: PayloadAction<string>) => {
            state.currentGuess.push(action.payload)
        },
    }
});

export const { setWord,  setFailure, setSuccess, addGussedLetter} = gameSlice.actions;
export default gameSlice.reducer;
