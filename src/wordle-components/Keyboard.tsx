import { KeyboardRow } from "./KeyboardRow";
import { useContext } from 'react';
import { WordleApi, BoardsContext } from "../providors/boardslogic-context";



export function Keyboard({initialInput: a}:{initialInput:number}) {
    
    const wordleApi = useContext(BoardsContext) as WordleApi

    return (
        <div className="keyboard">
            <KeyboardRow 
            letters={wordleApi.rowOneLetters} 
            buttonsRefs={wordleApi.rowOneKeyBoardRefs}
            a={a}
            />
            <KeyboardRow 
            letters={wordleApi.rowTwoLetters} 
            buttonsRefs={wordleApi.rowTwoKeyBoardRefs}
            a={a}
            />
            <KeyboardRow 
            letters={wordleApi.rowThreeLetters} 
            buttonsRefs={wordleApi.rowThreeKeyBoardRefs}
            a={a}
            />
        </div>
    )
}