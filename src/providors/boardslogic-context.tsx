import {createContext} from 'react';

export interface WordleApi {
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
    allKeyboardRefs: {
        [x: string]: React.RefObject<HTMLButtonElement>;
    };
    rowOneInputs: string[];
    rowOneInputRefs: {
        [key: string]: React.RefObject<HTMLInputElement>;
    };
    rowTwoInputs: string[];
    rowTwoInputRefs: {
        [key: string]: React.RefObject<HTMLInputElement>;
    };
    rowThreeInputs: string[];
    rowThreeInputRefs: {
        [key: string]: React.RefObject<HTMLInputElement>;
    };
    rowFourInputs: string[];
    rowFourInputRefs: {
        [key: string]: React.RefObject<HTMLInputElement>;
    };
    rowFiveInputs: string[];
    rowFiveInputRefs: {
        [key: string]: React.RefObject<HTMLInputElement>;
    };
    rowSixInputs: string[];
    rowSixInputRefs: {
        [key: string]: React.RefObject<HTMLInputElement>;
    };
    allInputRefs: {
        [key: string]: React.RefObject<HTMLInputElement>;
    };
    getGuess: (firstInputId: string) => string[];
    focusNextInput: (nextFocusId: string) => boolean;
    rowRender: boolean;
    setRowRender: React.Dispatch<React.SetStateAction<boolean>>;
    getNextInputId: (id: string) => string;
    handleClick: (event: React.MouseEvent<HTMLInputElement>) => void;
    boardDisabled: boolean;
    setBoardDisabled: React.Dispatch<React.SetStateAction<boolean>>;

}

export const BoardsContext = createContext<WordleApi | {}>({})
