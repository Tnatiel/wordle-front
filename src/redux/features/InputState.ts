import { createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Input {
    id: number, 
    value: string
}

interface InputsState {
    inputs: Input[],
    currentInput: number,
};

const initialState: InputsState = {
    inputs: Array.from({length: 30}, (_, i) => ({id: i, value: ''})),
    currentInput: 0,
}

const inputSlice = createSlice({
    name: 'input',
    initialState,
    reducers: {
        updateNextInputValue(state, action: PayloadAction<string>) {
            state.inputs[state.currentInput].value = action.payload
        },
        updateNextInput(state) {
            state.currentInput += 1
        },
        

    }
});

export const {updateNextInput, updateNextInputValue} = inputSlice.actions;
export default inputSlice.reducer;