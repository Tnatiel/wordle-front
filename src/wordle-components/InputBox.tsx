import React from "react";


interface InputBoxProps {
    inputsRefs: {[key: string]: React.RefObject<HTMLInputElement>},
    boxId: string,
    boxRef: React.RefObject<HTMLInputElement>,
    state?: string,
    value?: string
}


const word = 'moral'

// todo use state to render inputbox with valur=e and state
// todo interface type input box

export function InputBox({boxId, boxRef, inputsRefs}: InputBoxProps) {

    const [input, setInput] = React.useState<InputBoxProps | null>(null)

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

    const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
        // document.activeElement
        // console.log(document.activeElement)
        // console.log(inputsRefs[(event.target as HTMLInputElement).id].current)
        // if (inputsRefs[(event.target as HTMLInputElement).id].current?.id !== document.activeElement?.id) {
        //     document.activeElement.
        // }
    }

    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        const nextId = getNextInputId((event.target as HTMLInputElement).id) as string;
        const checkerPoints = ['1-0', '2-0', '3-0', '4-0', '5-0']
        if (checkerPoints.includes(nextId)) {
            const firstLetterCheckId = `${+nextId[0] - 1}-0`;
            console.log(getGuess(`${+nextId[0] - 1}-0`) === word)
        }

        // here the if that check guess

        if (nextId in inputsRefs) {
            console.log('>>in refs', nextId)
            const nextInput = inputsRefs[nextId];
            console.log('>>next input', nextInput)
            if (nextInput && nextInput.current) {
                console.log('in sec cond')
                nextInput.current.focus();
            } else {
                console.log(inputsRefs)
            }
          }
    }
    
    const checkGuess = (guess: string, id: string) => {
        // FIXME should change
        const guessResults = []
        for (let i = 0; i < 5; i++) {
            const currentGuessLetter = guess[i]
            const currentWordLetter = word[i]
            const currentInput = inputsRefs[id].current;
            if (currentGuessLetter === currentWordLetter) {
                guessResults.push('correct');
            } else if (word.includes(currentGuessLetter)) {
                guessResults.push('present');
            } else guessResults.push('wrong')
            
        }
        return guessResults
    }
    
    const getGuess = (id: string) => {
        const guess: string[] = [];
        for (let column = 0; column < 5; column++) {
            const currentRef = inputsRefs[`${id[0]}-${column}`]
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
            ref={boxRef}
            id={boxId} 
            className='ur-input'
            autoComplete='off'
            maxLength={1}
            onInput={(event) => handleInput(event)}
            onClick={(event) => handleClick(event)}
            
        />
    )
} 