import NavBar from "main-components/NavBar";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { initializeTests } from "wordle-components/cy-tests/keyboard.spec.cy";





describe('NavBar', () => {

    describe('should render NavBar with sign in button', () => {
        // beforeEach(() => {
        //     let showSign = false;
        //     let showInst = false;
        //     localStorage.clear()
        //     const logout = () => localStorage.clear();
        //     const openSign = () => showSign = !showSign;
        //     const openInst = () => showInst = !showInst;
        //     const {mockStore} = initializeTests();
        //     cy.mount(
        //         <MemoryRouter>
        //     <Provider store={mockStore}>
        //             <NavBar 
        //             handleLogout={logout} 
        //             openInstructionsModal={openInst}
        //             openSignInModal={openSign}
        //             />
        //         </Provider>
        //         </MemoryRouter>
                
        //         )
        // });
        // it('should render wordle link', () => {
        //     cy.get('.navbar-brand').should('exist').first()
        //     .and('have.text', 'Wordle');
        // });
        // it('should render home button', () => {
        //     cy.get('button[cy-data="home-btn"]').should('exist')
        //     .and('have.text', 'Home');
        // });
        // it('should render sign in button', () => {
        //     cy.get('button[cy-data="sign-in-btn"]').should('exist')
        //     .and('have.text', 'Sign in');
        // });
        // it('should render instructions button', () => {
        //     cy.get('button[cy-data="inst-btn"]').should('exist')
        //     .and('have.html', '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path></svg>');
        // });
    });
    it('should render NavBar with logout button', () => {
    //         let showSign = false;
    //         let showInst = false;
    //         localStorage.setItem('name', 'Erick')
    //         const logout = () => localStorage.clear();
    //         const openSign = () => showSign = !showSign;
    //         const openInst = () => showInst = !showInst;
    //         const {mockStore} = initializeTests();
    //         cy.mount(
    //             <MemoryRouter>
    //         <Provider store={mockStore}>
    //                 <NavBar 
    //                 handleLogout={logout} 
    //                 openInstructionsModal={openInst}
    //                 openSignInModal={openSign}
    //                 />
    //             </Provider>
    //             </MemoryRouter>
                
    //             )

    //         cy.get('button[cy-data="sign-out-btn"]').should('exist')
    //         .and('have.text', 'Logout')
    });
});