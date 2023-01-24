import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { findKeyButtonObjById } from 'wordle-components/wordle-logic';
import { KeyboardState } from '../redux-types';




const createKeyboardButtons = (ids: string[]) => ids.map( id => ({id, className: ''}));


const rowOneLetters = createKeyboardButtons(["Q","W","E","R","T","Y","U","I","O","P",])
const rowTwoLetters = createKeyboardButtons(["A","S","D","F","G","H","J","K","L"])
const rowThreeLetters = createKeyboardButtons(["Enter", "Z","X","C","V","B","N","M", "Del"])

const rows = [rowOneLetters, rowTwoLetters, rowThreeLetters]

const initialState: KeyboardState = { rows }

const keyboardSlice = createSlice({
    name: 'keyboard',
    initialState,
    reducers: {

        setCorrectClass(state, action: PayloadAction<string[]>) {
            const letters = action.payload;
            for (let j = 0; j < letters.length; j++) {
                const button = findKeyButtonObjById( state.rows, letters[j])
                if (button) {
                    button.className = 'correct'
                } else console.log(`button: ${letters[j]} don't exist`)
                
            }
        },
        setPresentClass(state, action: PayloadAction<string[]>) {
            const letters = action.payload;
            for (let j = 0; j < letters.length; j++) {
                const button = findKeyButtonObjById( state.rows, letters[j])
                if (button) {
                    button.className = 'present'
                } else console.log(`button: ${letters[j]} don't exist`)
                
            }
        },
        setWrongClass(state, action: PayloadAction<string[]>) {
            const letters = action.payload;
            for (let j = 0; j < letters.length; j++) {
                const button = findKeyButtonObjById( state.rows, letters[j])
                if (button) {
                    button.className = 'wrong'
                } else console.log(`button: ${letters[j]} don't exist`)
                
            }
        },
    }
});


export const { setCorrectClass, setPresentClass, setWrongClass} = keyboardSlice.actions;
export default keyboardSlice.reducer;


