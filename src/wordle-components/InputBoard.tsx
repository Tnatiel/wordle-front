import { InputRow } from "./InputRow";
import { useInputRow } from "../custom-hooks/useInputRow";


export const InputBoard = () => {

    const inputRowApi = useInputRow()
    

    return (
        <div className="user-input-sec">
            {/* <!-- ROW 1 --> */}
            <InputRow inputsData={inputRowApi.rowOneInputs} inputsRefs={inputRowApi.rowOneInputRefs} />
            {/* <!-- ROW 2 --> */}
            <InputRow inputsData={inputRowApi.rowTwoInputs} inputsRefs={inputRowApi.rowTwoInputRefs} />
            {/* <!-- ROW 3 --> */}
            <InputRow inputsData={inputRowApi.rowThreeInputs} inputsRefs={inputRowApi.rowThreeInputRefs} />
            {/* <!-- ROW 4 --> */}
            <InputRow inputsData={inputRowApi.rowFourInputs} inputsRefs={inputRowApi.rowFourInputRefs} />
            {/* <!-- ROW 5 --> */}
            <InputRow inputsData={inputRowApi.rowFiveInputs} inputsRefs={inputRowApi.rowFiveInputRefs} />
            {/* <!-- ROW 6 --> */}
            <InputRow inputsData={inputRowApi.rowSixInputs} inputsRefs={inputRowApi.rowSixInputRefs} />
        </div>
    )
}