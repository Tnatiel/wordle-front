import { expect } from "chai";
import { beforeEach, describe } from "mocha"



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
            const mockDispatch = (action: any) => {
                inputs[action.id].classname = action.className;
            };

            expect(inputs[0].classname).equals('correct');
            expect(inputs[1].classname).equals('present');
            expect(inputs[2].classname).equals('wrong');
            expect(inputs[3].classname).equals('correct');
            expect(inputs[4].classname).equals('correct');

        });



    });
})