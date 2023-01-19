import { expect } from "chai";
import { store } from "../redux/app/store";
import { addInputClasses } from "./wordle-logic";
import   'esm';

describe('addInputClasses', () => {

    
    it('should add the input row classes', () => {

        it('should add class name to each input', () => {
            const inputs = [
                {id: 0, value: 'a', classname: '', rowNumber:0},
                {id: 1, value: 'a', classname: '', rowNumber:0},
                {id: 2, value: 'a', classname: '', rowNumber:0},
                {id: 3, value: 'a', classname: '', rowNumber:0},
                {id: 4, value: 'a', classname: '', rowNumber:0}
            ]
            
            const classes = ['correct', 'present', 'wrong', 'correct', 'correct'];
            const mockDispatch = store.dispatch;

            addInputClasses(mockDispatch, 0, classes)

            expect(inputs[0].classname).equals('correct');
            expect(inputs[1].classname).equals('present');
            expect(inputs[2].classname).equals('wrong');
            expect(inputs[3].classname).equals('correct');
            expect(inputs[4].classname).equals('correct');

        });

    });
    it('should overwrite exising classe', () => {
        it('all classnames suppose to be correct', () => {
            const inputs = [
                {id: 0, value: 'a', classname: 'wrong', rowNumber:0},
                {id: 1, value: 'a', classname: 'wrong', rowNumber:0},
                {id: 2, value: 'a', classname: 'present', rowNumber:0},
                {id: 3, value: 'a', classname: 'present', rowNumber:0},
                {id: 4, value: 'a', classname: 'present', rowNumber:0}
            ]
            
            const classes = ['correct', 'correct', 'correct', 'correct', 'correct'];
            const mockDispatch = store.dispatch;
    
            addInputClasses(mockDispatch, 0, classes)
    
            expect(inputs[0].classname).equals('correct');
            expect(inputs[1].classname).equals('correct');
            expect(inputs[2].classname).equals('correct');
            expect(inputs[3].classname).equals('correct');
            expect(inputs[4].classname).equals('correct');
        });

    });
});

