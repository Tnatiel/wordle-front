import { Provider } from "react-redux";
import { Keyboard } from "wordle-components/Keyboard";
import letterReducer from '../../redux/features/LettersBankState';
import InputReducer from '../../redux/features/InputState';
import gameReducer from '../../redux/features/GameState';
import keyboardReducer from '../../redux/features/KeyboardState';
import dialogReducer from '../../redux/features/DialogState';
import React from "react";
import { configureStore } from "@reduxjs/toolkit";

export const initializeTests = () => {
    const refs = {
        inputs: {},
        keyboard: {
            allKeyboardRefs: {}
        }
    }
    const init = (refs: any ) => {
        for (let i = 0; i < 30; i++) {
            refs.inputs[i] = React.createRef<HTMLInputElement>();
        }

        for (let i = 0; i < 26; i++) {
            refs.keyboard.allKeyboardRefs[i] = React.createRef<HTMLButtonElement>();
        }
      
    }
    init({...refs})
    
    const  mockStore = configureStore( {
            reducer: { 
                lettersBank: letterReducer,
                inputs: InputReducer,
                game: gameReducer,
                keyboard: keyboardReducer,
                dialog: dialogReducer,
                    },
                });

    return {mockStore, refs}
}

describe('Keyboard', () => {
    const {mockStore, refs} = initializeTests()
    beforeEach(() => {
        const handleInput = cy.stub();
        cy.mount(
            <Provider store={mockStore} >
                    <Keyboard refs={refs} handleInput={handleInput}/>
                </Provider>
            )
    })
    it('should render all keyboard buttons', () => {
        cy.get('button.kbd-btn').should('have.length', 28)
    });
    it('should have abc letter, del and enter', () => {
        const letters = [
            ...mockStore.getState().keyboard.rows[0],
            ...mockStore.getState().keyboard.rows[1],
            ...mockStore.getState().keyboard.rows[2],
        ]
        for (let i = 0; i < letters.length; i++) {
            cy.get(`#${letters[i].id}`).should('have.text',`${letters[i].id}`)           
        }
    });
    it('should be button elements', () => {
        const letters = [
            ...mockStore.getState().keyboard.rows[0],
            ...mockStore.getState().keyboard.rows[1],
            ...mockStore.getState().keyboard.rows[2],
        ]
        for (let i = 0; i < letters.length; i++) {
            cy.get('.keyboard').should('include.html','button')           
        }
    });
    
    
});