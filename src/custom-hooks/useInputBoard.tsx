import {useState, useRef} from 'react'


export const  useInputBoard = () => {
    const [boardDisabled , setBoardDisabled] = useState(false)    

    const rowOneInputs = ['0-0', '0-1', '0-2', '0-3', '0-4']
    const rowTwoInputs = ['1-0', '1-1', '1-2', '1-3', '1-4']
    const rowThreeInputs = ['2-0', '2-1', '2-2', '2-3', '2-4']
    const rowFourInputs = ['3-0', '3-1', '3-2', '3-3', '3-4']
    const rowFiveInputs = ['4-0', '4-1', '4-2', '4-3', '4-4']
    const rowSixInputs = ['5-0', '5-1', '5-2', '5-3', '5-4']

    const rowOneInputRefs: {[key: string]: React.RefObject<HTMLInputElement>} = {
        '0-0': useRef<HTMLInputElement>(null),
        '0-1': useRef<HTMLInputElement>(null),
        '0-2': useRef<HTMLInputElement>(null),
        '0-3': useRef<HTMLInputElement>(null),
        '0-4': useRef<HTMLInputElement>(null)
        }
    const rowTwoInputRefs: {[key: string]: React.RefObject<HTMLInputElement>} = {
        '1-0': useRef<HTMLInputElement>(null),
        '1-1': useRef<HTMLInputElement>(null),
        '1-2': useRef<HTMLInputElement>(null),
        '1-3': useRef<HTMLInputElement>(null),
        '1-4': useRef<HTMLInputElement>(null)
        }
    const rowThreeInputRefs: {[key: string]: React.RefObject<HTMLInputElement>} = {
        '2-0': useRef<HTMLInputElement>(null),
        '2-1': useRef<HTMLInputElement>(null),
        '2-2': useRef<HTMLInputElement>(null),
        '2-3': useRef<HTMLInputElement>(null),
        '2-4': useRef<HTMLInputElement>(null)
        }
    const rowFourInputRefs: {[key: string]: React.RefObject<HTMLInputElement>} = {
        '3-0': useRef<HTMLInputElement>(null),
        '3-1': useRef<HTMLInputElement>(null),
        '3-2': useRef<HTMLInputElement>(null),
        '3-3': useRef<HTMLInputElement>(null),
        '3-4': useRef<HTMLInputElement>(null)
        }
    const rowFiveInputRefs: {[key: string]: React.RefObject<HTMLInputElement>} = {
        '4-0': useRef<HTMLInputElement>(null),
        '4-1': useRef<HTMLInputElement>(null),
        '4-2': useRef<HTMLInputElement>(null),
        '4-3': useRef<HTMLInputElement>(null),
        '4-4': useRef<HTMLInputElement>(null)
        }
    const rowSixInputRefs: {[key: string]: React.RefObject<HTMLInputElement>} = {
        '5-0': useRef<HTMLInputElement>(null),
        '5-1': useRef<HTMLInputElement>(null),
        '5-2': useRef<HTMLInputElement>(null),
        '5-3': useRef<HTMLInputElement>(null),
        '5-4': useRef<HTMLInputElement>(null)
        }

        const allInputRefs = {
            ...rowOneInputRefs,
            ...rowTwoInputRefs,
            ...rowThreeInputRefs,
            ...rowFourInputRefs,
            ...rowFiveInputRefs,
            ...rowSixInputRefs,
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
            setBoardDisabled
        }
    }