

import { useEffect } from "react";
import { removeGussedLetter } from "redux/features/LettersState";
import { useInputRow } from "../custom-hooks/useInputRow";
import {  useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { InputBox } from "../redux/redux-types";
import { RowsProps } from "./wordle-types";


export function InputRow({ handleInput, rowIndex, refs}: RowsProps) {
    const dispatch = useAppDispatch();

    const handleKeypress = (e: Partial<KeyboardEvent>) => {
        // const input = e.target as HTMLInputElement;
        let letter = e.key?.toUpperCase()
        if (letter) {
            if (letter === 'ENTER') letter = 'Enter';
            if (letter === 'BACKSPACE') letter = 'Del';
        }
        console.log(letter)
        if (letter) handleInput(letter);
    }


    
    const { inputs } = useInputRow(rowIndex);
    const currentInputId = useAppSelector(state => state.inputs.currentInputId);
    const gameWon = useAppSelector(state => state.game.win)
    const currentGuess = useAppSelector(state => state.letters.currentGuess)
    const currentRow = useAppSelector(state => state.inputs.currentRowIndex)

    
    function shouldKeepFocus(input: InputBox) {
        // check if game is won and row is completed
        if (gameWon) return true;
        if (currentGuess.length === 5) {
          const lastInputRow = currentInputId - 1 % 5
          console.log('lastInputRow, ', lastInputRow)
          console.log('currentInputId, ', currentInputId)
          if (currentInputId - 1 % 5 === 4 && input.rowNumber === currentRow) return false;
          
        }
        if (currentInputId === input.id) return false
        return true
        
      }
      
    return (
        <div className="input-row">
            {inputs.map(input => (
                <input
                id={input.id.toString()}
                key={input.id}
                className={`ur-input ${input.className}`}
                autoComplete="off"
                maxLength={1}
                ref={refs.inputs[input.id]}
                defaultValue={input.value}
                disabled={shouldKeepFocus(input)}
                onKeyUp={(e: Partial<Event>) => handleKeypress(e)}
                />
            ))}
        </div>
    );
}
