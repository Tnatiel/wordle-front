import {useState, useRef} from 'react'


export const  useInputBoard = () => {
    const [boardDisabled , setBoardDisabled] = useState(false);
    
    const rowOneInputs = [0, 1, 2, 3, 4]
    const rowTwoInputs = [5, 6, 7, 8, 9]
    const rowThreeInputs = [10, 11, 12, 13, 14]
    const rowFourInputs = [15, 16, 17, 18, 19]
    const rowFiveInputs = [20, 21, 22, 23, 24]
    const rowSixInputs = [25, 26, 27, 28, 29]

    


    const rowOneInputRefs: {[key: string]: React.RefObject<HTMLInputElement>} = {
        0: useRef<HTMLInputElement>(null),
        1: useRef<HTMLInputElement>(null),
        2: useRef<HTMLInputElement>(null),
        3: useRef<HTMLInputElement>(null),
        4: useRef<HTMLInputElement>(null)
        }
    const rowTwoInputRefs: {[key: string]: React.RefObject<HTMLInputElement>} = {
        5: useRef<HTMLInputElement>(null),
        6: useRef<HTMLInputElement>(null),
        7: useRef<HTMLInputElement>(null),
        8: useRef<HTMLInputElement>(null),
        9: useRef<HTMLInputElement>(null)
        }
    const rowThreeInputRefs: {[key: string]: React.RefObject<HTMLInputElement>} = {
        10: useRef<HTMLInputElement>(null),
        11: useRef<HTMLInputElement>(null),
        12: useRef<HTMLInputElement>(null),
        13: useRef<HTMLInputElement>(null),
        14: useRef<HTMLInputElement>(null)
        }
    const rowFourInputRefs: {[key: string]: React.RefObject<HTMLInputElement>} = {
        15: useRef<HTMLInputElement>(null),
        16: useRef<HTMLInputElement>(null),
        17: useRef<HTMLInputElement>(null),
        18: useRef<HTMLInputElement>(null),
        19: useRef<HTMLInputElement>(null)
        }
    const rowFiveInputRefs: {[key: string]: React.RefObject<HTMLInputElement>} = {
        20: useRef<HTMLInputElement>(null),
        21: useRef<HTMLInputElement>(null),
        22: useRef<HTMLInputElement>(null),
        23: useRef<HTMLInputElement>(null),
        24: useRef<HTMLInputElement>(null)
        }
    const rowSixInputRefs: {[key: string]: React.RefObject<HTMLInputElement>} = {
        25: useRef<HTMLInputElement>(null),
        26: useRef<HTMLInputElement>(null),
        27: useRef<HTMLInputElement>(null),
        28: useRef<HTMLInputElement>(null),
        29: useRef<HTMLInputElement>(null)
        }

        const allInputRefs = {
            ...rowOneInputRefs,
            ...rowTwoInputRefs,
            ...rowThreeInputRefs,
            ...rowFourInputRefs,
            ...rowFiveInputRefs,
            ...rowSixInputRefs,
        }

    const focusNextInput = (nextFocusId: number) => {

        if (nextFocusId > 29) return false;
        allInputRefs[nextFocusId].current?.focus()
        return true
    }


    const getGuess = (firstInputId: number) => {
        const guess: string[] = [];
        let currentInputId = firstInputId;
        for (let i = 0; i < 5; i++) {
            const currentRef = allInputRefs[currentInputId]
            guess.push(currentRef.current!.value);
            currentInputId++;            
        }
        return guess
    }

    

        return {
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
            setBoardDisabled,
        }
    }