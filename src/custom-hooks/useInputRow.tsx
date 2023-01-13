import React from 'react' ;

export const useInputRow = () => {


    const [rowRender, setRowRender] = React.useState(false);

    const getNextInputId = (id: number) => id + 1


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

    return {
        rowRender,
        setRowRender,
        getNextInputId,
        // handleClick
    }
}