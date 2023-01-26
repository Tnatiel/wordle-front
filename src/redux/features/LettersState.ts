import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { GuessedLetters } from '../redux-types';



 const initialState: GuessedLetters = {
    correct: [],
    present: [],
    wrong: [],
    currentGuess: [],
    currentGuessClasses: [],

}


const lettersSlice = createSlice({
    name: 'lettersBank',
    initialState,
    reducers: {
        addToCorrectLetterBank: (state, action: PayloadAction<string>) => {
            state.correct.push(action.payload);
        },
        removeFromCorrectLetterBank: (state, action: PayloadAction<string>) => {
            state.correct = state.correct.filter(letter => letter !== action.payload);
            state.currentGuessClasses = state.currentGuessClasses.filter(letter => letter !== action.payload);;
        },
        addToPresentLetterBank: (state, action: PayloadAction<string>) => {
            state.present.push(action.payload);
        },
        removeFromPresentLetterBank: (state, action: PayloadAction<string>) => {
            state.present = state.present.filter(letter => letter !== action.payload);
            state.currentGuessClasses = state.currentGuessClasses.filter(letter => letter !== action.payload);;
        },
        addToWrongLetterBank: (state, action: PayloadAction<string>) => {
            state.wrong.push(action.payload);
        },
        removeFromWrongLetterBank: (state, action: PayloadAction<string>) => {
            state.wrong = state.present.filter(letter => letter !== action.payload);
            state.currentGuessClasses = state.currentGuessClasses.filter(letter => letter !== action.payload);;
        },
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

export const { setCurrentClasses, removeFromCorrectLetterBank, removeFromPresentLetterBank, removeFromWrongLetterBank, addGussedLetterClass, removeLastGussedLetter, addToCorrectLetterBank, addToWrongLetterBank, addToPresentLetterBank, addLetterToGuess, resetGuess} = lettersSlice.actions;
export default lettersSlice.reducer;
