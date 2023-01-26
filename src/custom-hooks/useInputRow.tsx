import { useAppSelector } from "../redux/app/hooks";

export const useInputRow = (rowNumber: number) => {
    const inputs = useAppSelector((state) => state.inputs.rows[rowNumber]);
    const currentInput = useAppSelector((state) => state.inputs.currentInputId);

    
    return { inputs, currentInput };
  };
  