import { setLoseDialog, setWinDialog } from "../redux/features/DialogState";
import { setWin } from "../redux/features/GameState";
import { AppDispatch } from "../redux/app/store";
import {  addInputLetter, moveBackInput, moveToNextInput, removeLastInputLetter, updateInputClassName, updateNextRow } from "../redux/features/InputState";
import { setCorrectClass, setPresentClass, setWrongClass } from "../redux/features/KeyboardState";
import { InputBox, KeyboardButton } from "../redux/redux-types";
import { ClassesColors } from "./wordle-types";
import { addLetterToGuess, removeLastGussedLetter, resetGuess } from "redux/features/LettersBankState";


export const addInputClasses = (dispatch: AppDispatch , currentInputId: number ,classNames: string[]) => {
    let classIndex = 0;
    if (classNames.length !== 5) return
    for (let i = 5; i > 0; i--) {
        dispatch(updateInputClassName({id: currentInputId - i, className: classNames[classIndex]}))
        classIndex++;
    }
}


export const checkGuessLocally = (currentGuess: string[], word: string, currentRow: number,  dispatch: AppDispatch) => {
    if (currentGuess.join('') === word.toLocaleUpperCase()) {
          dispatch(setWinDialog(true));
          dispatch(setWin(true));
          return
        };
    if (currentRow === 5) dispatch(setLoseDialog(true));  

}

export const addKeyboardButtonsClasses = (classes: ClassesColors, dispatch: AppDispatch) => {
    const {correctBank, presentBank, wrongBank} = classes
    if(wrongBank.length)dispatch(setWrongClass(wrongBank));
    if(presentBank.length)dispatch(setPresentClass(presentBank));
    if(correctBank.length)dispatch(setCorrectClass(correctBank));
}


export const findInputObjById = (rows: InputBox[][], inputId: number ) => {
    for (let i = 0; i < rows.length; i++) {
        let currentInput= rows[i].find(ipt => ipt.id === inputId);
        if (currentInput) return currentInput;
    }
    return undefined
}

export const findKeyButtonObjById = (rows: KeyboardButton[][], buttonId: string ) => {
    for (let i = 0; i < rows.length; i++) {
        let currentButton = rows[i].find(btn => btn.id === buttonId);
        if (currentButton) return currentButton;
    }
    return undefined
}

export const shouldNotKeepFocus = (input: InputBox, gameStatus: boolean, currentGuess: string[], currentInputId: number, currentRow: number) => {
    // check if game is won and row is completed
    if (gameStatus) return true;
    if (currentGuess.length === 5 
        && currentInputId  % 5 === 0 
        && input.rowNumber === currentRow) {
            return false
        }
    if (currentInputId === input.id ) return false
    return true
    
  }

  export const handleKeypress = (e: Partial<KeyboardEvent>, inputEvent: (letter: string) => void) => {
    // const input = e.target as HTMLInputElement;
    const validInputs = ['Enter', 'Del', 'A', 'B', 'C', 'D', 'E', 'F', 
    'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
    'S','T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let letter = e.key?.toUpperCase()
    
    if (letter) {
        if (letter === 'ENTER') letter = 'Enter';
        if (letter === 'BACKSPACE') letter = 'Del';
    }
    if (!validInputs.includes(letter as string)) return;
    if (letter) {
        inputEvent(letter);
        
    }
}


export const filterGuessToStatusBank = (guess: string, classes: string[]) => {
    
    
    const correct: string[] = []
    const present: string[] = []
    const wrong: string[] = []
    for (let i = 0; i < guess.length; i++) {
        if ('correct' === classes[i]) {
            correct.push(guess[i])
            continue
        }
        if ('present' === classes[i]) {
            present.push(guess[i])
            continue
        }
        if ('wrong' === classes[i]) {
            wrong.push(guess[i])
            
        }
        
    }
    return {correct, present, wrong}
}


export const deleteLetter = (dispatcher: AppDispatch, inputRows: InputBox[][], currentInputId: number, currentRow: number) => {
    const lastInputObj = findInputObjById(inputRows, currentInputId -1)
            if (lastInputObj && lastInputObj?.rowNumber !== currentRow) return
            dispatcher(moveBackInput());
            dispatcher(removeLastInputLetter());
            dispatcher(removeLastGussedLetter());
}

export interface UserDetails {
    fname: string;
    lname: string;
    email : string;
    password : string;
}

export const validateUserDetails = (data: UserDetails) => {
    if (data.fname.length < 2) return ('first name too short');
    if (data.lname.length < 2) return ('last name too short');
    if (!data.email.toString().includes('@' || !data.email.toString().includes('.'))) return ('invalid email');
    if (data.password.length < 6) return ('password too short');
}   


