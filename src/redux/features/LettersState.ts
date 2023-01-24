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
            const letter = action.payload;
            // if (state.correct.includes(letter)) return;
            state.correct.push(action.payload);
            state.currentGuessClasses.push('correct');
        },
        removeFromCorrectLetterBank: (state, action: PayloadAction<string>) => {
            state.correct = state.correct.filter(letter => letter !== action.payload);
            state.currentGuessClasses = state.currentGuessClasses.filter(letter => letter !== action.payload);;
        },
        addToPresentLetterBank: (state, action: PayloadAction<string>) => {
            const letter = action.payload;
            // if (state.present.includes(letter)) return;
            state.present.push(action.payload);
            state.currentGuessClasses.push('present');
        },
        removeFromPresentLetterBank: (state, action: PayloadAction<string>) => {
            state.present = state.present.filter(letter => letter !== action.payload);
            state.currentGuessClasses = state.currentGuessClasses.filter(letter => letter !== action.payload);;
        },
        addToWrongLetterBank: (state, action: PayloadAction<string>) => {
            const letter = action.payload;
            // if (state.wrong.includes(letter)) return;
            state.wrong.push(action.payload);
            state.currentGuessClasses.push('wrong');
        },
        removeFromWrongLetterBank: (state, action: PayloadAction<string>) => {
            state.wrong = state.present.filter(letter => letter !== action.payload);
            state.currentGuessClasses = state.currentGuessClasses.filter(letter => letter !== action.payload);;
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

export const { removeFromCorrectLetterBank, removeFromPresentLetterBank, removeFromWrongLetterBank, addGussedLetterClass, removeLastGussedLetter, addToCorrectLetterBank, addToWrongLetterBank, addToPresentLetterBank, addGussedLetter, resetGuess} = lettersSlice.actions;
export default lettersSlice.reducer;
