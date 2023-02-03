import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { GuessedLetters } from '../redux-types';


 const initialState: GuessedLetters = {

    currentGuess: [],
    currentGuessClasses: [],
}

const lettersSlice = createSlice({
    name: 'lettersBank',
    initialState,
    reducers: {
        addLetterToGuess: (state, action: PayloadAction<string>) => {
            state.currentGuess.push(action.payload)
        },
        addGussedLetterClass: (state, action: PayloadAction<string>) => {
            state.currentGuessClasses.push(action.payload)
        },
        removeLastGussedLetter: (state) => {
            state.currentGuess.pop();
            state.currentGuessClasses.pop()
        },
        resetGuess: (state) => {
            state.currentGuess = [];
            state.currentGuessClasses = []
        },
        setCurrentClasses: (state, action: PayloadAction<string[]>) => {
            state.currentGuessClasses.concat(action.payload);
        }
    }
})

export const { setCurrentClasses,  addGussedLetterClass, removeLastGussedLetter,addLetterToGuess, resetGuess} = lettersSlice.actions;
export default lettersSlice.reducer;
