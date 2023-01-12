import { KeyboardRow } from "./KeyboardRow";
import {useState, useRef } from 'react';
import { useKeyboard } from "../custom-hooks/useKeyboard";



export function Keyboard() {
    
    const {
        rowOneKeyBoardRefs,
        rowOneLetters,
        rowTwoKeyBoardRefs,
        rowTwoLetters,
        rowThreeKeyBoardRefs,
        rowThreeLetters
    } = useKeyboard();

   
    return (
        <div className="keyboard">
            {/* <!-- ROW1 --> */}
            <KeyboardRow 
            letters={rowOneLetters} 
            buttonsRefs={rowOneKeyBoardRefs}
            />
            {/* <!-- ROW2 --> */}
            <KeyboardRow 
            letters={rowTwoLetters} 
            buttonsRefs={rowTwoKeyBoardRefs}
            />
            {/* <!-- ROW3 --> */}
            <KeyboardRow 
            letters={rowThreeLetters} 
            buttonsRefs={rowThreeKeyBoardRefs}
            />
        </div>
    )
}