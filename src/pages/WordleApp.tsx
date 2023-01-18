import { useKeyboardRefs } from "../custom-hooks/useKeyboardRefs";
import { useInputRef } from "../custom-hooks/useInputRefs";
import { Header } from "../wordle-components/Header";
import { InputBoard } from "../wordle-components/InputBoard";
import { Keyboard } from "../wordle-components/Keyboard";
import {  useAppSelector, useAppDispatch } from '../redux/app/hooks';
import { GameDialog } from "../wordle-components/dialog/GameDialog";
import { addInputLetter, moveToNextInput, moveBackInput, updateNextRow, removeInputLetter, updateInputClassName } from "../redux/features/InputState";
import { addCorrectLetter, addWrongLetter, addPresentLetter, removeGussedLetter, resetGuess, addGussedLetter } from "../redux/features/LettersState"; 
import {  setCorrectClass, setPresentClass, setWrongClass } from "../redux/features/KeyboardState";
import { setFailure, setSuccess } from "../redux/features/GameState";
import { ClassesColors } from "../wordle-components/wordle-types";



export function WordleApp() {
    
    const inputsRefs = useInputRef();
    const keyboardRefs = useKeyboardRefs();
    const allRefs = {inputs: inputsRefs, keyboard: keyboardRefs};
    const isGameWon = useAppSelector(state => state.game.win);
    const isGameLost = useAppSelector(state => state.game.lose);
    const dispatch = useAppDispatch();
    const currentGuess = useAppSelector(state => state.letters.currentGuess);
    const currentGuessClassNames = useAppSelector(state => state.letters.currentGuessclasses);
    const correct = useAppSelector(state => state.letters.correct);
    const present = useAppSelector(state => state.letters.present);
    const wrong = useAppSelector(state => state.letters.wrong);
    const currentRow = useAppSelector(state => state.inputs.currentRowIndex);
    const currentInputId = useAppSelector(state => state.inputs.currentInputId);
    const word = useAppSelector(state => state.game.word)



    const addGuessLetter = (letter: string) => {
        if (letter === 'Del') {
            console.log(inputsRefs[currentInputId])
            console.log(inputsRefs[currentInputId].current?.disabled)
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
            addInputClasses(currentGuessClassNames);
            addKeyboardButtonsClasses({correct, present, wrong})
            manageCheckGuess()
            dispatch(updateNextRow())
            dispatch(resetGuess())

            return;
        }
        if (currentGuess.length === 5) return;
        dispatch(addInputLetter({inputIndex: currentInputId, value: letter}))
        addToGuessedLetterBank(letter);
        dispatch(addGussedLetter(letter));
        dispatch(moveToNextInput());

    }

    const addToGuessedLetterBank = (letter: string) => {
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

    const addKeyboardButtonsClasses = (classes: ClassesColors) => {
        const {correct, present, wrong} = classes
        dispatch(setWrongClass(wrong));
        dispatch(setPresentClass(present));
        dispatch(setCorrectClass(correct));
    }

    const manageCheckGuess = () => {
        if (currentGuess.join('') === word.toLocaleUpperCase()) dispatch(setSuccess(true));
        if (currentRow === 5) dispatch(setFailure(true));  
    }


    const addInputClasses = (classNames: string[]) => {
        let classIndex = 0;
        for (let i = 5; i > 0; i--) {
            dispatch(updateInputClassName({id: currentInputId - i, className: classNames[classIndex]}))
            classIndex++;
        }
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