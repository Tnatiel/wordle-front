import { InputRow } from "./InputRow";
import { useInputRow } from "../custom-hooks/useInputBoard";
import { useEffect } from 'react';
;


export const InputBoard = () => {

    const inputRowApi = useInputRow();

    useEffect(() => {
        const firstRef = inputRowApi.rowOneInputRefs['0-0']
        firstRef.current?.focus()
      },)
    

    return (
        <div className="user-input-sec">
            <InputRow 
            inputsIds={inputRowApi.rowOneInputs} 
            inputsRefs={inputRowApi.rowOneInputRefs} />
            <InputRow 
            inputsIds={inputRowApi.rowTwoInputs} 
            inputsRefs={inputRowApi.rowTwoInputRefs} />
            <InputRow 
            inputsIds={inputRowApi.rowThreeInputs} 
            inputsRefs={inputRowApi.rowThreeInputRefs} />
            <InputRow 
            inputsIds={inputRowApi.rowFourInputs}
             inputsRefs={inputRowApi.rowFourInputRefs} />
            <InputRow 
            inputsIds={inputRowApi.rowFiveInputs}
             inputsRefs={inputRowApi.rowFiveInputRefs} />
            <InputRow 
            inputsIds={inputRowApi.rowSixInputs} 
            inputsRefs={inputRowApi.rowSixInputRefs} />
        </div>
    )
}