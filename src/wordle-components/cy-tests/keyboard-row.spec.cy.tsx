import { Provider } from "react-redux";
import { KeyboardRow } from "wordle-components/KeyboardRow";
import { initializeTests } from "./keyboard.spec.cy";




describe('KeyboardRow', () => {

    // beforeEach(() => {
    //     const {mockStore, refs} = initializeTests()
    //     const handleInput = cy.stub();
    //     cy.mount(
    //         <Provider store={mockStore} >
    //                 <KeyboardRow rowIndex={0} refs={refs} handleInput={handleInput}/>
    //             </Provider>
    //         )
    // });

    it('should render row 1 buttons and kbd-btn class', () => {
        const {mockStore, refs} = initializeTests()
        const handleInput = cy.stub();
        cy.mount(
            <Provider store={mockStore} >
                    <KeyboardRow rowIndex={0} refs={refs} handleInput={handleInput}/>
                </Provider>
            )
            const row1 = mockStore.getState().keyboard.rows[0]
            for (let i = 0; i < row1.length; i++) {
                cy.get(`#${row1[i].id}`).should('have.text', `${row1[i].id}`)
                .and('have.class', 'kbd-btn')
            }
    });
    
    it('should render row 2 buttons and kbd-btn class', () => {
        const {mockStore, refs} = initializeTests()
        const handleInput = cy.stub();
        cy.mount(
            <Provider store={mockStore} >
                    <KeyboardRow rowIndex={1} refs={refs} handleInput={handleInput}/>
                </Provider>
            )
            const row2 = mockStore.getState().keyboard.rows[1]
            for (let i = 0; i < row2.length; i++) {
                cy.get(`#${row2[i].id}`).should('have.text', `${row2[i].id}`)
                .and('have.class', 'kbd-btn')
            }
    });
    it('should render row 3 buttons and kbd-btn class', () => {
        const {mockStore, refs} = initializeTests()
        const handleInput = cy.stub();
        cy.mount(
            <Provider store={mockStore} >
                    <KeyboardRow rowIndex={2} refs={refs} handleInput={handleInput}/>
                </Provider>
            )
            const row3 = mockStore.getState().keyboard.rows[2]
            for (let i = 0; i < row3.length; i++) {
                cy.get(`#${row3[i].id}`).should('have.text', `${row3[i].id}`)
                .and('have.class', 'kbd-btn')
            }
    });
});

