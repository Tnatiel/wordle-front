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
    rowOneInputs: number[];
    rowOneInputRefs: {
        [key: number]: React.RefObject<HTMLInputElement>;
    };
    rowTwoInputs: number[];
    rowTwoInputRefs: {
        [key: number]: React.RefObject<HTMLInputElement>;
    };
    rowThreeInputs: number[];
    rowThreeInputRefs: {
        [key: number]: React.RefObject<HTMLInputElement>;
    };
    rowFourInputs: number[];
    rowFourInputRefs: {
        [key: number]: React.RefObject<HTMLInputElement>;
    };
    rowFiveInputs: number[];
    rowFiveInputRefs: {
        [key: number]: React.RefObject<HTMLInputElement>;
    };
    rowSixInputs: number[];
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
    rowRender: number;
    setRowRender: React.Dispatch<React.SetStateAction<number>>;
    getNextInputId: () => number;
    activeInput: number;
}

export const BoardsContext = createContext<WordleApi | {}>({})
