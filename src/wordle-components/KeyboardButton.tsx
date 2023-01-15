import {useRef} from 'react';

export function KeyboardButton({letter}: {letter: string}) {

    const handleClick = (event: Partial<Event>) => {
        const letter = (event.target as HTMLButtonElement).id;

    }

    
    return (
        <button 
        id={letter} 
        className="kbd-btn"
        onClick={(e) => handleClick(e)}
        >{letter}</button>

    )
}