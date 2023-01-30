import { HomePage } from "../HomePage";

describe('HomePage', () => {
    it('should have prop text', () => {
        cy.mount(<HomePage greet='ass'/>);
        cy.get('[data-cy="home"]').should('have.text', 'Welcome ass')

    });
});