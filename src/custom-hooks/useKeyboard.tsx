import {useState, useRef } from 'react';



export const useKeyboard = () => {
    const rowOneKeyBoardRefs: {[key: string]: React.RefObject<HTMLButtonElement>} = {
        'Q': useRef<HTMLButtonElement>(null),
        'W': useRef<HTMLButtonElement>(null),
        'E': useRef<HTMLButtonElement>(null),
        'R': useRef<HTMLButtonElement>(null),
        'T': useRef<HTMLButtonElement>(null),
        'Y': useRef<HTMLButtonElement>(null),
        'U': useRef<HTMLButtonElement>(null),
        'I': useRef<HTMLButtonElement>(null),
        'O': useRef<HTMLButtonElement>(null),
        'P': useRef<HTMLButtonElement>(null),

        }
    const rowTwoKeyBoardRefs: {[key: string]: React.RefObject<HTMLButtonElement>} = {
        'A': useRef<HTMLButtonElement>(null),
        'S': useRef<HTMLButtonElement>(null),
        'D': useRef<HTMLButtonElement>(null),
        'F': useRef<HTMLButtonElement>(null),
        'G': useRef<HTMLButtonElement>(null),
        'H': useRef<HTMLButtonElement>(null),
        'J': useRef<HTMLButtonElement>(null),
        'K': useRef<HTMLButtonElement>(null),
        'L': useRef<HTMLButtonElement>(null)
        }
    const rowThreeKeyBoardRefs: {[key: string]: React.RefObject<HTMLButtonElement>} = {
        'Z': useRef<HTMLButtonElement>(null),
        'X': useRef<HTMLButtonElement>(null),
        'C': useRef<HTMLButtonElement>(null),
        'V': useRef<HTMLButtonElement>(null),
        'B': useRef<HTMLButtonElement>(null),
        'N': useRef<HTMLButtonElement>(null),
        'M': useRef<HTMLButtonElement>(null),
        }

    const allKeyboardRefs = {...rowOneKeyBoardRefs, ...rowTwoKeyBoardRefs, ...rowThreeKeyBoardRefs}
    
    const guessedLetters: string[] = []
    
    const rowOneLetters = ["Q","W","E","R","T","Y","U","I","O","P",]
    const rowTwoLetters = ["A","S","D","F","G","H","J","K","L"]
    const rowThreeLetters = ["Enter", "Z","X","C","V","B","N","M", "Del"]
    
    return {
        rowOneKeyBoardRefs,
        rowOneLetters,
        rowTwoKeyBoardRefs,
        rowTwoLetters,
        rowThreeKeyBoardRefs,
        rowThreeLetters,
        allKeyboardRefs,
        guessedLetters
    }
}