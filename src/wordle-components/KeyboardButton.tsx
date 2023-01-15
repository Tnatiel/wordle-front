import { useInputRef } from "../custom-hooks/useInputRefs";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { updateInputValue } from "../redux/features/InputState";
export function KeyboardButton({letter}: {letter: string}) {

    const currentInput = useAppSelector(state => state.inputs.currentInput);
    const dispatch = useAppDispatch();
    const refs = useInputRef()

    const handleClick = (event: Partial<Event>) => {
        const letter = (event.target as HTMLButtonElement).id;
        dispatch(updateInputValue({ inputIndex: currentInput, value: letter }));
    }

    
    return (
        <button 
        id={letter} 
        className="kbd-btn"
        onClick={(e) => handleClick(e)}
        >{letter}</button>

    )
}