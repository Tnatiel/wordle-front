import { KeyboardRow } from "./KeyboardRow";


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
    handleInput: (letter: string) => void;

}

export function Keyboard({refs, handleInput}: RefsProps) {


    return (
        <div className="keyboard">
            <KeyboardRow handleInput={handleInput}  refs={refs} rowIndex={0} />
            <KeyboardRow handleInput={handleInput}   refs={refs} rowIndex={1} />
            <KeyboardRow handleInput={handleInput}   refs={refs} rowIndex={2} />
        </div>
    )
}