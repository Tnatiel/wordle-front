import { createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface GuessedLetters {
    correct: string[],
    present: string[],
    wrong: string[],
    currentGuess: string[],

}

 const initialState: GuessedLetters = {
    correct: [],
    present: [],
    wrong: [],
    currentGuess: [],

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
        },
        addGussedLetter: (state, action: PayloadAction<string>) => {
            state.currentGuess.push(action.payload)
        },
    }
})

export const { addCorrectLetter, addWrongLetter, addPresentLetter, addGussedLetter} = lettersSlice.actions;
export default lettersSlice.reducer;
