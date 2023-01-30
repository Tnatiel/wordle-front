
export interface WordHash {
    content: string;
    key: string;
    iv: string;
}

export interface GameState {
    wordData: WordHash,
    win: boolean,
    wordFetched: boolean,
    
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

    currentGuess: string[],
    currentGuessClasses: string[],

}

export interface DialogState {
    winDialog: boolean;
    loseDialog: boolean;
}

