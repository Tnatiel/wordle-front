
import { addInputClasses, checkGuess } from "./wordle-logic";

describe('wordle-logic', () => {
    let mockDispatch: jest.Mock;
    
    beforeEach(() => {
      mockDispatch = jest.fn();
    });

    describe("addInputClasses", () => {
    
      it("should call dispatch with the correct arguments", () => {
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

});










