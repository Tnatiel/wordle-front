import { createSlice, PayloadAction} from '@reduxjs/toolkit';

interface WordState {
    word: string;
};

const initialState: WordState = {
    word: "moral"
};

const wordSlice = createSlice({
    name: 'word',
    initialState,
    reducers: {
        setWord( state, action: PayloadAction<string> ) {
            state.word = action.payload;
        }
    }
});

export const {setWord} = wordSlice.actions;
export default wordSlice.reducer;