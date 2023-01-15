import { useAppSelector } from "../redux/app/hooks";

export const useKeyboardRow = (rowNumber: number) => {
    const inputs = useAppSelector((state) => state.inputs.rows[rowNumber]);
    const currentInput = useAppSelector((state) => state.inputs.currentInput);
    FIXME
    return
}