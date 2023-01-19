import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { GameState } from '../redux-types';


const initialState: GameState = {
    word: "moral",
    win: false,
    
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setWord: (state, action: PayloadAction<string>) => {
            state.word = action.payload;
        },
        setWin: (state, action: PayloadAction<boolean>) => {
            state.win = action.payload;
        },
        
        
    }
});

export const { setWord, setWin } = gameSlice.actions;
export default gameSlice.reducer;
