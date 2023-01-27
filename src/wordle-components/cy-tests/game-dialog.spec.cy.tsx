import { Provider } from "react-redux";
import { setLoseDialog, setWinDialog } from "redux/features/DialogState";
import { GameDialog } from "wordle-components/dialog/GameDialog";
import { initializeTests } from "./keyboard.spec.cy";





describe('WinDialog', () => {

    it('shouldn\'t render any component', () => {
        
        const {mockStore} = initializeTests();
        cy.mount(
        <Provider store={mockStore}>
            <GameDialog isLost={false} isWon={true}/>
            </Provider>)
    })
   
    it('should render win dialog', () => {
        const {mockStore} = initializeTests();
        mockStore.dispatch(setWinDialog(true))
        cy.mount(
            <Provider store={mockStore}>
            <GameDialog isLost={false} isWon={true}/>
            </Provider>
            )
    })
    it('should render lose dialog', () => {
        const {mockStore} = initializeTests();
        mockStore.dispatch(setLoseDialog(true))
        cy.mount(
            <Provider store={mockStore}>
            <GameDialog isLost={true} isWon={false}/>
            </Provider>
            )
    });

});

