import { RefObject, useState } from 'react';


interface inputRowProps {
    inputsIds: string[], 
    inputsRefs: {[key: string]: React.RefObject<HTMLInputElement>}, 
    handleFocus(nextFocusId: string): void,
    getGuess(firstInputId: string): string[],
    checkGuess(guess: string[], firstInputId: string): boolean,
    state?: string
}


export function InputRow({inputsIds, inputsRefs, handleFocus, getGuess, checkGuess}: inputRowProps) {
    const [rowState, renderRow] = useState(false)
            
    const getNextInputId = (id: string) => {
        const [row, column] = [id[0], id[2]];
        if ( '5' === row) {
            if (+column > 4) {
                return 'GameOver'
            } else {
                return `5-${(+column + 1)}`
            }
        }
        if (+column + 1 > 4) {
            return `${+row + 1}-0`
        } else {
            return `${row}-${(+column + 1)}`
        }
    }

    

    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        // better condition
        //  check current event . id exist if === 5-4 check render game over
        const nextId =  getNextInputId((event.target as HTMLInputElement).id.toString());
        if ('GameOver' === nextId) {
            console.log('Fail');
            return;
        }
        const [row, column] = [nextId[0], nextId[2]]
        if (('12345'.includes(row) && '0' === column)) {
            const guess = getGuess(`${row}-${column}`);
            const guessCorrect = checkGuess(guess, `${row}-${column}`)
            renderRow(true)
            handleFocus(nextId);
            return;
        }
        if (nextId === '5-5') {
            setTimeout(() => {
                if (checkGuess(getGuess(`${row}-${column}`), `${row}-${column}`)) {
                    alert('succses')
                } else {
                    alert('fail')
                }
                
            }, 0);
        }
        handleFocus(nextId);
    }

    return (
        <div className="input-row">
            
            {inputsIds.map( (id: string,  index: number) => (
                <input
                    id={id}
                    key={id}
                    ref={inputsRefs[id]}
                    className={`ur-input`}
                    maxLength={1}
                    onInput={handleInput}
                    autoComplete='false'
                
                />
            )
        
            )}
        </div>
    )
}



