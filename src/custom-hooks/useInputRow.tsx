import React from 'react' 
import { useInputBoard } from './useInputBoard';

export const useInputRow = () => {

;
    const inputBoardApi = useInputBoard();

    const allInputRefs = {
        ...inputBoardApi.rowOneInputRefs,
        ...inputBoardApi.rowTwoInputRefs,
        ...inputBoardApi.rowThreeInputRefs,
        ...inputBoardApi.rowFourInputRefs,
        ...inputBoardApi.rowFiveInputRefs,
        ...inputBoardApi.rowSixInputRefs,
    }


   
    
    
    const [rowRender, setRowRender] = React.useState(false);

    const getNextInputId = (id: string) => {
        const [row, column] = [id[0], id[2]];

        if (+column + 1 > 4) {
            return `${+row + 1}-0`
        } else {
            return `${row}-${(+column + 1)}`
        }
    }

    interface InputBox {
        inputsRefs: {[key: string]: React.RefObject<HTMLInputElement>},
        boxId: string,
        boxRef: React.RefObject<HTMLInputElement>,
        state?: string,
        value?: string
    }

    

    const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
        const id = (event.target as HTMLElement).id
        const currentInput = allInputRefs[id].current
        console.log(currentInput)
        if (currentInput) currentInput.blur(); console.log('unfocusing')
       
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

    return {
        rowRender,
        setRowRender,
        getNextInputId,
        handleClick
    }
}