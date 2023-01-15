import { Header } from "../wordle-components/Header";
import { InputBoard } from "../wordle-components/InputBoard";
import { Keyboard } from "../wordle-components/Keyboard";
import { useKeyboard } from "../custom-hooks/useKeyboard";
import { BoardsContext } from "../providors/boardslogic-context";
import { useInputRow } from "../custom-hooks/useInputRow";
import { useInputBoard } from "../custom-hooks/useInputBoard";



export function WordleApp() {

    const keyboardApi = useKeyboard();
    const inputRowApi = useInputRow();
    const inputBoardApi = useInputBoard();
    const wordleApi = {...keyboardApi, ...inputRowApi, ...inputBoardApi, };

    const firstInput = 0
    // console.log(a)
    
    return (
        <main>
            <Header />
            <BoardsContext.Provider value={wordleApi}> 
                <InputBoard initialInput={firstInput}/>
                <Keyboard initialInput={firstInput} />
            </BoardsContext.Provider>
        </main>
    )
}