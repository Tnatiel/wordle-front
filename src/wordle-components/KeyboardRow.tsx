import { BoardsContext, WordleApi } from "../providors/boardslogic-context";
import {useContext} from 'react';


interface KeyboardRowProps {
    letters: string[];
    buttonsRefs: {[key: string]: React.RefObject<HTMLButtonElement>};
    a: number;
}

export function KeyboardRow({a,letters, buttonsRefs, }: KeyboardRowProps) {

    const {allInputRefs, activeInput}  = useContext(BoardsContext) as WordleApi;

    const handleClick = (event: Partial<Event>) => {
        const letter = (event.target as HTMLButtonElement).id;
        console.log(a)
    }

    return (
        <div className="kboard-row">
            {letters.map( letter => (
                <button 
                id={letter} 
                key={letter}
                className="kbd-btn"
                onClick={(e) => handleClick(e)}
                ref={buttonsRefs[letter]}
                >{letter}</button>
            ))}
        </div>
    )
}
