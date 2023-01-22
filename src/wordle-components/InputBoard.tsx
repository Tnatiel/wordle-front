import { useEffect } from "react";
import { useAppSelector } from "../redux/app/hooks";
import { InputRow } from "./InputRow";
import { findInputObjById } from "./wordle-logic";
import { BoardsProps } from "./wordle-types";


export const InputBoard = ({refs, handleInput}: BoardsProps) => {

    const currentInputId = useAppSelector(state => state.inputs.currentInputId);
    const currentRow = useAppSelector(state => state.inputs.currentRowIndex);
    const rows = useAppSelector( state => state.inputs.rows);

    useEffect(() => {
        if (currentInputId > 29) return;
        if (currentInputId  % 5 === 0 && currentInputId !== 0) {
            const inputObj = findInputObjById(rows, currentInputId)
            if (inputObj && inputObj.rowNumber === currentRow) {
                refs.inputs[currentInputId].current?.focus(); 
            }

            refs.inputs[currentInputId - 1].current?.focus(); 
            return;
        }

        if (currentInputId !== undefined) {
            const currentRef = refs.inputs[currentInputId].current;
            currentRef?.focus();
        }
    }, [currentInputId, currentRow, refs.inputs, rows]);


    return (
        <div className="user-input-sec">
            <InputRow handleInput={handleInput} refs={refs} rowIndex={0} />
            <InputRow handleInput={handleInput} refs={refs} rowIndex={1} />
            <InputRow handleInput={handleInput} refs={refs} rowIndex={2} />
            <InputRow handleInput={handleInput} refs={refs} rowIndex={3} />
            <InputRow handleInput={handleInput} refs={refs} rowIndex={4} />
            <InputRow handleInput={handleInput} refs={refs} rowIndex={5} />
        </div>
    )
}


