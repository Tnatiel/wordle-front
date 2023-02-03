import { Header } from "wordle-components/Header"



describe('Wordle Header', () => {
    
    beforeEach(() => {

        cy.mount(<Header />)
    });
    it('should render the component', () => {
        cy.get('#wordle-header').should('exist')
    });
    it('should have text "Wordle"', () => {
        cy.get('#wordle-header h1').should('have.text', 'Wordle')
    });
});