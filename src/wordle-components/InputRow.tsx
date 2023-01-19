

import { useInputRow } from "../custom-hooks/useInputRow";
import {  useAppSelector } from "../redux/app/hooks";
import { InputBox } from "../redux/redux-types";
import { handleKeypress, shouldKeepFocus } from "./wordle-logic";
import { RowsProps } from "./wordle-types";


export function InputRow({ handleInput, rowIndex, refs}: RowsProps) {
    
    const { inputs } = useInputRow(rowIndex);
    const currentInputId = useAppSelector(state => state.inputs.currentInputId);
    const gameWon = useAppSelector(state => state.game.win)
    const currentGuess = useAppSelector(state => state.letters.currentGuess)
    const currentRow = useAppSelector(state => state.inputs.currentRowIndex)

  
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
                onKeyUp={(e: Partial<Event>) => handleKeypress(e, handleInput)}
                disabled={shouldKeepFocus(input, gameWon, currentGuess, currentInputId, currentRow)}
                />
            ))}
        </div>
    );
}
