
export interface ClassesColors {
    correct: string[],
    present: string[],
    wrong: string[],
}

export interface RowsProps { 
    rowIndex: number;
    refs: {
        inputs: {
            [key: string]: React.RefObject<HTMLInputElement>;
        };
        keyboard: {
            allKeyboardRefs: {
                [x: string]: React.RefObject<HTMLButtonElement>;
            };
        };
    }
    handleInput: (letter: string) => void;
}

export interface RowsProps {
    rowIndex: number;
    refs: {
        inputs: {
            [key: string]: React.RefObject<HTMLInputElement>;
        };
        keyboard: {
            allKeyboardRefs: {
                [x: string]: React.RefObject<HTMLButtonElement>;
            };
        };
    }
}

export interface BoardsProps {
    refs: {
        inputs: {
            [key: string]: React.RefObject<HTMLInputElement>;
        };
        keyboard: {
            allKeyboardRefs: {
                [x: string]: React.RefObject<HTMLButtonElement>;
            };
        };
    }
    handleInput: (letter: string) => void;

}

export interface AllRefsObject {
    
    inputs: {
        [key: string]: React.RefObject<HTMLInputElement>;
    };
    keyboard: {
        allKeyboardRefs: {
            [x: string]: React.RefObject<HTMLButtonElement>;
        };
    };
}
