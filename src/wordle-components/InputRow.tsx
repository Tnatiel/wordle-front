import { BoardsContext, WordleApi } from "../providors/boardslogic-context";
import { useContext } from "react";
import { useInputRow } from "../custom-hooks/useInputRow";


interface inputRowProps {
    inputsIds: string[], 
    inputsRefs: {[key: string]: React.RefObject<HTMLInputElement>}, 
    handleFocus(nextFocusId: number): boolean,
    getGuess(firstInputId: number): string[],
    checkGuess(guess: string[], firstInputId: number): boolean,
    boardDisabled: boolean;    
}

export function InputRow({inputsIds, inputsRefs, handleFocus, getGuess, checkGuess, boardDisabled}: inputRowProps) {


    const { getNextInputId } = useContext(BoardsContext) as WordleApi;
    const {rowRender, setRowRender} = useInputRow()
    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        
        const nextId =  getNextInputId(+(event.target as HTMLInputElement).id);
        
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
            
            {inputsIds.map( (id: string) => (
                <input
                    id={id}
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



