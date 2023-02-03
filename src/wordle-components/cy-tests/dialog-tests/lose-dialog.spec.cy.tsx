import { Provider } from "react-redux";
import { setLoseDialog } from "redux/features/DialogState";
import { LoseDialog } from "wordle-components/dialog/LoseDialog";
import { initializeTests } from "../keyboard.spec.cy";



describe('WinDialog', () => {

    const {mockStore} = initializeTests();
    beforeEach(() => {
        mockStore.dispatch(setLoseDialog(true));
        cy.mount(
            <Provider store={mockStore} >
                    <LoseDialog/>
                 </Provider>
            )
    });

    it('modal header should be "TOO BAD.."', () => {
        cy.get('h3').should('have.text', 'TOO BAD..')
    });
    it('modal main content should be " You Missed That one 🤓"', () => {
        
        cy.get('h1').should('have.text', ' You Missed That one 🤓')
    });
    it('should have button with text "Yay!"', () => {
        
        cy.get('button').should('have.text', 'OK')
    });
    it('should stop render', () => {
        mockStore.dispatch(setLoseDialog(false))
    });
});