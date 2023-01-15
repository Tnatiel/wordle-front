import { useInputRef } from "../custom-hooks/useInputRefs";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { updateNextInput, updateInputValue } from "../redux/features/InputState";
import { addCorrectLetter, addWrongLetter, addPresentLetter } from "../redux/features/LettersState"; 
import { useEffect } from 'react';

interface InputBoxProps {
    id: number;
    value: string;
}

export const InputBox = ({id, value}: InputBoxProps) => {
    
    const currentInput = useAppSelector(state => state.inputs.currentInput)
    const inputsRefs = useInputRef();
    const dispatch = useAppDispatch();
    const word = useAppSelector(state => state.game.word)
    

    useEffect(() => {
        if (currentInput !== undefined && currentInput === id) {
            inputsRefs[id].current?.focus();
        }
    }, [currentInput, id, inputsRefs]);

    const checkAndUpdateLetters = (value: string) => {
        if (value === word[currentInput]) {
            dispatch(addCorrectLetter(value));
        } else if (word.includes(value)) {
            dispatch(addPresentLetter(value));
        } else {
            dispatch(addWrongLetter(value));
        }
    };

    const handleInputChange = (e: Partial<Event>) => {
        const value = (e.target as HTMLInputElement).value;
        checkAndUpdateLetters(value);
        dispatch(updateNextInput())

    };


    return (
        <input
            id={id.toString()}
            className='ur-input'
            autoComplete={'off'}
            maxLength={1}
            onInput={(e) => handleInputChange(e)}
            ref={inputsRefs[id]}

        />
    )
}