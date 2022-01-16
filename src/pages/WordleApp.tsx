import { useKeyboardRefs } from "../custom-hooks/useKeyboardRefs";
import { useInputRef } from "../custom-hooks/useInputRefs";
import { Header } from "../wordle-components/Header";
import { InputBoard } from "../wordle-components/InputBoard";
import { Keyboard } from "../wordle-components/Keyboard";
import {  useAppSelector } from '../redux/app/hooks';
import { GameDialog } from "../wordle-components/dialog/GameDialog";


export function WordleApp() {
    const inputsRefs = useInputRef();
    const keyboardRefs = useKeyboardRefs()
    const allRefs = {inputs: inputsRefs, keyboard: keyboardRefs}
    const isGameWon = useAppSelector(state => state.game.win)
    const isGameLost = useAppSelector(state => state.game.lose)

    return (
        <main>
            <Header />
            <InputBoard refs={allRefs}/>
            <Keyboard  refs={allRefs}/>
            <GameDialog isWon={isGameWon} isLost={isGameLost} />
        </main>
    )
}