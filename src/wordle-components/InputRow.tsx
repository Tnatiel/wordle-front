import { useInputRow } from '../custom-hooks/useInputRow';


interface inputRowProps {
    inputsIds: string[], 
    inputsRefs: {[key: string]: React.RefObject<HTMLInputElement>}, 
    handleFocus(nextFocusId: string): boolean,
    getGuess(firstInputId: string): string[],
    checkGuess(guess: string[], firstInputId: string): boolean,
    boardDisabled: boolean;    
}

export function InputRow({inputsIds, inputsRefs, handleFocus, getGuess, checkGuess, boardDisabled}: inputRowProps) {


    const {rowRender, setRowRender, getNextInputId } = useContext
    
    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        
        const nextId =  getNextInputId((event.target as HTMLInputElement).id.toString());
        const [row, column] = [nextId[0], nextId[2]];
        if (('123456'.includes(row) && '0' === column)) {
            const guess = getGuess(`${row}-${column}`);
            const guessCorrect = checkGuess(guess, `${row}-${column}`)
            setRowRender(true)
            if(guessCorrect){
                setTimeout(() => {
                    
                    alert('Success')
                }, 200);
                return
            }
            if ( '6' === row) {
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



