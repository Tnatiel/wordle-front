import { Provider } from "react-redux";
import { setWinDialog } from "redux/features/DialogState";
import { WinDialog } from "wordle-components/dialog/WinDialog";
import { initializeTests } from "../keyboard.spec.cy";



describe('WinDialog', () => {

    beforeEach(() => {
        mockStore.dispatch(setWinDialog(true))
        cy.mount(
            <Provider store={mockStore} >
                    <WinDialog/>
                 </Provider>
            )
    })
    const {mockStore} = initializeTests()
    it('should render the dialog', () => {
        
    });
    it('modal header should be "You Guessed The Wordle!"', () => {
        cy.get('h3').should('have.text', 'You Guessed The Wordle!')
    });
    it('modal main content should be "🎉 Congrats!! 🎉"', () => {
        
        cy.get('h1').should('have.text', '🎉 Congrats!! 🎉')
    });
    it('should have button with text "Yay!"', () => {
        
        cy.get('button').should('have.text', 'Yay!')
    });
    it('should stop render', () => {
        mockStore.dispatch(setWinDialog(false))
    });
});