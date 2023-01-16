import { configureStore, } from '@reduxjs/toolkit';
import letterReducer from '../features/LettersState';
import InputReducer from '../features/InputState';
import gameReducer from '../features/GameState'
import keyboardReducer from '../features/KeyboardState'



export const store = configureStore( {
    reducer: { 
        letters: letterReducer,
        inputs: InputReducer,
        game: gameReducer,
        keyboard: keyboardReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;