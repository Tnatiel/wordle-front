import { createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface InputState {
    id: number, 
    value: string
}

export interface InputsState {
    rows: InputState[][],
    currentInput: number,
};








const row1 = [0, 1, 2, 3, 4].map( id => ({id, value: ''}));
const row2 = [5, 6, 7, 8, 9].map( id => ({id, value: ''}));
const row3 = [10, 11, 12, 13, 14].map( id => ({id, value: ''}));
const row4 = [15, 16, 17, 18, 19].map( id => ({id, value: ''}));
const row5 = [20, 21, 22, 23, 24].map( id => ({id, value: ''}));
const row6 = [25, 26, 27, 28, 29].map( id => ({id, value: ''}));
const rows = [row1, row2, row3, row4, row5, row6]
const initialState: InputsState = {
    rows,
    currentInput: 0,
}

const inputSlice = createSlice({
    name: 'input',
    initialState,
    reducers: {
        updateInputValue(state, action: PayloadAction<{inputIndex: number, value: string}>) {

            state.rows[action.payload.inputIndex][state.currentInput].value = action.payload.value;
        },
        updateNextInput(state) {
            state.currentInput += 1
        },
        

    }
});

export const {updateNextInput, updateInputValue} = inputSlice.actions;
export default inputSlice.reducer;
