import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { GuessedLetters } from '../redux-types';



 const initialState: GuessedLetters = {
    correct: [],
    present: [],
    wrong: [],
    currentGuess: [],
    currentGuessclasses: [],

}


const lettersSlice = createSlice({
    name: 'guessed letters',
    initialState,
    reducers: {
        addCorrectLetter: (state, action: PayloadAction<string>) => {
            state.correct.push(action.payload);
            state.currentGuessclasses.push('correct');
        },
        addPresentLetter: (state, action: PayloadAction<string>) => {
            state.present.push(action.payload);
            state.currentGuessclasses.push('present');
        },
        addWrongLetter: (state, action: PayloadAction<string>) => {
            state.wrong.push(action.payload);
            state.currentGuessclasses.push('wrong');
        },
        addGussedLetter: (state, action: PayloadAction<string>) => {
            state.currentGuess.push(action.payload)
        },
        removeGussedLetter: (state) => {
            state.currentGuess.pop();
            state.currentGuessclasses.pop()
        },
        resetGuess: (state) => {
            state.currentGuess = [];
            state.currentGuessclasses = []
        },
    }
})

export const { removeGussedLetter, addCorrectLetter, addWrongLetter, addPresentLetter, addGussedLetter, resetGuess} = lettersSlice.actions;
export default lettersSlice.reducer;
