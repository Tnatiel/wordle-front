import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { InputsState } from '../types';





const createInputs = (ids: number[], rowNumber: number) => ids.map( id => ({id, value: '', className: '', rowNumber}));

const row1 = createInputs([0, 1, 2, 3, 4], 0)
const row2 = createInputs([5, 6, 7, 8, 9], 1)
const row3 = createInputs([10, 11, 12, 13, 14], 2)
const row4 = createInputs([15, 16, 17, 18, 19], 3)
const row5 = createInputs([20, 21, 22, 23, 24], 4)
const row6 = createInputs([25, 26, 27, 28, 29], 5)
const rows = [row1, row2, row3, row4, row5, row6]

const initialState: InputsState = {
    rows,
    currentInputId: 0,
    currentRowIndex: 0,
}

const inputSlice = createSlice({
    name: 'inputs',
    initialState,
    reducers: {
        addInputLetter(state, action: PayloadAction<{inputIndex: number,  value: string}>) {
            
            const inputRow = state.rows[state.currentRowIndex];
            const input = inputRow.filter(ipt => ipt.id === action.payload.inputIndex)[0];
            input.value = action.payload.value;
        },
        removeInputLetter(state) {
            const inputRow = state.rows[state.currentRowIndex];
            const input = inputRow.filter(ipt => ipt.id === state.currentInputId)[0]
            input.value = '';
        },
        moveToNextInput(state) {
            state.currentInputId += 1
        },
        moveBackInput(state) {
            if (state.currentInputId === 0) {
                state.currentInputId = 0;
                return
            }
            state.currentInputId -= 1; 
        },
        updateNextRow(state) {
            state.currentRowIndex += 1
        },

        updateInputClassName(state, action: PayloadAction<{id: number, className: string}>) {
            for (let i = 0; i < 6; i++) {
                let input = state.rows[i].find(b => b.id === action.payload.id);
                if (input) {
                    input.className = action.payload.className;
                    break;
                }
            }
        },
    }
});

export const {  moveToNextInput, removeInputLetter, addInputLetter, updateNextRow, updateInputClassName, moveBackInput } = inputSlice.actions;
export default inputSlice.reducer;


