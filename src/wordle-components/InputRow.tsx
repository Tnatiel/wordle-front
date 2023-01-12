import { RefObject, useState } from 'react';


interface inputRowProps {
    inputsIds: string[], 
    inputsRefs: {[key: string]: React.RefObject<HTMLInputElement>}, 
    handleFocus(nextFocusId: string): boolean,
    getGuess(firstInputId: string): string[],
    checkGuess(guess: string[], firstInputId: string): boolean,
    state?: string
}


export function InputRow({inputsIds, inputsRefs, handleFocus, getGuess, checkGuess}: inputRowProps) {
    const [rowState, renderRow] = useState(false)
            
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
            console.log(guessCorrect)
            renderRow(true)
            if(guessCorrect){
                setTimeout(() => {
                    console.log('>>> succ: ', guessCorrect);
                    alert('Success')
                }, 0);
            }
            if ( '6' === row) {
                setTimeout(() => {
                    // console.log('>>> fail: ', guessCorrect);
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



