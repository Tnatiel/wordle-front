import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { KeyboardButton, KeyboardState } from '../redux-types';




const createKeyboardButtons = (ids: string[]) => ids.map( id => ({id, className: ''}));

export const getButton = (id: string, lettersArray: KeyboardButton[][]) => {
    let button = lettersArray[0].find(b => b.id === id)
    if (!button) {
        button = lettersArray[1].find(b => b.id === id)
    }
    if (!button) {
        button = lettersArray[2].find(b => b.id === id)
    }
    return button;
}
const rowOneLetters = createKeyboardButtons(["Q","W","E","R","T","Y","U","I","O","P",])
const rowTwoLetters = createKeyboardButtons(["A","S","D","F","G","H","J","K","L"])
const rowThreeLetters = createKeyboardButtons(["Enter", "Z","X","C","V","B","N","M", "Del"])

const rows = [rowOneLetters, rowTwoLetters, rowThreeLetters]

const initialState: KeyboardState = {
    rows,
}


const keyboardSlice = createSlice({
    name: 'keyboard',
    initialState,
    reducers: {

        setCorrectClass(state, action: PayloadAction<string[]>) {
            const letters = action.payload;
            for (let j = 0; j < letters.length; j++) {
                const button = getButton(letters[j], state.rows)
                if (button) {
                    button.className = 'correct'
                } else console.log(`button: ${letters[j]} don\'t exist`)
                
            }
        },
        setPresentClass(state, action: PayloadAction<string[]>) {
            const letters = action.payload;
            for (let j = 0; j < letters.length; j++) {
                const button = getButton(letters[j], state.rows)
                if (button) {
                    button.className = 'present'
                } else console.log(`button: ${letters[j]} don\'t exist`)
                
            }
        },
        setWrongClass(state, action: PayloadAction<string[]>) {
            const letters = action.payload;
            for (let j = 0; j < letters.length; j++) {
                const button = getButton(letters[j], state.rows)
                if (button) {
                    button.className = 'wrong'
                } else console.log(`button: ${letters[j]} don\'t exist`)
                
            }
        },
    }
});


export const { setCorrectClass, setPresentClass, setWrongClass} = keyboardSlice.actions;
export default keyboardSlice.reducer;


//TODO change defaulValue to value and render page