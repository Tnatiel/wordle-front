

import { useInputRow } from "../custom-hooks/useInputRow";
import {  useAppSelector } from "../redux/app/hooks";
import { InputBox } from "../redux/redux-types";
import { RowsProps } from "./wordle-types";


export function InputRow({ handleInput, rowIndex, refs}: RowsProps) {

    const valid = ['Enter', 'Del', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S','T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    

    const handleKeypress = (e: Partial<KeyboardEvent>) => {
        // const input = e.target as HTMLInputElement;
        let letter = e.key?.toUpperCase()
        
        if (letter) {
            if (letter === 'ENTER') letter = 'Enter';
            if (letter === 'BACKSPACE') letter = 'Del';
        }
        if (!valid.includes(letter as string)) return;
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
        if (currentGuess.length === 5 
            && currentInputId  % 5 === 0 
            && input.rowNumber === currentRow) return false
          
          
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
                readOnly={true}
                value={input.value}
                onKeyUp={(e: Partial<Event>) => handleKeypress(e)}
                disabled={shouldKeepFocus(input)}
                />
            ))}
        </div>
    );
}
