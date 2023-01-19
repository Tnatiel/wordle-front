import { useKeyboardRefs } from "../custom-hooks/useKeyboardRefs";
import { useInputRef } from "../custom-hooks/useInputRefs";
import { Header } from "../wordle-components/Header";
import { InputBoard } from "../wordle-components/InputBoard";
import { Keyboard } from "../wordle-components/Keyboard";
import {  useAppSelector, useAppDispatch } from '../redux/app/hooks';
import { GameDialog } from "../wordle-components/dialog/GameDialog";
import { moveBackInput, updateNextRow, removeInputLetter } from "../redux/features/InputState";
import {  removeGussedLetter, resetGuess, } from "../redux/features/LettersState"; 
import {  addInputClasses, addKeyboardButtonsClasses, addLetterAndMoveForword, checkGuess } from "../wordle-components/wordle-logic";



export function WordleApp() {
    
    const dispatch = useAppDispatch();
    const inputsRefs = useInputRef();
    const keyboardRefs = useKeyboardRefs();
    const allRefs = {inputs: inputsRefs, keyboard: keyboardRefs};
    const isGameWon = useAppSelector(state => state.dialog.winDialog);
    const isGameLost = useAppSelector(state => state.dialog.loseDialog);
    const currentGuess = useAppSelector(state => state.letters.currentGuess);
    const currentGuessClassNames = useAppSelector(state => state.letters.currentGuessclasses);
    const correct = useAppSelector(state => state.letters.correct);
    const present = useAppSelector(state => state.letters.present);
    const wrong = useAppSelector(state => state.letters.wrong);
    const currentRow = useAppSelector(state => state.inputs.currentRowIndex);
    const currentInputId = useAppSelector(state => state.inputs.currentInputId);
    const word = useAppSelector(state => state.game.word);
    
    
    const addGuessLetter = (letter: string) => {
        
        
        if (letter === 'Del') {
            if (inputsRefs[currentInputId].current?.disabled) return
            dispatch(moveBackInput());
            dispatch(removeInputLetter());
            dispatch(removeGussedLetter());
            return
        }
        if (letter === 'Enter') {
            if (currentGuess.length < 5) {
            setTimeout(() => {
                alert('not enough letters')
            }, 100);
            return;
            }
            addInputClasses(dispatch, currentInputId, currentGuessClassNames);
            addKeyboardButtonsClasses({correct, present, wrong}, dispatch)
            checkGuess(currentGuess, word, currentRow, dispatch)
            dispatch(resetGuess());
            dispatch(updateNextRow());
        }
        if (currentGuess.length === 5) return;
        addLetterAndMoveForword(dispatch, letter, word, currentInputId);
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