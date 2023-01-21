


import { addInputClasses } from "./wordle-logic";

describe("addInputClasses", () => {
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockDispatch = jest.fn();
  });

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






