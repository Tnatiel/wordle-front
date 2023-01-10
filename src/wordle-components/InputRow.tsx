import { InputBox } from './InputBox';
import { useRef } from "react"
interface inputBox {
    inputId: string, 
    focused: boolean, 
}

export function InputRow({inputsData, inputsRefs}: {inputsData: inputBox[], inputsRefs: {[key: string]: React.RefObject<HTMLInputElement>}}) {

    return (
        <div className="input-row">
            
            {inputsData.map( inputData => (
                <InputBox
                    boxId={inputData.inputId}
                    key={inputData.inputId}
                    focusOn={inputData.focused}
                    inputsRefsData={inputsRefs}
                />
            )
        
            )}
        </div>
    )
}

