
import { addInputClasses, addKeyboardButtonsClasses, addLetterAndMoveForword, addToGuessedLetterBank, checkGuess, findInputObjById } from "./wordle-logic";
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
            const mockRows = [
                [{ id: 0, value: '', className: '', rowNumber: 0 }],
                [{ id: 1, value: '', className: '', rowNumber: 1 }],
                [{ id: 2, value: '', className: '', rowNumber: 2 }],
                [{ id: 3, value: '', className: '', rowNumber: 3 }],
                [{ id: 4, value: '', className: '', rowNumber: 4 }],
            ];
        
            it('should find matching InputBox object', () => {
                const inputObj = findInputObjById(mockRows, 0);
                expect(inputObj).toEqual({ id: 0, value: '', className: '', rowNumber: 0 })
            });
            it('shouldn\'t find matching InputBox object, input id don\'t exist in rows', () => {
                const inputObj = findInputObjById(mockRows, 10);
                expect(inputObj).toEqual(undefined)
            });
            it('shouldn\'t find matching InputBox object, input id negative', () => {
                const inputObj = findInputObjById(mockRows, -1);
                expect(inputObj).toEqual(undefined)
            });
        });
    });

});










