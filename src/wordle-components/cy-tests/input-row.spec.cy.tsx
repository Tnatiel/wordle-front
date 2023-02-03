
import { Provider } from 'react-redux';
import { InputRow } from 'wordle-components/InputRow';
import { initializeTests } from './keyboard.spec.cy';


describe('InputRow', () => {
    beforeEach(() => {
        const {mockStore, refs} = initializeTests()
        const handleInput = cy.stub();
        cy.mount(
            <Provider store={mockStore} >
                    <InputRow rowIndex={0} refs={refs} handleInput={handleInput}/>
                </Provider>
            )
    })
    it('should render 30 input elements', () => {
        cy.get('.ur-input').should('have.length', 5)
    });
    it('each input have ID and ur-input className', () => {
        cy.get('.ur-input').should('have.length', 5)
        for (let i = 0; i < 5; i++) {
            cy.get(`#${i}`).should('have.id',`${i}`)
            .and('have.class', 'ur-input')
            
        }
    });
    it('each input should have a value attr', () => {
        for (let i = 0; i < 5; i++) {
            cy.get(`#${i}`).should('have.attr', 'value')
        }
    });
    it('each input should have a maxlength attr', () => {
        for (let i = 0; i < 5; i++) {
            cy.get(`#${i}`).should('have.attr', 'maxlength')
        }
    });
    it('each input should have a readOnly attr', () => {
        for (let i = 0; i < 5; i++) {
            cy.get(`#${i}`).should('have.attr', 'readonly')
        }
    });
    
});