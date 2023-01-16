

import { useInputRow } from "../custom-hooks/useInputRow";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { updateNextInput, updateInputValue } from "../redux/features/InputState";
import { addCorrectLetter, addWrongLetter, addPresentLetter } from "../redux/features/LettersState"; 
import { useInputRef } from "../custom-hooks/useInputRefs";
import { useEffect } from 'react';
import { addGussedLetter } from "../redux/features/GameState";


export function InputRow({rowIndex: rowNumber}: {rowIndex: number}) {
    const { inputs } = useInputRow(rowNumber);
    const currentInput = useAppSelector(state => state.inputs.currentInput);
    const correct = useAppSelector(state => state.letters.correct)
    const present = useAppSelector(state => state.letters.present)
    const wrong = useAppSelector(state => state.letters.wrong)
    const currentGuess = useAppSelector(state => state.game.)
    const inputsRefs = useInputRef();
    const dispatch = useAppDispatch();
    const word = useAppSelector(state => state.game.word)
    
    useEffect(() => {
        if (currentInput % 5 === 0 && currentInput !== 0) return
        if (currentInput !== undefined) {
            inputsRefs[currentInput].current?.focus();
        }
    }, [currentInput, inputsRefs]);

    const handleInputChange = (e: Partial<Event>) => {
        const letter = (e.target as HTMLInputElement).value;
        addToGuessedLetterBank(letter);
        dispatch(addGussedLetter(letter))
        dispatch(updateNextInput())

    };

    const addToGuessedLetterBank = (letter: string) => {
        if (letter === word[currentInput]) dispatch(addCorrectLetter(letter));
        else if (word.includes(letter))  dispatch(addPresentLetter(letter));
        else dispatch(addWrongLetter(letter));
        console.log('>>> correct: ', correct)
        console.log('>>> present: ', present)
        console.log('>>> wrong; ', wrong)
        
    }

    const checkAndUpdateLetters = (value: string) => {
        if (value === word[currentInput]) {
            dispatch(addCorrectLetter(value));
        } else if (word.includes(value)) {
            dispatch(addPresentLetter(value));
        } else {
            dispatch(addWrongLetter(value));
        }
    };

    return (
        <div className="input-row">
            {inputs.map(input => (
                <input
                id={input.id.toString()}
                className={`ur-input ${input.className}`}
                autoComplete={'off'}
                maxLength={1}
                onInput={(e) => handleInputChange(e)}
                ref={inputsRefs[input.id]}
                defaultValue={input.value}
                disabled={input.id === currentInput ? false : true}
                />
            ))}
        </div>
    );
}
