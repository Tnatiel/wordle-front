import { useInputRef } from "../custom-hooks/useInputRefs";
import { Header } from "../wordle-components/Header";
import { InputBoard } from "../wordle-components/InputBoard";
import { Keyboard } from "../wordle-components/Keyboard";
import { BoardsContext } from "../providors/boardslogic-context";

export function WordleApp() {
    const inputsRefs = useInputRef();

    return (
        <main>
            <Header />
            <BoardsContext.Provider value={inputsRefs}> 
                <InputBoard />
                <Keyboard  />
            </BoardsContext.Provider>
        </main>
    )
}