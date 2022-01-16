import { InputRow } from "./InputRow";
import { RefsProps } from "./Keyboard";


export const InputBoard = ({refs}: RefsProps) => {
    
    return (
        <div className="user-input-sec">
            <InputRow refs={refs} rowIndex={0} />
            <InputRow refs={refs} rowIndex={1} />
            <InputRow refs={refs} rowIndex={2} />
            <InputRow refs={refs} rowIndex={3} />
            <InputRow refs={refs} rowIndex={4} />
            <InputRow refs={refs} rowIndex={5} />
        </div>
    )
}


