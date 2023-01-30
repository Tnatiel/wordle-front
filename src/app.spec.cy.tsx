import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import App from "App";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { initializeTests } from "wordle-components/cy-tests/keyboard.spec.cy";




describe('App', () => {

    describe(' HomePage on load', () => {
        
        it('should render the welcome user greet', () => {
            
            cy.viewport(550, 750)
            const testData = initializeTests();
            cy.mount(    
        <MemoryRouter>
                <Provider store={testData.mockStore}>
                    <App />
                </Provider>
            </MemoryRouter>
            )
            cy.get('[data-cy="home"]').should('exist')
            .and('have.text', 'Welcome Guest')
        });
    });
    describe('NavBar functionality', () => {
        beforeEach(() => {
            cy.viewport(550, 750)
            const testData = initializeTests();
            cy.mount(    
        <MemoryRouter>
                <Provider store={testData.mockStore}>
                    <App />
                </Provider>
            </MemoryRouter>
            )
        });
        it('should visit wordle component', () => {
            cy.get('a[cy-data="wordle-btn"]').should('exist')
        });
        it('click on wordle button should change page to wordle app', () => {
            cy.get('a[cy-data="wordle-btn"]').click()
            cy.get('main[cy-data="wordle-comp"]').should('exist');
        });
        it('click on home button should change page to home page', () => {
            cy.get('button[cy-data="home-btn"]').click()
            cy.get('.home').first().should('exist');
        });
        it('click on sign in btn should render the modal', () => {
            cy.get('button[cy-data="sign-in-btn"]').click()
            cy.get('div[cy-data="sign-in-modal"]').should('exist');
            cy.get('button[cy-data="sign-in-btn"]').click()
            
        });
        
        it('click on register btn should render the modal', () => {
            cy.get('button[cy-data="reg-btn"]').click()
            cy.get('div[cy-data="reg-modal"]').should('exist');
        });
        it('click on instruction btn should render the modal', () => {
            cy.get('button[cy-data="inst-btn"').click()
            cy.get('div[cy-data="inst-modal"]').should('exist');
        });
    });
});