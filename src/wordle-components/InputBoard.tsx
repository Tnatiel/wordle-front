import { InputRow } from "./InputRow";


export const InputBoard = () => {

    return (
        <div className="user-input-sec">
            <InputRow rowIndex={0} />
            <InputRow rowIndex={1} />
            <InputRow rowIndex={2} />
            <InputRow rowIndex={3} />
            <InputRow rowIndex={4} />
            <InputRow rowIndex={5} />
        </div>
    )
}


