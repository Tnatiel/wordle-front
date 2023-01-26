import { configureStore,  } from '@reduxjs/toolkit';
import letterReducer from '../features/LettersState';
import InputReducer from '../features/InputState';
import gameReducer from '../features/GameState';
import keyboardReducer from '../features/KeyboardState';
import dialogReducer from '../features/DialogState';



export const store = configureStore( {
    reducer: { 
        lettersBank: letterReducer,
        inputs: InputReducer,
        game: gameReducer,
        keyboard: keyboardReducer,
        dialog: dialogReducer,
    },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
