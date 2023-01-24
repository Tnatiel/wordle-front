import { useKeyboardRefs } from "../custom-hooks/useKeyboardRefs";
import { useInputRef } from "../custom-hooks/useInputRefs";
import { Header } from "../wordle-components/Header";
import { InputBoard } from "../wordle-components/InputBoard";
import { Keyboard } from "../wordle-components/Keyboard";
import {  useAppSelector, useAppDispatch } from '../redux/app/hooks';
import { GameDialog } from "../wordle-components/dialog/GameDialog";
import { moveBackInput, updateNextRow, removeLastInputLetter, addInputLetter, moveToNextInput } from "../redux/features/InputState";
import {  addGussedLetter, removeLastGussedLetter, resetGuess, } from "../redux/features/LettersState"; 
import {  addInputClasses, addKeyboardButtonsClasses, addToGuessedLetterBank, checkGuess, handleAddAnimation, handleRemoveAnimation, findInputObjById, removeLetterFromStatusBank } from "../wordle-components/wordle-logic";



export function WordleApp() {
    
    const dispatch = useAppDispatch();
    const inputsRefs = useInputRef();
    const keyboardRefs = useKeyboardRefs();
    const allRefs = {inputs: inputsRefs, keyboard: keyboardRefs};
    const isGameWon = useAppSelector(state => state.dialog.winDialog);
    const isGameLost = useAppSelector(state => state.dialog.loseDialog);
    const currentGuess = useAppSelector(state => state.lettersBank.currentGuess);
    const currentGuessClassNames = useAppSelector(state => state.lettersBank.currentGuessClasses);
    const correct = useAppSelector(state => state.lettersBank.correct);
    const present = useAppSelector(state => state.lettersBank.present);
    const wrong = useAppSelector(state => state.lettersBank.wrong);
    const currentRow = useAppSelector(state => state.inputs.currentRowIndex);
    const currentInputId = useAppSelector(state => state.inputs.currentInputId);
    const word = useAppSelector(state => state.game.word);
    const inputRows = useAppSelector(state => state.inputs.rows)
    
    
    const addGuessLetter = (letter: string) => {
        
        if (letter === 'Del') {
            const lastInputObj = findInputObjById(inputRows, currentInputId -1)
            if (lastInputObj && lastInputObj?.rowNumber !== currentRow) return
            removeLetterFromStatusBank({correct, present, wrong}, lastInputObj?.value as string, dispatch)
            dispatch(moveBackInput());
            dispatch(removeLastInputLetter());
            dispatch(removeLastGussedLetter());
            // handleRemoveAnimation(currentInputId, allRefs)
            return
        }
        if (letter === 'Enter') {
            if (currentGuess.length < 5) return
            addInputClasses(dispatch, currentInputId, currentGuessClassNames);
            addKeyboardButtonsClasses({correct, present, wrong}, dispatch)
            checkGuess(currentGuess, word, currentRow, dispatch)
            dispatch(resetGuess());
            dispatch(updateNextRow());
        }
        if (currentGuess.length === 5) return;
        dispatch(addGussedLetter(letter));
        dispatch(addInputLetter({inputIndex: currentInputId, value: letter}))
        addToGuessedLetterBank(letter, word, currentInputId, dispatch);
        dispatch(moveToNextInput());
        // handleAddAnimation(currentInputId, allRefs);
    }


    return (
        <main>
            <Header />
            <InputBoard handleInput={addGuessLetter} refs={allRefs}/>
            <Keyboard handleInput={addGuessLetter} refs={allRefs}/>
            <GameDialog isWon={isGameWon} isLost={isGameLost} />
        </main>
    )
}