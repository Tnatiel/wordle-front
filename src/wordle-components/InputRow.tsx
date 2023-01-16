

import { useInputRow } from "../custom-hooks/useInputRow";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { updateNextInput, addInputLetter, updateNextRow, updateInputClassName } from "../redux/features/InputState";
import { addCorrectLetter, addWrongLetter, addPresentLetter } from "../redux/features/LettersState"; 
import { useEffect } from 'react';
import { addGussedLetter } from "../redux/features/LettersState";
import { setSuccess, setFailure } from "../redux/features/GameState";


export function InputRow({ rowIndex, refs}: {rowIndex: number, refs: { [key: string]: React.RefObject<HTMLInputElement>;}}) {
    const { inputs } = useInputRow(rowIndex);
    const currentInput = useAppSelector(state => state.inputs.currentInput);
    const currentRow = useAppSelector(state => state.inputs.currentRow);
    const correct = useAppSelector(state => state.letters.correct)
    const present = useAppSelector(state => state.letters.present)
    const wrong = useAppSelector(state => state.letters.wrong)
    const gameWon = useAppSelector(state => state.game.win)
    const currentGuess = useAppSelector(state => state.letters.currentGuess)
    const currentGuessClassNames = useAppSelector(state => state.letters.currentGuessclasses)
    const dispatch = useAppDispatch();
    const word = useAppSelector(state => state.game.word)
    
    useEffect(() => {
        // check row 
        if (currentInput > 29) return;
        if (currentInput % 5 === 0 && currentInput !== 0) return
        
        if (currentInput !== undefined) {
            // console.log('focusing')
            refs[currentInput].current?.focus();
        }
    }, [currentInput, refs]);



    const handleInputChange = (e: Partial<Event>) => {
        const letter = (e.target as HTMLInputElement).value;
        // dispatch(updateInputValue({inputIndex: currentInput, rowNumber, value: letter}))
        addToGuessedLetterBank(letter);
        dispatch(addGussedLetter(letter));
        dispatch(updateNextInput());

    };

    const addToGuessedLetterBank = (letter: string) => {
        if (letter === word[currentInput])  {
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
            dispatch(updateInputClassName({id: currentInput - i, className: currentGuessClassNames[classIndex]}))
            classIndex++;
        }
  
    }

    const checkGuess = () => {
        if (currentGuess.join('') === word.toLocaleUpperCase()) {
            setSuccess(true);
            setTimeout(() => {
                alert('win')
            }, 200);
            return true;
        } 
        if (currentRow > 5) {
            setFailure(true)
            setTimeout(() => {
                alert('Lose')
            }, 200);
            return false;
        }
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
                ref={refs[input.id]}
                defaultValue={input.value}
                disabled={gameWon ? gameWon : input.id === currentInput ? false : true}
                />
            ))}
        </div>
    );
}
