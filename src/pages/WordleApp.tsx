import { Header } from "../wordle-components/Header";
import { InputBoard } from "../wordle-components/InputBoard";
import { Keyboard } from "../wordle-components/Keyboard";
import { useKeyboard } from "../custom-hooks/useKeyboard";
import { BoardsContext } from "../providors/boardslogic-context";



export function WordleApp() {

    const boardsApi = useKeyboard();

    return (
        <main>
            <Header />
            <BoardsContext.Provider value={boardsApi}> 
                <InputBoard />
                <Keyboard />
            </BoardsContext.Provider>
        </main>
    )
}