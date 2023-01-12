import { InputRow } from "./InputRow";
import { useEffect, useContext } from 'react';
import { WordleApi, BoardsContext } from "../providors/boardslogic-context";


const word ='moral';


export const InputBoard = () => {

    const  {
        rowOneInputs,
        rowOneInputRefs,
        rowTwoInputs,
        rowTwoInputRefs,
        rowThreeInputs,
        rowThreeInputRefs,
        rowFourInputs,
        rowFourInputRefs,
        rowFiveInputs,
        rowFiveInputRefs,
        rowSixInputs,
        rowSixInputRefs,
        allInputRefs,
        focusNextInput,
        getGuess,
        boardDisabled,
        setBoardDisabled
    } = useContext(BoardsContext) as WordleApi;
    
    useEffect(() => {
        const firstRef = rowOneInputRefs['0-0']
        firstRef.current?.focus()
    },)

    const api = useContext(BoardsContext) as WordleApi;
    // console.log(api.allKeyboardRefs)
    
   
    const checkGuess = (guess: string[], firstInputId: string) => {
        const guessResults: string[] = []
        for (let i = 0; i < 5; i++) {
            const currentInput = allInputRefs[`${+firstInputId[0] - 1}-${i}`].current;
            const currentKeyboardButton = api.allKeyboardRefs[(guess[i].toUpperCase())].current;
            if (guess[i] === word[i]) {
                
                currentInput?.classList.add('correct');
                currentKeyboardButton?.classList.add('correct');
                guessResults.push('correct');
            } else if (word.includes(guess[i])) {
                currentInput?.classList.add('present');
                currentKeyboardButton?.classList.add('present');
                guessResults.push('present');
            } else {
                currentInput?.classList.add('wrong');
                currentKeyboardButton?.classList.add('wrong');
                guessResults.push('wrong');
            }

        }
        
        const guessCorrect = guessResults.filter( s => s === 'correct').length === 5
        if (guessCorrect) setBoardDisabled(true)
        return guessCorrect
    }

    return (
        <div className="user-input-sec">
            <InputRow 
            inputsIds={rowOneInputs} 
            inputsRefs={rowOneInputRefs}
            handleFocus={focusNextInput} 
            getGuess={getGuess}
            checkGuess={checkGuess}
            boardDisabled={boardDisabled}  
            
            />
            <InputRow 
            inputsIds={rowTwoInputs} 
            inputsRefs={rowTwoInputRefs}
            handleFocus={focusNextInput}
            getGuess={getGuess}
            checkGuess={checkGuess}
            boardDisabled={boardDisabled}                     
            />
            <InputRow 
            inputsIds={rowThreeInputs} 
            inputsRefs={rowThreeInputRefs}
            handleFocus={focusNextInput}
            getGuess={getGuess}
            checkGuess={checkGuess}
            boardDisabled={boardDisabled}   
            />
            <InputRow 
            inputsIds={rowFourInputs}
             inputsRefs={rowFourInputRefs}
             handleFocus={focusNextInput}
             getGuess={getGuess}
            checkGuess={checkGuess}
            boardDisabled={boardDisabled}   
             />
            <InputRow 
            inputsIds={rowFiveInputs}
             inputsRefs={rowFiveInputRefs}
             handleFocus={focusNextInput}
             getGuess={getGuess}
            checkGuess={checkGuess}
            boardDisabled={boardDisabled}   
             />
            <InputRow 
            inputsIds={rowSixInputs} 
            inputsRefs={rowSixInputRefs}
            handleFocus={focusNextInput}
            getGuess={getGuess}
            checkGuess={checkGuess}
            boardDisabled={boardDisabled}   
            />
        </div>
    )
}


