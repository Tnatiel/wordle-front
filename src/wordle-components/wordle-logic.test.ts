
import { addInputClasses, addKeyboardButtonsClasses, addLetterAndMoveForword, addToGuessedLetterBank, checkGuess, findInputObjById, findKeyButtonObjById, handleKeypress, shouldNotKeepFocus } from "./wordle-logic";
import configureMockStore from 'redux-mock-store';



describe('wordle-logic', () => {

    describe('dispatch functions', () => {
        let mockDispatch: jest.Mock;
        let mockStore: any;
        beforeEach(() => {
          mockDispatch = jest.fn();
          mockStore = configureMockStore();
          
        });
    
        describe("addInputClasses", () => {
        
          it("should call dispatch with the correct arguments and update the state correctly", () => {
    
            
            const classes = ["correct", "present", "wrong", "correct", "correct"];
            addInputClasses(mockDispatch, 5, classes);
        
            expect(mockDispatch).toHaveBeenCalledTimes(5);
            expect(mockDispatch).toHaveBeenCalledWith({ type: "inputs/updateInputClassName", payload: { id: 0, className: "correct" } });
            expect(mockDispatch).toHaveBeenCalledWith({ type: "inputs/updateInputClassName", payload: { id: 1, className: "present" } });
            expect(mockDispatch).toHaveBeenCalledWith({ type: "inputs/updateInputClassName", payload: { id: 2, className: "wrong" } });
            expect(mockDispatch).toHaveBeenCalledWith({ type: "inputs/updateInputClassName", payload: { id: 3, className: "correct" } });
            expect(mockDispatch).toHaveBeenCalledWith({ type: "inputs/updateInputClassName", payload: { id: 4, className: "correct" } });
            
    
          });
        });
        
        describe('checkGuess', () => {
            
            it('should dispatch win actions', () => {
            
              checkGuess(['T','E','S','T','A'], 'testa', 0, mockDispatch);
            
              expect(mockDispatch).toHaveBeenCalledTimes(2);
              expect(mockDispatch).toBeCalledWith({type: 'dialog/setWinDialog', payload: true});
              expect(mockDispatch).toBeCalledWith({type: 'game/setWin', payload: true});
            });
            it('should dispatch setLoseDialog', () => {
            
              checkGuess(['T','E','S','T','A'], 'testb', 5, mockDispatch);
            
              expect(mockDispatch).toHaveBeenCalledTimes(1);
              expect(mockDispatch).toBeCalledWith({type: 'dialog/setLoseDialog', payload: true});
            });
        });
    
        describe('addKeyboardButtonClasses', () => {
    
            it('should dispath all class status adders', () => {
                const classesObj = {correct:['a','b'], present:['c', 'd'], wrong: ['e']}
                addKeyboardButtonsClasses(classesObj, mockDispatch);
                expect(mockDispatch).toHaveBeenCalledTimes(3);
                expect(mockDispatch).toBeCalledWith({type: 'keyboard/setWrongClass', payload: ['e']});
                expect(mockDispatch).toBeCalledWith({type: 'keyboard/setPresentClass', payload: ['c', 'd']});
                expect(mockDispatch).toBeCalledWith({type: 'keyboard/setCorrectClass', payload: ['a','b']});
            });
            it('should dispath 2 class status adders', () => {
                const classesObj = {correct:['a','b'], present:['c', 'd'], wrong: []}
                addKeyboardButtonsClasses(classesObj, mockDispatch);
                expect(mockDispatch).toHaveBeenCalledTimes(2);
                expect(mockDispatch).toBeCalledWith({type: 'keyboard/setPresentClass', payload: ['c', 'd']});
                expect(mockDispatch).toBeCalledWith({type: 'keyboard/setCorrectClass', payload: ['a','b']});
            });
            it('should dispath 1 class status adders', () => {
                const classesObj = {correct:['a','b'], present:[], wrong: []}
                addKeyboardButtonsClasses(classesObj, mockDispatch);
                expect(mockDispatch).toHaveBeenCalledTimes(1);
                expect(mockDispatch).toBeCalledWith({type: 'keyboard/setCorrectClass', payload: ['a','b']});
            });
            it('shouldn\'t dispatch. no classes provided', () => {
                const classesObj = {correct:[], present:[], wrong: []}
                addKeyboardButtonsClasses(classesObj, mockDispatch);
                expect(mockDispatch).toHaveBeenCalledTimes(0);
            });
        });
    
        describe('addToGuessedLetterBank', () => {
    
            it('should add letter to the correct bank', () => {
                addToGuessedLetterBank('A', 'aaaaa', 0 ,mockDispatch);
                expect(mockDispatch).toHaveBeenCalledTimes(1);
                expect(mockDispatch).toBeCalledWith({type: 'lettersBank/addCorrectLetter', payload: 'A'});
            });
            it('should add letter to the present bank', () => {
                addToGuessedLetterBank('A', 'bbbaa', 0 ,mockDispatch);
                expect(mockDispatch).toHaveBeenCalledTimes(1);
                expect(mockDispatch).toBeCalledWith({type: 'lettersBank/addPresentLetter', payload: 'A'});
    
            });
            it('should add letter to the wrong bank', () => {
                addToGuessedLetterBank('Z', 'bbbaa', 0 ,mockDispatch);
                expect(mockDispatch).toHaveBeenCalledTimes(1);
                expect(mockDispatch).toBeCalledWith({type: 'lettersBank/addWrongLetter', payload: 'Z'});
    
            });
        });
    
        describe('addLetterAndMoveForword', () => {
    
            it('should dispatch move forword actions', () => {
                addLetterAndMoveForword(mockDispatch, 'A', 'arbib', 0, addToGuessedLetterBank);
                expect(mockDispatch).toHaveBeenCalledTimes(4);
                expect(mockDispatch).toBeCalledWith({type: 'lettersBank/addGussedLetter', payload: 'A'});
                expect(mockDispatch).toBeCalledWith({type: 'inputs/addInputLetter', payload: {inputIndex: 0, value: 'A'}});
                expect(mockDispatch).toBeCalledWith({type: 'inputs/moveToNextInput', payload: undefined});
            });
        });
    });

    describe('regular functions', () => {

        describe('findInputObjById', () => {
            const mockInputRows = [
                [{ id: 0, value: '', className: '', rowNumber: 0 }],
                [{ id: 1, value: '', className: '', rowNumber: 1 }],
                [{ id: 2, value: '', className: '', rowNumber: 2 }],
                [{ id: 3, value: '', className: '', rowNumber: 3 }],
                [{ id: 4, value: '', className: '', rowNumber: 4 }],
            ];
        
            it('should find matching InputBox object', () => {
                const inputObj = findInputObjById(mockInputRows, 0);
                expect(inputObj).toEqual({ id: 0, value: '', className: '', rowNumber: 0 })
            });
            it('shouldn\'t find matching InputBox object, input id don\'t exist in rows', () => {
                const inputObj = findInputObjById(mockInputRows, 10);
                expect(inputObj).toEqual(undefined)
            });
            it('shouldn\'t find matching InputBox object, input id negative', () => {
                const inputObj = findInputObjById(mockInputRows, -1);
                expect(inputObj).toEqual(undefined)
            });
        });

        describe('findKeyboardButtonObjById', () => {
            const mockKeyboardRows = [
                [{id: 'A', className: ''}],
                [{id: 'B', className: ''}],
                [{id: 'C', className: ''}],
            ];
        
            it('should find matching KeyboardButton object', () => {
                const keyButtonObj = findKeyButtonObjById(mockKeyboardRows, 'A');
                expect(keyButtonObj).toEqual({id: 'A', className: ''})
            });
            it('shouldn\'t find matching KeyboardButton object, input id don\'t exist in rows', () => {
                const keyButtonObj = findKeyButtonObjById(mockKeyboardRows, 'Z');
                expect(keyButtonObj).toEqual(undefined)
            });
            
        });

        describe('shouldNotKeepFocus', () => {

            it('should return true, game is won', () => {
                const shouldFocus = shouldNotKeepFocus(
                    { id: 0, value: '', className: '', rowNumber: 0 }, 
                    true, [], 0, 0);
                    expect(shouldFocus).toBeTruthy();
            });
            it('should return false, current guess length = 5 & current input % 5 = 0 & input\'s row number = currentRow', () => {
                const shouldFocus = shouldNotKeepFocus(
                    { id: 0, value: '', className: '', rowNumber: 2 }, 
                    false, ['a', 'a', 'a', 'a', 'a'], 10, 2);
                    expect(shouldFocus).toBeFalsy();
            });
            it('should return false, current guess length != 5 & currentInputId % 5 != 0 & input.id = currentInputId', () => {
                const shouldFocus = shouldNotKeepFocus(
                    { id: 3, value: '', className: '', rowNumber: 2 }, 
                    false, ['a', 'a', 'a', 'a'], 3, 2);
                    expect(shouldFocus).toBeFalsy();
            });
            it('should return true, non of the conditions were true', () => {
                const shouldFocus = shouldNotKeepFocus(
                    { id: 13, value: '', className: '', rowNumber: 2 }, 
                    false, ['a', 'a', 'a', 'a'], 3, 2);
                    expect(shouldFocus).toBeTruthy();
            });
        });

        // describe('handleKeypress', () => {
        //     let inputEvent: jest.Mock;
        //     beforeEach(() => {
        //         inputEvent = jest.fn();
        //     });
        //     it('should call inputEvent with the correct letter when a valid key is pressed', () => {
        //         const event = { key: "a" };
        //         handleKeypress(event, inputEvent);
        //         expect(inputEvent).toBeCalledWith("A");
        //     });
        //     it("should call inputEvent with the correct letter when enter key is pressed", () => {
        //         const event = { key: "Enter" };
        //         handleKeypress(event, inputEvent);
        //         expect(inputEvent).toBeCalledWith("Enter");
        //     });
        
        //     it("should call inputEvent with the correct letter when backspace key is pressed", () => {
        //         const event = { key: "Backspace" };
        //         handleKeypress(event, inputEvent);
        //         expect(inputEvent).toBeCalledWith("Del");
        //     });
        
        //     it("should not call inputEvent when an invalid key is pressed", () => {
        //         const event = { key: "123" };
        //         const hk = handleKeypress(event, inputEvent);
        //         expect(inputEvent).not.toBeCalled();
        //         expect(hk).toEqual(undefined);
        //     });
            
        // });

    });

});










