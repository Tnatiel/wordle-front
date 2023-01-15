import { configureStore, } from '@reduxjs/toolkit';
import letterReducer from '../features/LettersState';
import InputReducer from '../features/InputState';
import gameReducer from '../features/GameState'



export const store = configureStore( {
    reducer: { 
        letter: letterReducer,
        inputs: InputReducer,
        game: gameReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;