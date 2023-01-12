import { KeyboardRow } from "./KeyboardRow";
import { useContext } from 'react';
import { WordleApi, BoardsContext } from "../providors/boardslogic-context";



export function Keyboard() {
    
    const wordleApi = useContext(BoardsContext) as WordleApi

   
    return (
        <div className="keyboard">
            {/* <!-- ROW1 --> */}
            <KeyboardRow 
            letters={wordleApi.rowOneLetters} 
            buttonsRefs={wordleApi.rowOneKeyBoardRefs}
            />
            {/* <!-- ROW2 --> */}
            <KeyboardRow 
            letters={wordleApi.rowTwoLetters} 
            buttonsRefs={wordleApi.rowTwoKeyBoardRefs}
            />
            {/* <!-- ROW3 --> */}
            <KeyboardRow 
            letters={wordleApi.rowThreeLetters} 
            buttonsRefs={wordleApi.rowThreeKeyBoardRefs}
            />
        </div>
    )
}