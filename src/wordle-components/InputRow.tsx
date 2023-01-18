

import { useInputRow } from "../custom-hooks/useInputRow";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { moveToNextInput,  updateNextRow, updateInputClassName, moveBackInput, removeInputLetter } from "../redux/features/InputState";
import { addCorrectLetter, addWrongLetter, addPresentLetter, resetGuess, removeGussedLetter } from "../redux/features/LettersState"; 
import { useEffect } from 'react';
import { addGussedLetter } from "../redux/features/LettersState";
import { setSuccess, setFailure } from "../redux/features/GameState";
import {  setCorrectClass, setPresentClass, setWrongClass } from "../redux/features/KeyboardState";
import { ClassesColors } from "./KeyboardRow";

export interface RowsProps {
    rowIndex: number;
    refs: {
        inputs: {
            [key: string]: React.RefObject<HTMLInputElement>;
        };
        keyboard: {
            allKeyboardRefs: {
                [x: string]: React.RefObject<HTMLButtonElement>;
            };
        };
    }
}


export function InputRow({ rowIndex, refs}: RowsProps) {
    const { inputs } = useInputRow(rowIndex);
    const currentInputId = useAppSelector(state => state.inputs.currentInputId);
    const currentRow = useAppSelector(state => state.inputs.currentRowIndex);
    const gameWon = useAppSelector(state => state.game.win)
    const currentGuess = useAppSelector(state => state.letters.currentGuess)
    const currentGuessClassNames = useAppSelector(state => state.letters.currentGuessclasses)
    const dispatch = useAppDispatch();
    const word = useAppSelector(state => state.game.word).toUpperCase()
    const correct = useAppSelector(state => state.letters.correct)
    const present = useAppSelector(state => state.letters.present)
    const wrong = useAppSelector(state => state.letters.wrong)
    
    useEffect(() => {
        if (currentInputId > 29) return;
        // if (currentInputId % 5 === 0) return; 
        // TODO improve if to check if row been checked
        if (currentInputId !== undefined) {
            const currentRef = refs.inputs[currentInputId].current;
            currentRef?.focus();
        }
    }, [currentInputId, inputs, refs]);

    
    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement> ) => {

        let letter = e.key;
        if (letter === 'Backspace') letter = 'Del';
        if (letter === 'Del') {
            dispatch(removeInputLetter());
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
            addInputClasses();
            addKeyboardButtonsClasses({correct, present, wrong})
            dispatch(updateNextRow())
            dispatch(resetGuess())
            dispatch(moveBackInput());
            dispatch(moveToNextInput());
            return;            
        }
        if (currentGuess.length === 5) return
    }


    const handleInputChange = (e: Partial<Event>) => {

        const letter = (e.target as HTMLInputElement).value.toUpperCase();
        if (letter === 'Enter') {
            if (currentGuess.length < 5) {
                setTimeout(() => {
                    alert('not enough letters')
                    return;
                }, 100);
            }
        }
        if (currentInputId % 5 === 0 && currentInputId !== 0) return
        if (currentGuess.length < 5) {
            addToGuessedLetterBank(letter);
            dispatch(addGussedLetter(letter));
            dispatch(moveToNextInput());

        }   

    };

    const addToGuessedLetterBank = (letter: string) => {
        if (letter === word[currentInputId])  {
            dispatch(addCorrectLetter(letter));
            return;
        }
        if (word.includes(letter)) { 
            dispatch(addPresentLetter(letter));
            return;
        } 
        dispatch(addWrongLetter(letter));
    }


    const addInputClasses = () => {

        let classIndex = 0;
        for (let i = 5; i > 0; i--) {
            dispatch(updateInputClassName({id: currentInputId - i, className: currentGuessClassNames[classIndex]}))
            classIndex++;
        }
    }

    const addKeyboardButtonsClasses = (classes: ClassesColors) => {
        const {correct, present, wrong} = classes
        dispatch(setWrongClass(wrong));
        dispatch(setPresentClass(present));
        dispatch(setCorrectClass(correct));
    }

    return (
        <div className="input-row">
            {inputs.map(input => (
                <input
                id={input.id.toString()}
                key={input.id}
                className={`ur-input ${input.className}`}
                autoComplete={'off'}
                maxLength={1}
                onInput={(e) => handleInputChange(e)}
                onKeyUp={(e) => handleKeyUp(e)}
                ref={refs.inputs[input.id]}
                defaultValue={input.value}
                disabled={gameWon ? gameWon : input.id === currentInputId ? false : true}
                />
            ))}
        </div>
    );
}
