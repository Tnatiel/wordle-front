import {createContext} from 'react';
import { useKeyboard } from '../custom-hooks/useKeyboard';

export interface ApiValue {
    rowOneKeyBoardRefs: {
        [key: string]: React.RefObject<HTMLButtonElement>;
    };
    rowOneLetters: string[];
    rowTwoKeyBoardRefs: {
        [key: string]: React.RefObject<HTMLButtonElement>;
    }
    rowTwoLetters: string[];

    rowThreeLetters: string[];
    rowThreeKeyBoardRefs: {
        [key: string]: React.RefObject<HTMLButtonElement>;
    }
    rowFourLetters: string[];
    rowFourKeyBoardRefs: {
        [key: string]: React.RefObject<HTMLButtonElement>;
    }
    rowFiveLetters: string[];
    rowFiveKeyBoardRefs: {
        [key: string]: React.RefObject<HTMLButtonElement>;
    }
    rowSixLetters: string[];
    rowSixKeyBoardRefs: {
        [key: string]: React.RefObject<HTMLButtonElement>;
    };
    allKeyboardRefs: {
        [x: string]: React.RefObject<HTMLButtonElement>;
    };
    guessedLetters: string[]
    

}

export const BoardsContext = createContext<ApiValue | {}>({})
