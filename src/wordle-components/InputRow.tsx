

import { useInputRow } from "../custom-hooks/useInputRow";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { updateNextInput, updateInputValue } from "../redux/features/InputState";
import { addCorrectLetter, addWrongLetter, addPresentLetter } from "../redux/features/LettersState"; 
import { useRef, useMemo } from "react";
import { InputBox } from "./InputBox";

export function InputRow({rowIndex: rowNumber}: {rowIndex: number}) {
    const currentInputRef = useRef<HTMLInputElement | null>(null);
    const { inputs } = useInputRow(rowNumber);


    return (
        <div className="input-row">
            {inputs.map(input => (
                <InputBox
                    id={input.id}
                    value={input.value}
                    key={input.id}
                />
            ))}
        </div>
    );
}
