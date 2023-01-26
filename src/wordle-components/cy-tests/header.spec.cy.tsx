import { Header } from "wordle-components/Header"



describe('Wordle Header', () => {

    it('should have text "Wordle"', () => {
        cy.mount(<Header />)
        cy.get('#wordle-header').should('have.descendants', 'h1')
        cy.get('h1').should('have.text', 'Wordle')
    })
})