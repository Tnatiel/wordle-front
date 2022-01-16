import { KeyboardRow } from "./KeyboardRow";
import { useKeyboardRefs } from "../custom-hooks/useKeyboardRefs";


export interface RefsProps {
    refs: {
        inputs: {
            [key: string]: React.RefObject<HTMLInputElement>;
        };
        keyboard: {
            allKeyboardRefs: {
                [x: string]: React.RefObject<HTMLButtonElement>;
            };
        };
    }
}

export function Keyboard({refs}: RefsProps) {


    return (
        <div className="keyboard">
            <KeyboardRow  refs={refs} rowIndex={0} />
            <KeyboardRow  refs={refs} rowIndex={1} />
            <KeyboardRow  refs={refs} rowIndex={2} />
        </div>
    )
}