import { mount } from 'cypress/react18';
import { configureStore,  } from '@reduxjs/toolkit';
import letterReducer from '../../redux/features/LettersBankState';
import InputReducer from '../../redux/features/InputState';
import gameReducer from '../../redux/features/GameState';
import keyboardReducer from '../../redux/features/KeyboardState';
import dialogReducer from '../../redux/features/DialogState';
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { Provider } from 'react-redux';
import React from 'react';
import { InputRow } from 'wordle-components/InputRow';


describe('InputRow', () => {
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
    let mockStore: ToolkitStore;
    beforeEach(() => {
        mockStore = configureStore( {
            reducer: { 
                lettersBank: letterReducer,
                inputs: InputReducer,
                game: gameReducer,
                keyboard: keyboardReducer,
                dialog: dialogReducer,
                    },
                });
            const handleInput = cy.stub();
    
            mount(
                <Provider store={mockStore} >
                        <InputRow refs={refs}  rowIndex={0} handleInput={handleInput}/>
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
    // it('each input should have a disabled property', () => {
    //     for (let i = 0; i < 5; i++) {
    //         cy.get(`#${i}`).should('have.property', 'disabled')
    //     }
    // });
    
    // it('each input should have a ref property', () => {
    //     for (let i = 0; i < 5; i++) {
    //         cy.get(`#${i}`).should('have.prop', 'ref');
    //     }
    // });
});