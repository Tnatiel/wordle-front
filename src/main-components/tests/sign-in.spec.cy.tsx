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
        it('should render name input label', () => {
            cy.get('#label1')
            .should('have.text', 'Name');
        });
        it('should render name input', () => {
            cy.get('input[name="name"]')
            .should('exist')
            .and('have.attr', 'placeholder', 'Enter name')
            cy.get('small.text-muted.form-text').first()
            .should('have.text', "We'll never share your name with anyone else.")
        });
        it('should render Email input label', () => {
            cy.get('#label2')
            .should('have.text', 'Email address');
        });
        it('should render Email input', () => {
            cy.get('input[name="email"]')
            .should('exist')
            .and('have.attr', 'placeholder', 'Enter email')
            cy.get('small.text-muted.form-text').last()
            .should('have.text', "We'll never share your email with anyone else.")
        });
        it('click on sign in button should close modal', () => {
            cy.get('.btn.btn-primary').click();
            cy.reload();
            cy.get('.fade.modal-backdrop')
            .should('not.exist');
        });
    });
});