import { KeyboardRow } from "./KeyboardRow";
import { useKeyboard } from "../custom-hooks/useKeyboard";

export function Keyboard() {

    const {rowOneLetters, rowTwoLetters, rowThreeLetters, rowOneKeyBoardRefs, rowThreeKeyBoardRefs, rowTwoKeyBoardRefs} = useKeyboard();
    
    
    return (
        <div className="keyboard">
            <KeyboardRow 
                letters={rowOneLetters}
                buttonsRefs={rowOneKeyBoardRefs}

            />
            <KeyboardRow 
                letters={rowTwoLetters}
                buttonsRefs={rowTwoKeyBoardRefs}

            />
            <KeyboardRow 
                letters={rowThreeLetters}
                buttonsRefs={rowThreeKeyBoardRefs}

            />
        </div>
    )
}