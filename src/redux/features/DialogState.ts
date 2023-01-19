import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { hasOnlyExpressionInitializer } from 'typescript';

interface DialogState {
    winDialog: boolean;
    loseDialog: boolean;
}

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