import { BoardsContext, RefsApi } from "../providors/boardslogic-context";
import {useContext} from 'react';
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { useKeyboardRow } from "../custom-hooks/useKeyboardRow";
import { addInputLetter, updateNextInput, updateBackInput, updateNextRow, removeInputLetter, updateInputClassName } from "../redux/features/InputState";
import { addCorrectLetter, addWrongLetter, addPresentLetter, removeGussedLetter, resetGuess } from "../redux/features/LettersState"; 
import { addGussedLetter } from "../redux/features/LettersState";
import { setFailure, setSuccess } from "../redux/features/GameState";
import { setButtonClassname, setCorrectClass, setPresentClass, setWrongClass } from "../redux/features/KeyboardState";



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
            addClasses({correct, present, wrong})
            // addKeyboardButtonsClasses(currentGuess, currentGuessClassNames)
            manageCheckGuess()
            dispatch(updateNextRow())
            dispatch(resetGuess())
            dispatch(updateBackInput());
            dispatch(updateNextInput());
            return;            
        }
        if (currentGuess.length === 5) return
        // TODO  handle enter and delete
        
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
        if (word.toLocaleUpperCase().includes(letter)) { 
            dispatch(addPresentLetter(letter));
            return;
        } 
        dispatch(addWrongLetter(letter));

    }

    interface ClassesColors {
        correct: string[],
        present: string[],
        wrong: string[],
    }

    const addClasses = (classes: ClassesColors) => {
        const {correct, present, wrong} = classes
        dispatch(setWrongClass(wrong));
        dispatch(setPresentClass(present));
        dispatch(setCorrectClass(correct));
    }

    

    const manageCheckGuess = () => {
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
    const addKeyboardButtonsClasses = (ids: string[], classNames: string[]) => {

        let classIndex = 0;
        for (const button of ids) {
            dispatch(setButtonClassname({id: button, className: classNames[classIndex]}))
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
