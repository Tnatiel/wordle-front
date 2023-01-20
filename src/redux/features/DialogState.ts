import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { DialogState } from '../redux-types';



const initialState: DialogState = {
    winDialog: false,
    loseDialog: false
}

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        setWinDialog: (state, action: PayloadAction<boolean>) => {
            state.winDialog = action.payload;
        },
        setLoseDialog: (state, action: PayloadAction<boolean>) => {
            state.loseDialog = action.payload;
        },
    }
})


export const { setLoseDialog, setWinDialog } = dialogSlice.actions;
export default dialogSlice.reducer;