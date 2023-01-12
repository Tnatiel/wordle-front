import { InputRow } from "./InputRow";
import { useInputBoard } from "../custom-hooks/useInputBoard";
import { useEffect, RefObject } from 'react';

interface InputBox {
    id: string,
    ref: RefObject<HTMLInputElement>,
    state: string
}



const word ='moral';


export const InputBoard = () => {

    
    const inputBoardApi = useInputBoard();
    
    useEffect(() => {
        const firstRef = inputBoardApi.rowOneInputRefs['0-0']
        firstRef.current?.focus()
    },)
    
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
        console.log(nextFocusId)
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
   
    const checkGuess = (guess: string[], firstInputId: string) => {
        const guessResults: string[] = []
        for (let i = 0; i < 5; i++) {
            const currentInput = allInputRefs[`${+firstInputId[0] - 1}-${i}`].current;
            if (guess[i] === word[i]) {
                
                currentInput?.classList.add('correct');
                guessResults.push('correct');
            } else if (word.includes(guess[i])) {
                currentInput?.classList.add('present');
                guessResults.push('present');
            } else {
                currentInput?.classList.add('wrong');
                guessResults.push('wrong');
            }
            
        }
        return guessResults.filter( s => s === 'correct').length === 5
    

    }

    
    

    return (
        <div className="user-input-sec">
            <InputRow 
            inputsIds={inputBoardApi.rowOneInputs} 
            inputsRefs={inputBoardApi.rowOneInputRefs}
            handleFocus={focusNextInput} 
            getGuess={getGuess}
            checkGuess={checkGuess}
            />
            <InputRow 
            inputsIds={inputBoardApi.rowTwoInputs} 
            inputsRefs={inputBoardApi.rowTwoInputRefs}
            handleFocus={focusNextInput}
            getGuess={getGuess}
            checkGuess={checkGuess}                     
            />
            <InputRow 
            inputsIds={inputBoardApi.rowThreeInputs} 
            inputsRefs={inputBoardApi.rowThreeInputRefs}
            handleFocus={focusNextInput}
            getGuess={getGuess}
            checkGuess={checkGuess} 
            />
            <InputRow 
            inputsIds={inputBoardApi.rowFourInputs}
             inputsRefs={inputBoardApi.rowFourInputRefs}
             handleFocus={focusNextInput}
             getGuess={getGuess}
            checkGuess={checkGuess} 
             />
            <InputRow 
            inputsIds={inputBoardApi.rowFiveInputs}
             inputsRefs={inputBoardApi.rowFiveInputRefs}
             handleFocus={focusNextInput}
             getGuess={getGuess}
            checkGuess={checkGuess} 
             />
            <InputRow 
            inputsIds={inputBoardApi.rowSixInputs} 
            inputsRefs={inputBoardApi.rowSixInputRefs}
            handleFocus={focusNextInput}
            getGuess={getGuess}
            checkGuess={checkGuess} 
            />
        </div>
    )
}


