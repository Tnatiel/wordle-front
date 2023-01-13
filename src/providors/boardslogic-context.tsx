import {createContext} from 'react';

export interface WordleApi {
    rowOneKeyBoardRefs: {
        [key: number]: React.RefObject<HTMLButtonElement>;
    };
    rowOneLetters: string[];
    rowTwoKeyBoardRefs: {
        [key: number]: React.RefObject<HTMLButtonElement>;
    }
    rowTwoLetters: string[];

    rowThreeLetters: string[];
    rowThreeKeyBoardRefs: {
        [key: number]: React.RefObject<HTMLButtonElement>;
    }
    allKeyboardRefs: {
        [x: string]: React.RefObject<HTMLButtonElement>;
    };
    rowOneInputs: string[];
    rowOneInputRefs: {
        [key: number]: React.RefObject<HTMLInputElement>;
    };
    rowTwoInputs: string[];
    rowTwoInputRefs: {
        [key: number]: React.RefObject<HTMLInputElement>;
    };
    rowThreeInputs: string[];
    rowThreeInputRefs: {
        [key: number]: React.RefObject<HTMLInputElement>;
    };
    rowFourInputs: string[];
    rowFourInputRefs: {
        [key: number]: React.RefObject<HTMLInputElement>;
    };
    rowFiveInputs: string[];
    rowFiveInputRefs: {
        [key: number]: React.RefObject<HTMLInputElement>;
    };
    rowSixInputs: string[];
    rowSixInputRefs: {
        [key: number]: React.RefObject<HTMLInputElement>;
    };
    allInputRefs: {
        [key: number]: React.RefObject<HTMLInputElement>;
    };
    getGuess: (firstInputId: number) => string[];
    focusNextInput: (nextFocusId: number) => boolean;
    handleClick: (event: React.MouseEvent<HTMLInputElement>) => void;
    boardDisabled: boolean;
    setBoardDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    rowRender: boolean;
    setRowRender: React.Dispatch<React.SetStateAction<boolean>>;
    getNextInputId: (id: number) => number;
    activeInput: number;
}

export const BoardsContext = createContext<WordleApi | {}>({})
