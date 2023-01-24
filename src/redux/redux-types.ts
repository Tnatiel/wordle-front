
export interface GameState {
    word: string,
    win: boolean,
    
};

export interface InputBox {
    id: number, 
    value: string,
    className: string,
    rowNumber: number,
}

export interface InputsState {
    rows: InputBox[][],
    currentInputId: number,
    currentRowIndex: number;
};

export interface KeyboardButton {
    id: string, 
    className: string,
}
export interface KeyboardState {
    rows: KeyboardButton[][],
}

export interface GuessedLetters {
    correct: string[],
    present: string[],
    wrong: string[],
    currentGuess: string[],
    currentGuessClasses: string[],

}

export interface DialogState {
    winDialog: boolean;
    loseDialog: boolean;
}
