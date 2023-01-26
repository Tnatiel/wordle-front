import { KeyboardRow } from "./KeyboardRow";
import { BoardsProps } from "./wordle-types";

export function Keyboard({refs, handleInput}: BoardsProps) {

    return (
        <div className="keyboard">
            <KeyboardRow handleInput={handleInput}  refs={refs} rowIndex={0} />
            <KeyboardRow handleInput={handleInput}   refs={refs} rowIndex={1} />
            <KeyboardRow handleInput={handleInput}   refs={refs} rowIndex={2} />
        </div>
    )
}