import { BoardsContext, RefsApi } from "../providors/boardslogic-context";
import {useContext} from 'react';
import { useAppSelector } from "../redux/app/hooks";
import { useKeyboardRow } from "../custom-hooks/useKeyboardRow";



export function KeyboardRow({rowNumber}: {rowNumber: number}) {

    const refs  = useContext(BoardsContext) as RefsApi;

    const buttons = useKeyboardRow(rowNumber);
    const handleClick = (event: Partial<Event>) => {
        const letter = (event.target as HTMLButtonElement).id;
    }

    return (
        <div className="kboard-row">
            {buttons.map( button => (
                <button 
                id={button.id} 
                key={button.id}
                className={`kbd-btn ${button.className}`}
                onClick={(e) => handleClick(e)}
                >{button.id}</button>
            ))}
        </div>
    )
}
