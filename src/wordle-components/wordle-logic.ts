import { setLoseDialog, setWinDialog } from "../redux/features/DialogState";
import { setWin } from "../redux/features/GameState";
import { AppDispatch } from "../redux/app/store";
import {  updateInputClassName } from "../redux/features/InputState";
import { setCorrectClass, setPresentClass, setWrongClass } from "../redux/features/KeyboardState";
import { addToCorrectLetterBank, addToPresentLetterBank, addToWrongLetterBank, removeFromCorrectLetterBank, removeFromPresentLetterBank, removeFromWrongLetterBank } from "../redux/features/LettersState";
import { InputBox, KeyboardButton } from "../redux/redux-types";
import { AllRefsObject, ClassesColors } from "./wordle-types";



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
    if(wrong.length)dispatch(setWrongClass(wrong));
    if(present.length)dispatch(setPresentClass(present));
    if(correct.length)dispatch(setCorrectClass(correct));
}

export const addToGuessedLetterBank = (letter: string, word: string, currentInputId: number, dispatch: AppDispatch) => {
    if (letter === word[currentInputId % 5].toUpperCase())  {
        dispatch(addToCorrectLetterBank(letter));
        return;
    }
    if (word.toUpperCase().includes(letter)) { 
        dispatch(addToPresentLetterBank(letter));
        return;
    } 
    dispatch(addToWrongLetterBank(letter));

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
        && input.rowNumber === currentRow) return false
      
    if (currentInputId === input.id) return false
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
export const handleAddAnimation = (currentInputId: number, refs: AllRefsObject ) => {
    const currentInputRef = refs.inputs[currentInputId]?.current;
    if (!currentInputRef) return 
    currentInputRef.classList.add("letter-animation");
    if (currentInputId - 1 < 0) return;
    const lastInputRef = refs.inputs[currentInputId - 1];
    if (lastInputRef) lastInputRef.current?.classList.remove('letter-animation');
    
}
export const handleRemoveAnimation = (currentInputId: number, refs: AllRefsObject ) => {
    const lastInputRef = refs.inputs[currentInputId - 1]?.current;
    if (lastInputRef) lastInputRef.classList.remove("letter-animation");
}

export const removeLetterFromStatusBank = (colorsObg: ClassesColors ,letter: string, dispatch: AppDispatch) => {
    if (colorsObg.correct.length===0 && colorsObg.present.length===0 && colorsObg.wrong.length ===0) return console.log('no classes!')
    if (colorsObg.correct.includes(letter)) {
        dispatch(removeFromCorrectLetterBank(letter)) 
    }
    else if (colorsObg.present.includes(letter)) {
        dispatch(removeFromPresentLetterBank(letter))
    }
    else {
        dispatch(removeFromWrongLetterBank(letter))
    }
} 



