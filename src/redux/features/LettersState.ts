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
            state.currentGuessClasses.push('correct');
        },
        removeFromLetterBank: (state, action: PayloadAction<string>) => {
            state.correct = state.correct.filter(letter => letter !== action.payload);

        },
        addToPresentLetterBank: (state, action: PayloadAction<string>) => {
            state.present.push(action.payload);
            state.currentGuessClasses.push('present');
        },
        removeFromPresentLetterBank: (state, action: PayloadAction<string>) => {
            state.present = [...state.present, ...state.present.filter(letter => letter === action.payload)];
            state.currentGuessClasses.pop();
        },
        addToWrongLetterBank: (state, action: PayloadAction<string>) => {
            state.wrong.push(action.payload);
            state.currentGuessClasses.push('wrong');
        },
        removeFromWrongLetterBank: (state, action: PayloadAction<string>) => {
            state.wrong = [...state.wrong, ...state.wrong.filter(letter => letter === action.payload)];
            state.currentGuessClasses.pop();
        },
        addGussedLetter: (state, action: PayloadAction<string>) => {
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
    }
})

export const { addGussedLetterClass, removeLastGussedLetter, addToCorrectLetterBank, addToWrongLetterBank, addToPresentLetterBank, addGussedLetter, resetGuess} = lettersSlice.actions;
export default lettersSlice.reducer;
