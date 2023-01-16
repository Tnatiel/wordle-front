import { KeyboardRow } from "./KeyboardRow";
import { useKeyboard } from "../custom-hooks/unusedHooks/useKeyboard";


export interface RefsProps {
    refs: {[key: string]: React.RefObject<HTMLInputElement>}
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