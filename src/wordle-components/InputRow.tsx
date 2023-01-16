

import { useInputRow } from "../custom-hooks/useInputRow";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { updateNextInput, updateInputValue } from "../redux/features/InputState";
import { addCorrectLetter, addWrongLetter, addPresentLetter } from "../redux/features/LettersState"; 
import { useRef, useMemo } from "react";
import { InputBox } from "./InputBox";
import { useInputRef } from "../custom-hooks/useInputRefs";

export function InputRow({rowIndex: rowNumber}: {rowIndex: number}) {
    const { inputs } = useInputRow(rowNumber);


    return (
        <div className="input-row">
            {inputs.map(input => (
                <InputBox
                    id={input.id}
                    value={input.value}
                    key={input.id}
                    inputClassName={input.className}
                />
            ))}
        </div>
    );
}
