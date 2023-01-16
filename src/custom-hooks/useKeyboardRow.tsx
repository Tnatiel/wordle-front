import { useAppSelector } from "../redux/app/hooks";

export const useKeyboardRow = (rowNumber: number) => {
    const buttons = useAppSelector((state) => state.keyboard.rows[rowNumber]);
    return buttons
}