import SignInModal from "main-components/SignInModal"
import { Provider } from "react-redux"
import { initializeTests } from "wordle-components/cy-tests/keyboard.spec.cy"
import { KeyboardRow } from "wordle-components/KeyboardRow"





describe('SignInModal', () => {
    describe('should render component', () => {

        beforeEach(() => {
            let show = true;
            const handleClose = () => show = false;
            const handleSubmit = cy.stub();
            const {mockStore, formRef} = initializeTests();
            
            cy.mount(
                <Provider store={mockStore} >
                        <SignInModal 
                        closeSignInModal={handleClose} 
                        formRef={formRef} 
                        handleSubmit={handleSubmit} 
                        showSignIn={show}
                        />
                    </Provider>
                )
        });
        it('should render header', () => {
            cy.get('.modal-title.h4')
            .should('have.text', 'Sign In');
        });
    });
});