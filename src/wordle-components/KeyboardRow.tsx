import { BoardsContext, RefsApi } from "../providors/boardslogic-context";
import {useContext} from 'react';
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { useKeyboardRow } from "../custom-hooks/useKeyboardRow";
import { updateInputValue, updateNextInput, updateBackInput, updateNextRow } from "../redux/features/InputState";



export function KeyboardRow({rowNumber}: {rowNumber: number}) {
    const currentInputId = useAppSelector(state => state.inputs.currentInput);

    const refs  = useContext(BoardsContext) as RefsApi;
    const dispatch = useAppDispatch();
    const buttons = useKeyboardRow(rowNumber);
    const handleClick = (event: Partial<Event>) => {
        const letter = (event.target as HTMLButtonElement).id;
        if (currentInputId % 5 === 0 && currentInputId !==0) {
            dispatch(updateNextRow())
        }
        if (letter === 'Del') {
            dispatch(updateBackInput())
            dispatch(updateInputValue({inputIndex: currentInputId, rowNumber, value: ''}))
            return
        }
        if (letter === 'Enter') {
            
        }
        // TODO  handle enter and delete
        dispatch(updateInputValue({inputIndex: currentInputId, rowNumber, value: letter}))
        dispatch(updateNextInput())
        
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
