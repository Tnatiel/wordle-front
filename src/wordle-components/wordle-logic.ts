import { AppDispatch } from "../redux/app/store";
import { setFailure, setSuccess } from "../redux/features/GameState";
import { updateInputClassName } from "../redux/features/InputState";
import { setCorrectClass, setPresentClass, setWrongClass } from "../redux/features/KeyboardState";
import { addCorrectLetter, addPresentLetter, addWrongLetter } from "../redux/features/LettersState";
import { InputBox } from "../redux/redux-types";
import { ClassesColors } from "./wordle-types";




export const addInputClasses = (dispatch: AppDispatch, currentInputId: number ,classNames: string[]) => {
    let classIndex = 0;
    for (let i = 5; i > 0; i--) {
        dispatch(updateInputClassName({id: currentInputId - i, className: classNames[classIndex]}))
        classIndex++;
    }
}


export const checkGuess = (currentGuess: string[], word: string, currentRow: number,  dispatch: AppDispatch) => {
    if (currentGuess.join('') === word.toLocaleUpperCase()) dispatch(setSuccess(true));
    if (currentRow === 5) dispatch(setFailure(true));  
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