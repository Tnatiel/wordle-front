

import { useInputRow } from "../custom-hooks/useInputRow";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { updateNextInput, updateInputValue } from "../redux/features/InputState";
import { addCorrectLetter, addWrongLetter, addPresentLetter } from "../redux/features/LettersState"; 
import { useInputRef } from "../custom-hooks/useInputRefs";
import { useEffect } from 'react';


export function InputRow({rowIndex: rowNumber}: {rowIndex: number}) {
    const { inputs } = useInputRow(rowNumber);
    const currentInput = useAppSelector(state => state.inputs.currentInput)
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
        const value = (e.target as HTMLInputElement).value;
        checkAndUpdateLetters(value);
        dispatch(updateNextInput())

    };

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
