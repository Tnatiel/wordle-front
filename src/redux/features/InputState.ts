import { createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface InputBox {
    id: number, 
    value: string,
    className: string
}

export interface InputsState {
    rows: InputBox[][],
    currentInput: number,
    currentRow: number;
};


const createInputs = (ids: number[]) => ids.map( id => ({id, value: '', className: ''}));

const row1 = createInputs([0, 1, 2, 3, 4])
const row2 = createInputs([5, 6, 7, 8, 9])
const row3 = createInputs([10, 11, 12, 13, 14])
const row4 = createInputs([15, 16, 17, 18, 19])
const row5 = createInputs([20, 21, 22, 23, 24])
const row6 = createInputs([25, 26, 27, 28, 29])
const rows = [row1, row2, row3, row4, row5, row6]

const initialState: InputsState = {
    rows,
    currentInput: 0,
    currentRow: 0
}

const inputSlice = createSlice({
    name: 'inputs',
    initialState,
    reducers: {
        addInputLetter(state, action: PayloadAction<{inputIndex: number,  value: string}>) {
            
            const inputRow = state.rows[state.currentRow]
            const input = inputRow.filter(ipt => ipt.id === action.payload.inputIndex)[0]
            input.value = action.payload.value;
        },
        removeInputLetter(state) {
            const inputRow = state.rows[state.currentRow];
            const input = inputRow.filter(ipt => ipt.id === state.currentInput)[0]
            input.value = '';
        },
        updateNextInput(state) {
            state.currentInput += 1
        },
        updateBackInput(state) {
            if (state.currentInput === 0) {
                state.currentInput = 0;
                return
            }
            state.currentInput -= 1;
        },
        updateNextRow(state) {
            state.currentRow += 1
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

export const {updateNextInput, removeInputLetter, addInputLetter, updateNextRow, updateInputClassName, updateBackInput} = inputSlice.actions;
export default inputSlice.reducer;



// TODO stop case for disabled row
// TODO stop case for disabled row