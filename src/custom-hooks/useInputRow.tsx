import React from 'react' 
import { ApiValue, BoardsContext } from '../providors/boardslogic-context';
import { useInputBoard } from './useInputBoard';

export const useInputRow = () => {
    
    const [boardDisabled , setBoardDisabled] = React.useState(false)
    const api = React.useContext(BoardsContext) as ApiValue;
    const inputBoardApi = useInputBoard();

    const allInputRefs = {
        ...inputBoardApi.rowOneInputRefs,
        ...inputBoardApi.rowTwoInputRefs,
        ...inputBoardApi.rowThreeInputRefs,
        ...inputBoardApi.rowFourInputRefs,
        ...inputBoardApi.rowFiveInputRefs,
        ...inputBoardApi.rowSixInputRefs,
    }

    const focusNextInput = (nextFocusId: string) => {
        if ( nextFocusId === '6-0') {
            return false
        }
        allInputRefs[nextFocusId].current?.focus()
        return true
    }

    const getGuess = (firstInputId: string) => {
        const guess: string[] = [];
        for (let column = 0; column < 5; column++) {
            const currentRef = allInputRefs[`${+firstInputId[0] - 1}-${column}`]
            guess.push(currentRef.current!.value);            
        }
        return guess
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
        if (currentInput) currentInput.disabled = true
       
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
}