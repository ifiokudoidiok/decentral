# Test function
- `yarn`
- `yarn test`

## Synopsis
This take-home assignment is all about unit testing.

Testing is an important part of programming. In this assignment, we want you to write a test that can determine if a given
input precisely matches a target model. We will provide you with the target model, which is a simple object in JSON format.
You will also be provided with a number of input data. Your job is to write a test that can tell us when the input matches
the target and when it doesn't.

## Procedure
Reference the given data below and use your preferred testing library to construct a test file.

**Hint:** Test a function that compares inputs to the target. An example being:
```
function compare(input, target) {
  if (input === target) {
    return true
  } else {
    return false
  }
}
```

## Requirements
- The test should successfully pass with each input. 

**Hint:** this means you must tell the test when a mismatch is expected.
- Include a walkthrough video that shows all the unit tests passing and gives a brief overview of how you approached this problem.

## Resources
- **Target Model:** {"name": "sheet2","freeze": "A1","styles": [],"merges": [],"rows": {},"validations": []}
- **Inputs:**
  - **Matching input:** {"name": "sheet2","freeze": "A1","styles": [],"merges": [],"rows": {},"validations": []}
  - **Mismatching inputs:**
    - "This is a string, not an object. This won't work!"
    - 100
    - {"name": "sheet2","freeze": "A1","styles": [],"merges": [],"rows": {}}