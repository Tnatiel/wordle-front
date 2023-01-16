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
            for (let i = 0; i < 3; i++) {
                let button = state.rows[i].find(b => b.id === action.payload.id);
                if (button) {
                    button.className = action.payload.className;
                    break;
                }
            }
        }
    }
});


export const {setButtonClassname} = keyboardSlice.actions;
export default keyboardSlice.reducer;