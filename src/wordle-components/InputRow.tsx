import { useInputRow } from "../custom-hooks/useInputRow";
import {  useAppSelector } from "../redux/app/hooks";
import { handleKeypress, shouldKeepFocus } from "./wordle-logic";
import { RowsProps } from "./wordle-types";
import { useEffect, useState } from "react";



export function InputRow({ handleInput, rowIndex, refs}: RowsProps) {
    
    const { inputs } = useInputRow(rowIndex);
    const currentInputId = useAppSelector(state => state.inputs.currentInputId);
    const gameWon = useAppSelector(state => state.game.win)
    const currentGuess = useAppSelector(state => state.lettersBank.currentGuess)
    const currentRow = useAppSelector(state => state.inputs.currentRowIndex)

    const [shake, setShake] = useState(false);

    useEffect(() => {
        if(shake) {
            setTimeout(() => setShake(false), 600);
        }
    }, [shake]);
  
    return (
        <div className="input-row">
            {inputs.map(input => (
                <input
                id={input.id.toString()}
                key={input.id}
                className={`ur-input ${input.className} ${shake ? "shake" : ""}`}
                autoComplete="off"
                maxLength={1}
                ref={refs.inputs[input.id]}
                readOnly={true}
                value={input.value}
                onKeyUp={(e: Partial<Event>) => {handleKeypress(e, handleInput); setShake(true); console.log(shake)}}
                disabled={shouldKeepFocus(input, gameWon, currentGuess, currentInputId, currentRow)}
                />
            ))}
        </div>
    );
}
