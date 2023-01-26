import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { GameState, WordHash } from '../redux-types';


const initialState: GameState = {
    wordData: {content: '', iv: '', key: ''},
    win: false,
    
};


const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setWordData: (state, action: PayloadAction<WordHash>) => {
            state.wordData = action.payload
        },
        setWin: (state, action: PayloadAction<boolean>) => {
            state.win = action.payload;
        },
        
        
    }
});

export const { setWordData, setWin } = gameSlice.actions;
export default gameSlice.reducer;
