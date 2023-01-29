import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { expect } from "chai";
import { Provider } from "react-redux";
import { initializeTests } from "wordle-components/cy-tests/keyboard.spec.cy";
import { WordleApp } from "./WordleApp";



describe('WordleApp', () => {

    describe('should render all components', () => {

        beforeEach(() => {
            cy.viewport(550, 750)
            const {mockStore} = initializeTests();
            cy.mount(    
        <Provider store={mockStore}>
                <WordleApp />
            </Provider>
            )
        });
        it('should render header', () => {
            cy.get('#wordle-header').should('have.text', 'Wordle')
        });
        it('should render all inputs', () => {
            cy.get('input.ur-input').should('have.length', 30);
        });
        it('should render all keyboard buttons', () => {
            cy.get('button.kbd-btn').should('have.length', 28);
        });
    });

    describe('virtual keyboard functionality', () => {
        let currentMockStore: ToolkitStore;
        beforeEach(() => {
            cy.viewport(550, 750)
            const testData = initializeTests();
            currentMockStore = testData.mockStore;
            cy.mount(    
        <Provider store={testData.mockStore}>
                <WordleApp />
            </Provider>
            )
        });
        it('click on button should fill input box and move focus to next', () => {
            cy.get('#Q').should('exist').click();
            cy.get('#0').should('have.value', 'Q');
            cy.get('#1').should('have.focus');
            
            
        });
        it('click on Del button should delete last input letter and move focus back', () => {
            cy.get('#X').should('exist').click();
            cy.get('#0').should('have.value', 'X');
            cy.get('#H').should('exist').click();
            cy.get('#1').should('have.value', 'H');
            cy.get('#Del').should('exist').click();
            cy.get('#1').should('have.value', '');
            cy.focused().should('have.id', '1')
        });
        it('click on a letter button add to last input "letter-animiation" class', () => {
            cy.get('#M').should('exist').click();
            cy.get('#0').should('have.class', 'letter-animation');
        });
        it('click on a Del button remove from last input "letter-animiation" class', () => {
            cy.get('#O').should('exist').click();
            cy.get('#0').should('have.class', 'letter-animation');
            cy.get('#Y').should('exist').click();
            cy.get('#Del').should('exist').click();
            cy.get('#1').should('have.class', 'letter-animation');
            cy.get('.letter-animation').should('have.length', 1);
        });

        it('should not type into input, row is full', () => {
            cy.get('#Y').should('exist').click();
            cy.get('#Y').should('exist').click();
            cy.get('#Y').should('exist').click();
            cy.get('#Y').should('exist').click();
            cy.get('#Y').should('exist').click();
            cy.get('#Y').should('exist').click();
            cy.get('#5').should('have.value', '')
        });

        it('should check row and move to next row', () => {
            cy.get('#Y').should('exist').click();
            cy.get('#Y').should('exist').click();
            cy.get('#Y').should('exist').click();
            cy.get('#Y').should('exist').click();
            cy.get('#Y').should('exist').click();
            cy.get('#Enter').should('exist').click();
            cy.focused().should('have.id', 5)
        });

    
    });

});