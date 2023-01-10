import React from "react";

export function InputBox(
    {boxId, focusOn, inputsRefsData}: 
    {boxId: string, focusOn: boolean, inputsRefsData: {[key: string]: React.RefObject<HTMLInputElement>}}) {

    // todo figure how to make only relevant inputs to get checker func
    // todo although that not that importent wont change runtime
    // todo how i get the inputs data (REFFFFFFFFFFFFFFFS)

    const getNextInputId = (id: string) => {

        if (+id[0] + 1 > 5) {
            return '6-0'
        }
        if (+id[2] + 1 > 4) {
            // console.log('retuen next row')
            return `${+id[0] + 1}-0`
        } else {
            // console.log('retuen same row')
            return `${id[0]}-${(+id[2] + 1)}`
        }
    }

    const handleClick = (event: React.FormEvent<HTMLInputElement>) => {
        if ((event.target as HTMLInputElement) !== document.activeElement) {
            return
        }
    }

    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        const nextId = getNextInputId((event.target as HTMLInputElement).id) as string;
        const checkerPoints = ['1-0', '2-0', '3-0', '4-0', '5-0']
        if (checkerPoints.includes(nextId)) {
            console.log('in')
        }

        // here the if that check guess

        if (nextId in inputsRefsData) {
            console.log('>>in refs', nextId)
            const nextInput = inputsRefsData[nextId];
            console.log('>>next input', nextInput)
            if (nextInput && nextInput.current) {
                console.log('in sec cond')
                nextInput.current.focus();
            } else {
                console.log(inputsRefsData)
            }
          }
    } 
    
    const getGuess = (id: string) => {
        const guess: string[] = [];
        for (let column = 0; column < 5; column++) {
            const currentRef = inputsRefsData[`${id[0]}-${column}`]
            guess.push(currentRef.current!.value);            
        }
        return guess.join('')
    }

    const sendGuess = (guess: string) => {
        fetch('http://localhost:3003/word/check', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'},
            body: JSON.stringify(guess)
            })
            .then( res => res.json())
            .then( answer => console.log(answer))
            .catch( (e: Error) => console.log(e.message))
    }

    return (
        <input
            ref={inputsRefsData[boxId]}
            id={boxId} 
            className={'ur-input'}
            autoFocus={focusOn}
            autoComplete={'off'}
            maxLength={1}
            onInput={(event) => handleInput(event)}
            onClick={(event) => handleClick(event)}
        />
    )
} 