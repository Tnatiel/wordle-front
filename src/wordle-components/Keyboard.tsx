import { KeyboardRow } from "./KeyboardRow";
import { useKeyboard } from "../custom-hooks/unusedHooks/useKeyboard";

export function Keyboard() {

    
    
    
    return (
        <div className="keyboard">
            <KeyboardRow rowNumber={0} />
            <KeyboardRow rowNumber={1} />
            <KeyboardRow rowNumber={2} />
        </div>
    )
}