import { BoardsContext, WordleApi } from "../providors/boardslogic-context";
import { useContext } from "react";
import { useInputRow } from "../custom-hooks/useInputRow";
import { useInputBoard } from "../custom-hooks/useInputBoard";


interface inputRowProps {
    inputsIds: number[], 
    inputsRefs: {[key: string]: React.RefObject<HTMLInputElement>}, 
    handleFocus(nextFocusId: number): boolean,
    getGuess(firstInputId: number): string[],
    checkGuess(guess: string[], firstInputId: number): boolean,
    boardDisabled: boolean;  
    a: number;
    b() : number;  
}

export function InputRow({b, inputsIds, inputsRefs, handleFocus, getGuess, checkGuess, boardDisabled}: inputRowProps) {

    let {rowRender, setRowRender } = useInputRow()
    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        

        const nextId = b()
        if (nextId % 5 === 0 && nextId !== 0) {
            const guess = getGuess(nextId - 5);
            const guessCorrect = checkGuess(guess, nextId - 5)
            setRowRender(true)
            if(guessCorrect){
                setTimeout(() => {
                    
                    alert('Success')
                }, 200);
                return
            }
            if (nextId > 29) {
                setTimeout(() => {
                    alert('Faliure')
                }, 200);
            }
            handleFocus(nextId);
            return;
        }

        handleFocus(nextId)
        
    }

    return (
        <div className="input-row">
            
            {inputsIds.map( (id: number) => (
                <input
                    id={`${id}`}
                    key={id}
                    ref={inputsRefs[id]}
                    className={`ur-input`}
                    maxLength={1}
                    onInput={handleInput}
                    autoComplete='off'
                    disabled={boardDisabled ? boardDisabled: rowRender}                
                />
            )
        )}
        </div>
    )
}



