import { setLoseDialog, setWinDialog } from "../redux/features/DialogState";
import { setWin } from "../redux/features/GameState";
import { AppDispatch } from "../redux/app/store";
import { addInputLetter, moveToNextInput, updateInputClassName } from "../redux/features/InputState";
import { setCorrectClass, setPresentClass, setWrongClass } from "../redux/features/KeyboardState";
import { addCorrectLetter, addGussedLetter, addPresentLetter, addWrongLetter } from "../redux/features/LettersState";
import { InputBox, KeyboardButton } from "../redux/redux-types";
import { ClassesColors } from "./wordle-types";




export const addInputClasses = (dispatch: AppDispatch , currentInputId: number ,classNames: string[]) => {
    let classIndex = 0;
    for (let i = 5; i > 0; i--) {
        dispatch(updateInputClassName({id: currentInputId - i, className: classNames[classIndex]}))
        classIndex++;
    }
}


export const checkGuess = (currentGuess: string[], word: string, currentRow: number,  dispatch: AppDispatch) => {
    if (currentGuess.join('') === word.toLocaleUpperCase()) {
          dispatch(setWinDialog(true));
          dispatch(setWin(true));
          return
        };
    if (currentRow === 5) dispatch(setLoseDialog(true));  

}

export const addKeyboardButtonsClasses = (classes: ClassesColors, dispatch: AppDispatch) => {
    const {correct, present, wrong} = classes
    dispatch(setWrongClass(wrong));
    dispatch(setPresentClass(present));
    dispatch(setCorrectClass(correct));
}

export const addToGuessedLetterBank = (letter: string, word: string, currentInputId: number, dispatch: AppDispatch) => {
    if (letter === word[currentInputId % 5].toLocaleUpperCase())  {
        dispatch(addCorrectLetter(letter));
        return;
    }
    if (word.toLocaleUpperCase().includes(letter)) { 
        dispatch(addPresentLetter(letter));
        return;
    } 
    dispatch(addWrongLetter(letter));
}


export const findInputObjById = (rows: InputBox[][], inputId: number ) => {
    for (let i = 0; i < 6; i++) {
        let currentInput= rows[i].find(ipt => ipt.id === inputId);
        if (currentInput) return currentInput;
    }
    return undefined
}

export const findKeyButtonObjById = (rows: KeyboardButton[][], buttonId: string ) => {
    for (let i = 0; i < 3; i++) {
        let currentButton = rows[i].find(btn => btn.id === buttonId);
        if (currentButton) return currentButton;
    }
    return undefined
}

export const shouldKeepFocus = (input: InputBox, gameStatus: boolean, currentGuess: string[], currentInputId: number, currentRow: number) => {
    // check if game is won and row is completed
    if (gameStatus) return true;
    if (currentGuess.length === 5 
        && currentInputId  % 5 === 0 
        && input.rowNumber === currentRow) return false
      
      
    if (currentInputId === input.id) return false
    return true
    
  }

  export const handleKeypress = (e: Partial<KeyboardEvent>, inputEvent: (letter: string) => void) => {
    // const input = e.target as HTMLInputElement;
    const valid = ['Enter', 'Del', 'A', 'B', 'C', 'D', 'E', 'F', 
    'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
    'S','T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let letter = e.key?.toUpperCase()
    
    if (letter) {
        if (letter === 'ENTER') letter = 'Enter';
        if (letter === 'BACKSPACE') letter = 'Del';
    }
    if (!valid.includes(letter as string)) return;
    if (letter) inputEvent(letter);
}

export const addLetterAndMoveForword = (dispatch: AppDispatch, letter: string,  word: string, currentInputId: number) => {
    dispatch(addGussedLetter(letter));
    dispatch(addInputLetter({inputIndex: currentInputId, value: letter}))
    addToGuessedLetterBank(letter, word, currentInputId, dispatch);
    dispatch(moveToNextInput());
}
