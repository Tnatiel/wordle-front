import { useKeyboardRow } from "../custom-hooks/useKeyboardRow";


export interface ClassesColors {
    correct: string[],
    present: string[],
    wrong: string[],
}

export interface KeyRowsProps {
    rowIndex: number;
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

export function KeyboardRow({ rowIndex, refs, handleInput }: KeyRowsProps) {


    
    const buttons = useKeyboardRow(rowIndex);
    

    const handleClick = (event: Partial<Event>) => handleInput((event.target as HTMLButtonElement).id); 

    return (
        <div className="kboard-row">
            {buttons.map( button => (
                <button 
                id={button.id} 
                key={button.id}
                ref={refs.keyboard.allKeyboardRefs[button.id]}
                className={`kbd-btn ${button.className}`}
                onClick={(e) => handleClick(e)}
                >{button.id}</button>
            ))}
        </div>
    )
}
