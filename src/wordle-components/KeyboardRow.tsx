import { useKeyboardRow } from "../custom-hooks/useKeyboardRow";
import { RowsProps } from "./wordle-types";


export function KeyboardRow({ rowIndex, refs, handleInput }: RowsProps) {


    
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
