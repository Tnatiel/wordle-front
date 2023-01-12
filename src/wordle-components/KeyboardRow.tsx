import { BoardsContext, WordleApi } from "../providors/boardslogic-context";
import {useContext} from 'react';


interface KeyboardRowProps {
    letters: string[];
    buttonsRefs: {[key: string]: React.RefObject<HTMLButtonElement>}
}

export function KeyboardRow({letters, buttonsRefs}: KeyboardRowProps) {

    const {allInputRefs}  = useContext(BoardsContext) as WordleApi;

    const handleClick = (event: Partial<Event>) => {
        const letter = (event.target as HTMLButtonElement).id;
        // console.log(currentInput)
        
        // filter the inputrefs array find active element
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

// export function KeyboardRow({letters}:{letters: string[]}) {
    
//     return (
//         <div className="kboard-row">
//             {letters.map( letter => (
//                 <KeyboardButton  key={letter} letter={letter}/>
//             ))}
//         </div>
//     )
// }