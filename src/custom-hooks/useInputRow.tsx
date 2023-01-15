import { useAppSelector } from "../redux/app/hooks";
import { useRef } from 'react';

export const useInputRow = (rowNumber: number) => {
    const inputs = useAppSelector((state) => state.inputs.rows[rowNumber]);
    const currentInput = useAppSelector((state) => state.inputs.currentInput);

    
    return { inputs, currentInput };
  };
  