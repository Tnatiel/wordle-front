import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { useKeyboardRow } from "../custom-hooks/useKeyboardRow";
import { addInputLetter, moveToNextInput, moveBackInput, updateNextRow, removeInputLetter, updateInputClassName } from "../redux/features/InputState";
import { addCorrectLetter, addWrongLetter, addPresentLetter, removeGussedLetter, resetGuess } from "../redux/features/LettersState"; 
import { addGussedLetter } from "../redux/features/LettersState";
import { setFailure, setSuccess } from "../redux/features/GameState";
import {  setCorrectClass, setPresentClass, setWrongClass } from "../redux/features/KeyboardState";
import { RowsProps } from "./InputRow";

export interface ClassesColors {
    correct: string[],
    present: string[],
    wrong: string[],
}

export function KeyboardRow({ rowIndex, refs}:RowsProps) {


    const currentInputId = useAppSelector(state => state.inputs.currentInputId);
    const word = useAppSelector(state => state.game.word)
    const dispatch = useAppDispatch();
    const buttons = useKeyboardRow(rowIndex);
    const currentGuess = useAppSelector(state => state.letters.currentGuess)
    const currentGuessClassNames = useAppSelector(state => state.letters.currentGuessclasses)
    const correct = useAppSelector(state => state.letters.correct)
    const present = useAppSelector(state => state.letters.present)
    const wrong = useAppSelector(state => state.letters.wrong)
    const currentRow = useAppSelector(state => state.inputs.currentRowIndex);

    const handleClick = (event: Partial<Event>) => {
        const letter = (event.target as HTMLButtonElement).id;
        
        if (letter === 'Del') {
            console.log(refs.inputs[currentInputId])
            console.log(refs.inputs[currentInputId].current?.disabled)
            if (refs.inputs[currentInputId].current?.disabled) return
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
        if (currentGuess.length === 5) return
        
        
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
        <div className="kboard-row">
            {buttons.map( button => (
                <button 
                id={button.id} 
                key={button.id}
                ref={refs.keyboard.allKeyboardRefs[button.id]}
                className={`kbd-btn ${button.className}`}
                onClick={(e) => handleClick(e)}
                >{button.id}</button>
            ))}
        </div>
    )
}
