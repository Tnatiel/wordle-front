import { createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface GameState {
    word: string;
    boardDisabled: boolean;
    win: boolean;
    lose: boolean

};

const initialState: GameState = {
    word: "moral",
    boardDisabled: false,
    win: false,
    lose: false
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setWord: (state, action: PayloadAction<string>) => {
            state.word = action.payload;
        },
        setDisabled: (state, action: PayloadAction<boolean>) => {
            state.boardDisabled = action.payload;
        },
        setSuccess: (state, action: PayloadAction<boolean>) => {
            state.win = action.payload;
        },
        setFailure: (state, action: PayloadAction<boolean>) => {
            state.lose = action.payload;
        },
    }
});

export const { setWord, setDisabled, setFailure, setSuccess} = gameSlice.actions;
export default gameSlice.reducer;
