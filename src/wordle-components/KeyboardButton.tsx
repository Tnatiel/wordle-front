import { useInputRef } from "../custom-hooks/useInputRefs";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { updateInputValue } from "../redux/features/InputState";
export function KeyboardButton({letter}: {letter: string}) {

    const currentInputId = useAppSelector(state => state.inputs.currentInput);
    const dispatch = useAppDispatch();
    const refs = useInputRef()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log();
        
    }

    
    return (
        <button 
        id={letter} 
        className="kbd-btn"
        onClick={handleClick}
        >{letter}</button>

    )
}