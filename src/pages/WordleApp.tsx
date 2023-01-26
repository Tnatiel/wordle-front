import { useKeyboardRefs } from "../custom-hooks/useKeyboardRefs";
import { useInputRef } from "../custom-hooks/useInputRefs";
import { Header } from "../wordle-components/Header";
import { InputBoard } from "../wordle-components/InputBoard";
import { Keyboard } from "../wordle-components/Keyboard";
import {  useAppSelector, useAppDispatch } from '../redux/app/hooks';
import { GameDialog } from "../wordle-components/dialog/GameDialog";
import { moveBackInput, updateNextRow, removeLastInputLetter, addInputLetter, moveToNextInput } from "../redux/features/InputState";
import {  addLetterToGuess, removeLastGussedLetter, resetGuess,  } from "../redux/features/LettersState"; 
import {  addInputClasses, addKeyboardButtonsClasses,findInputObjById, removeLetterFromStatusBank, addLettersToStatusBank, filterGuessToStatusBank } from "../wordle-components/wordle-logic";
import { useEffect, useState } from "react";
import { setWin, setWordData } from "redux/features/GameState";
import { setLoseDialog, setWinDialog } from "redux/features/DialogState";



export function WordleApp() {
    const [classes, setClasses] = useState<string[]>([]);
    const [correctBank, setCorrectBank] = useState<string[]>([]);
    const [presentBank, setPresentBank] = useState<string[]>([]);
    const [wrongBank, setWrongBank] = useState<string[]>([]);
    const wordData = useAppSelector(state => state.game.wordData);
    const dispatch = useAppDispatch();
    useEffect(() => {
        fetch('http://localhost:3333/word/random')
        .then(res => res.json())
        .then(data => {
            dispatch(setWordData(data))
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const inputsRefs = useInputRef();
    const keyboardRefs = useKeyboardRefs();
    const allRefs = {inputs: inputsRefs, keyboard: keyboardRefs};
    const isGameWon = useAppSelector(state => state.dialog.winDialog);
    const isGameLost = useAppSelector(state => state.dialog.loseDialog);
    const currentGuess = useAppSelector(state => state.lettersBank.currentGuess);
    const currentRow = useAppSelector(state => state.inputs.currentRowIndex);
    const currentInputId = useAppSelector(state => state.inputs.currentInputId);
    const inputRows = useAppSelector(state => state.inputs.rows)

    useEffect(() => {
        const handleCheck =  () => {
            if (currentGuess.length !== 5) return;
            checkOnServer(currentGuess.join(''))
            .catch(e => console.log(e.message));

        }

        handleCheck()
    },[ currentGuess]);

    const checkOnServer = async (currentGuess: string) => {
        try {
            const response = await fetch('http://localhost:3333/word/check', {
                method: 'POST',
                body: JSON.stringify({
                    guess: currentGuess,
                    iv: wordData.iv,
                    content: wordData.content,
                    key: wordData.key
                }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            
            const responseClasses = await data.classes
            setClasses(responseClasses)
            const {correct, present, wrong} = filterGuessToStatusBank(currentGuess, responseClasses)
            setCorrectBank(correct);
            setPresentBank(present);
            setWrongBank(wrong);
            
            return data;
        } catch (err) {
            console.log(err);
        } 
    }
    
    const addGuessLetter = async (letter: string) => {
        
        if (letter === 'Del') {
            const lastInputObj = findInputObjById(inputRows, currentInputId -1)
            if (lastInputObj && lastInputObj?.rowNumber !== currentRow) return
            removeLetterFromStatusBank({correctBank, presentBank, wrongBank}, lastInputObj?.value as string, dispatch)
            dispatch(moveBackInput());
            dispatch(removeLastInputLetter());
            dispatch(removeLastGussedLetter());
            return
        }

        if (letter === 'Enter') {
            if (currentGuess.length < 5) return
            const wordData = await checkOnServer(currentGuess.join(''))
            if (wordData.correct) {
                dispatch(setWin(true))
                dispatch(setWinDialog(true))
            }
            addLettersToStatusBank(currentGuess.join(''), classes, dispatch)
            addInputClasses(dispatch, currentInputId, classes);
            addKeyboardButtonsClasses({correctBank, presentBank, wrongBank}, dispatch)
            dispatch(resetGuess());
            dispatch(updateNextRow());
            if (currentRow > 4) {
                dispatch(setLoseDialog(true))
            }
            setClasses([])

        }
        if (currentGuess.length === 5) return;
        dispatch(addLetterToGuess(letter));
        dispatch(addInputLetter({inputIndex: currentInputId, value: letter}))
        dispatch(moveToNextInput());
    }

    return (
        <main>
            <Header />
            <InputBoard handleInput={addGuessLetter} refs={allRefs}/>
            <Keyboard handleInput={addGuessLetter} refs={allRefs}/>
            <GameDialog isWon={isGameWon} isLost={isGameLost} />
        </main>
    )
}