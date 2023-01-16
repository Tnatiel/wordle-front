import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Keyboard } from '../../wordle-components/Keyboard';


export interface KeyboardButton {
    id: string, 
    className: string,
}
export interface KeyboardState {
    rows: KeyboardButton[][],
}

const createKeyboardButtons = (ids: string[]) => ids.map( id => ({id, className: ''}));

const getButton = (id: string, lettersArray: KeyboardButton[][]) => {
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
        setButtonClassname(state, action: PayloadAction<{id: string, className: string}>) {
            const toAddClass = action.payload.className;
            const buttonLetter = action.payload.id;
            for (let i = 0; i < 3; i++) {
                let button = state.rows[i].find(b => b.id === action.payload.id);
                if (button?.className === 'correct') {
                    return;
                }
                
                if (button?.className === 'present') {
                    if (toAddClass !== 'correct') {
                        return;
                    }
                    button.className = toAddClass;
                    return;
                }
                console.log(toAddClass)
                console.log(buttonLetter);
                console.log(button)
                button!.className = toAddClass
                break;

            }
        },
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
                    button.className = 'correct'
                } else console.log(`button: ${letters[j]} don\'t exist`)
                
            }
        },
        setWrongClass(state, action: PayloadAction<string[]>) {
            const letters = action.payload;
            for (let j = 0; j < letters.length; j++) {
                for (let i = 0; i < 3; i++) {
                    let button = state.rows[i].find(b => b.id === letters[j]);
                    
                    if (!button) console.log('dont exist')
                    button!.className = 'wrong';
                    break
                }
                
                
            }
        },
    }
});


export const {setButtonClassname, setCorrectClass, setPresentClass, setWrongClass} = keyboardSlice.actions;
export default keyboardSlice.reducer;