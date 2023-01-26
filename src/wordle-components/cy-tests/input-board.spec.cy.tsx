import { InputBoard } from "../InputBoard"
import React from 'react';
// import configuremockStore from 'redux-mock-store'
import { addInputLetter, createInputs, moveBackInput, moveToNextInput, removeLastInputLetter } from "redux/features/InputState";
import { Provider } from "react-redux";
import { AppDispatch } from "redux/app/store";
import { mount } from 'cypress/react18';
import { addLetterToGuess, removeLastGussedLetter, resetGuess } from "redux/features/LettersBankState";
import { expect } from "chai";

import { configureStore,  } from '@reduxjs/toolkit';
import letterReducer from '../../redux/features/LettersBankState';
import InputReducer from '../../redux/features/InputState';
import gameReducer from '../../redux/features/GameState';
import keyboardReducer from '../../redux/features/KeyboardState';
import dialogReducer from '../../redux/features/DialogState';
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";


describe('InputBoard', () => {

    
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

    const moveForword = (dispatcher: AppDispatch, letter: string, currentInputId: number) => {
        dispatcher(addLetterToGuess(letter));
        dispatcher(addInputLetter({inputIndex: currentInputId, value: letter}))
        dispatcher(moveToNextInput());
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
                    <InputBoard refs={refs} handleInput={handleInput} />
                    </Provider>
            )
    })

    it('should render 30 input elements', () => {
        cy.get('.ur-input').should('have.length', 30)
    });
    
    it('should add value and pass focus to next input', () => {
        moveForword(mockStore.dispatch, 'a', 0)
        cy.get('#0').should('have.value', 'a')
        cy.get('#1').should('have.focus')
        const firstInput = mockStore.getState().inputs.rows[0][0].value
        expect(firstInput).equals('a');
    });
    it('should reset guess', () => {
        moveForword(mockStore.dispatch, 'q', 0)
        moveForword(mockStore.dispatch, 's', 1)
        moveForword(mockStore.dispatch, 'x', 2)
        mockStore.dispatch(resetGuess())
        cy.get('#0').should('have.value', 'q')
        cy.get('#1').should('have.value', 's')
        cy.get('#2').should('have.value', 'x')
    })

    describe('should move input focus on input move forward or backwards', () => {
        it('should move input focus on next input', () => {
            
            mockStore.dispatch(moveToNextInput());
            cy.get('#1').should('have.focus');
            
        })
        it('should move input focus to last input', () => {
            mockStore.dispatch(moveToNextInput());
            mockStore.dispatch(moveToNextInput());
            mockStore.dispatch(moveBackInput());
            mockStore.dispatch(moveBackInput());
            cy.get('#0').should('have.focus');

        })
    })

    
    // it('should render input rows', () => {
    //     cy.get('.ur-input').should('have.length', 30)
    // })
})