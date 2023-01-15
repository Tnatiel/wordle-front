import { createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface GuessedLetters {
    correct: string[],
    present: string[],
    wrong: string[],
}

 const initialState: GuessedLetters = {
    correct: [],
    present: [],
    wrong: [],
}


const lettersSlice = createSlice({
    name: 'guessed letters',
    initialState,
    reducers: {
        addCorrectLetter: (state, action: PayloadAction<string>) => {
            state.correct.push(action.payload);
        },
        addPresentLetter: (state, action: PayloadAction<string>) => {
            state.present.push(action.payload);
        },
        addWrongLetter: (state, action: PayloadAction<string>) => {
            state.wrong.push(action.payload);
        }
    }
})

export const { addCorrectLetter, addWrongLetter, addPresentLetter} = lettersSlice.actions;
export default lettersSlice.reducer;
