import { InstructionsModal } from "main-components/InstructionsModal";
import { useState } from "react";
import { Provider } from "react-redux";
import { initializeTests } from "wordle-components/cy-tests/keyboard.spec.cy";



describe('InstructionsModal', () => {
    describe('should render correctly', () => {
        beforeEach(() => {
            let show = true;
            const handleClose = () => show = false;
            const {mockStore} = initializeTests();
            cy.mount(
                <Provider store={mockStore}>
                <InstructionsModal showInstructions={show} closeModal={handleClose} />
                </Provider>
                
                )

        });

        it('should render headers and welcome paragraph', () => {
            cy.get('h1').should('have.text', 'How to Play Wordle')
            cy.get('h4').should('have.text', 'Guess the Word in 6 tries')
            cy.get('p[cy-data="welcome-p"]')
            .should('have.text', 
            `Welcome to Wordle! In this game, your goal is to guess the correct 5-letter word-example in 6 tries. Use the clues provided by the color of the tiles to help you guess correctly. Here's how to play:`)
        });
        it('should render explenation list', () => {
            cy.get('li[cy-data="ins1"]').should('have.text', 'Each guess must be a valid 5-letter word')
            cy.get('li[cy-data="ins2"]').should('have.text', 'The color of the tiles will change to show how close your guess was to the word-example')
            cy.get('p[cy-data="welcome-p"]')
            .should('have.text', 
            `Welcome to Wordle! In this game, your goal is to guess the correct 5-letter word-example in 6 tries. Use the clues provided by the color of the tiles to help you guess correctly. Here's how to play:`)
        });
        it('should show the second example', () => {
            cy.get('div[cy-data="exam2"] .example-ur-input').should('have.length', 5);
            cy.get('div[cy-data="exam2"] .present').should('have.length', 1);
            cy.get('div[cy-data="exam2"] .present').should('have.css', 'background-color','rgb(181, 159, 59)');
        });
        it('should show the third example', () => {
            cy.get('div[cy-data="exam3"] .example-ur-input').should('have.length', 5);
            cy.get('div[cy-data="exam3"] .wrong').should('have.length', 1);
            cy.get('div[cy-data="exam3"] .wrong').should('have.css', 'background-color','rgb(58, 58, 60)');
        });
    describe('unmont component', () => {

        it('should close modal, click on x button', () => {
           
            
            // cy.get('.btn-close').click({force: true});
            // cy.reload() //TODO find a way to stop reload
            // cy.get('.modal').should('not.exist')
            
        });
        it('should hide the modal, show=false', () => {
            let show = false;
            const handleClose = () => show = !show;
            const {mockStore} = initializeTests();
            cy.mount(
                <Provider store={mockStore}>
                <InstructionsModal showInstructions={show} closeModal={handleClose} />
                </Provider>
                )
            cy.get('.modal').should('not.exist')           
        });
    });
    });
});
