import { RefObject, useState } from 'react';


interface inputRowProps {
    inputsIds: string[], 
    inputsRefs: {[key: string]: React.RefObject<HTMLInputElement>}, 
    handleFocus(nextFocusId: string): boolean,
    getGuess(firstInputId: string): string[],
    checkGuess(guess: string[], firstInputId: string): boolean,
    boardDisabled: boolean;    
}


export function InputRow({inputsIds, inputsRefs, handleFocus, getGuess, checkGuess, boardDisabled}: inputRowProps) {
    const [rowRender, setRowRender] = useState(false)
    
    const getNextInputId = (id: string) => {
        const [row, column] = [id[0], id[2]];

        if (+column + 1 > 4) {
            return `${+row + 1}-0`
        } else {
            return `${row}-${(+column + 1)}`
        }
    }

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
                }, 1000);
                return
            }
            if ( '6' === row) {
                setTimeout(() => {
                    alert('Faliure')
                }, 0);
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



