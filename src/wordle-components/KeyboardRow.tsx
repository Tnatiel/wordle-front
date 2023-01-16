import { BoardsContext, RefsApi } from "../providors/boardslogic-context";
import {useContext} from 'react';
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { useKeyboardRow } from "../custom-hooks/useKeyboardRow";
import { addInputLetter, updateNextInput, updateBackInput, updateNextRow, removeInputLetter, updateInputClassName } from "../redux/features/InputState";
import { addCorrectLetter, addWrongLetter, addPresentLetter, removeGussedLetter, resetGuess } from "../redux/features/LettersState"; 
import { addGussedLetter } from "../redux/features/LettersState";
import { setFailure, setSuccess } from "../redux/features/GameState";



export function KeyboardRow({ rowIndex, refs}: {rowIndex: number, refs: { [key: string]: React.RefObject<HTMLInputElement>;}}) {


    const currentInputId = useAppSelector(state => state.inputs.currentInput);
    const word = useAppSelector(state => state.game.word)
    const dispatch = useAppDispatch();
    const buttons = useKeyboardRow(rowIndex);
    const currentGuess = useAppSelector(state => state.letters.currentGuess)
    const currentGuessClassNames = useAppSelector(state => state.letters.currentGuessclasses)
    const correct = useAppSelector(state => state.letters.correct)
    const present = useAppSelector(state => state.letters.present)
    const wrong = useAppSelector(state => state.letters.wrong)
    const currentRow = useAppSelector(state => state.inputs.currentRow);

    const handleClick = (event: Partial<Event>) => {
        const letter = (event.target as HTMLButtonElement).id;
        
        if (letter === 'Del') {
            dispatch(updateBackInput())
            dispatch(removeInputLetter())
            dispatch(removeGussedLetter())
            return
        }
        if (letter === 'Enter') {
            if (currentGuess.length < 5) {
                setTimeout(() => {
                    alert('not enough letters')
                    return;
                }, 100);
            }
            addInputClasses(currentGuessClassNames);
            manageCheckGuess()
            dispatch(updateNextRow())
            dispatch(resetGuess())
            return;            
        }
        if (currentGuess.length === 5) return
        // TODO  handle enter and delete
        console.log(currentGuessClassNames)
        
        dispatch(addInputLetter({inputIndex: currentInputId, value: letter}))
        addToGuessedLetterBank(letter);
        dispatch(addGussedLetter(letter));
        dispatch(updateNextInput());
        
    }

    const addToGuessedLetterBank = (letter: string) => {
        
        if (letter === word[currentInputId % 5].toLocaleUpperCase())  {
            dispatch(addCorrectLetter(letter));
            return;
        }
        if (word.includes(letter)) { 
            dispatch(addPresentLetter(letter));
            return;
        } 
        dispatch(addWrongLetter(letter));

    }

    const checkGuess = (guess: string, word: string) => guess.toLocaleUpperCase() === word.toLocaleLowerCase()

    const manageCheckGuess = () => {
        console.log(currentRow)
        if (currentGuess.join('') === word.toLocaleUpperCase()) {
            dispatch(setSuccess(true));
            setTimeout(() => {
                alert('win');
            }, 200);
            return
            
        } 
        if (currentRow === 5) {
            dispatch(setFailure(true));
            setTimeout(() => {
                alert('Lose');
            }, 200);
            return
            
        }
    }


    const addInputClasses = (classNames: string[]) => {

        let classIndex = 0;
        for (let i = 5; i > 0; i--) {
            dispatch(updateInputClassName({id: currentInputId - i, className: classNames[classIndex]}))
            classIndex++;
        }
  
    }


    return (
        <div className="kboard-row">
            {buttons.map( button => (
                <button 
                id={button.id} 
                key={button.id}
                className={`kbd-btn ${button.className}`}
                onClick={(e) => handleClick(e)}
                >{button.id}</button>
            ))}
        </div>
    )
}
