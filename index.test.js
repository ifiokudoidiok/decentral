const chai = require("chai");
const { expect } = chai;

const { deepEquals, deepEqualsHelper } = require("./index");

describe("Test deepEquals following system requirements:", () => {
  describe("True Positives Tests:", () => {
    test("Test for target structure", () => {
      const input = {
        name: "",
        freeze: "",
        styles: [],
        merges: [],
        rows: {},
        validations: [],
      };
      const target = {
        name: "",
        freeze: "",
        styles: [],
        merges: [],
        rows: {},
        validations: [],
      };
      const result = deepEquals(input, target);
      expect(result).to.be.true;
    });

    test("Test for Simple input/target", () => {
      const input = {
        name: "sheet2",
        freeze: "A1",
        styles: [
          {
            format: "percentNoDecimal",
            bgcolor: "#c45a10",
          },
        ],
        merges: [],
        rows: {
          0: {
            cells: {
              0: {
                text: "",
              },
              1: {
                text: "Common Stock",
                style: 17,
              },
              2: {
                text: "Preferred Stock",
                style: 17,
              },
            },
          },
        },
        validations: [],
      };
      const target = {
        name: "sheet2",
        freeze: "A1",
        styles: [
          {
            format: "percentNoDecimal",
            bgcolor: "#c45a10",
          },
        ],
        merges: [],
        rows: {
          0: {
            cells: {
              0: {
                text: "",
              },
              1: {
                text: "Common Stock",
                style: 17,
              },
              2: {
                text: "Preferred Stock",
                style: 17,
              },
            },
          },
        },
        validations: [],
      };
      const result = deepEquals(input, target);
      expect(result).to.be.true;
    });
  });

  describe("False Positives Tests:", () => {
    test("Test for empty Objects", () => {
      const input = {};
      const target = {};
      const result = deepEquals(input, target);
      expect(result).to.be.false;
    });

    test("Test for input as String", () => {
      const input = "This is a string, not an object. This won't work!";
      const target = {
        name: "sheet2",
        freeze: "A1",
        styles: [],
        merges: [],
        rows: {},
        validations: [],
      };
      const result = deepEquals(input, target);
      expect(result).to.be.false;
    });

    test("Test for input as Number", () => {
      const input = 100;
      const target = {
        name: "sheet2",
        freeze: "A1",
        styles: [],
        merges: [],
        rows: {},
        validations: [],
      };
      const result = deepEquals(input, target);
      expect(result).to.be.false;
    });

    test("Test for input missing Object key", () => {
      const input = {
        name: "sheet2",
        freeze: "A1",
        styles: [],
        merges: [],
        rows: {},
      };
      const target = {
        name: "sheet2",
        freeze: "A1",
        styles: [],
        merges: [],
        rows: {},
        validations: [],
      };
      const result = deepEquals(input, target);
      expect(result).to.be.false;
    });
  });
});

describe("Test deepEqualsHelper utility function", () => {
  describe("Same Primitive types", () => {
    it("numbers", () => {
      expect(deepEqualsHelper(1, 1)).to.be.true;
      expect(deepEqualsHelper(15, 15)).to.be.true;
      expect(deepEqualsHelper(0, 1)).to.be.false;
      expect(deepEqualsHelper(1, 0)).to.be.false;
      expect(deepEqualsHelper(1, 10)).to.be.false;
      expect(deepEqualsHelper(10, 1)).to.be.false;
    });

    it("numbers, including NaN", () => {
      expect(deepEqualsHelper(NaN, NaN)).to.be.true;
      expect(deepEqualsHelper(NaN, 0)).to.be.false;
      expect(deepEqualsHelper(0, NaN)).to.be.false;
    });

    it("strings", () => {
      expect(deepEqualsHelper("", "")).to.be.true;
      expect(deepEqualsHelper("a", "a")).to.be.true;
      expect(deepEqualsHelper("abc", "abc")).to.be.true;
      expect(deepEqualsHelper("", "a")).to.be.false;
      expect(deepEqualsHelper("a", "")).to.be.false;
      expect(deepEqualsHelper("a", "b")).to.be.false;
      expect(deepEqualsHelper("hello", "world")).to.be.false;
      expect(deepEqualsHelper("ab", "abc")).to.be.false;
      expect(deepEqualsHelper("abc", "ab")).to.be.false;
    });
    it("booleans", () => {
      expect(deepEqualsHelper(true, true)).to.be.true;
      expect(deepEqualsHelper(false, false)).to.be.true;
      expect(deepEqualsHelper(true, false)).to.be.false;
      expect(deepEqualsHelper(false, true)).to.be.false;
    });
    it("null", () => {
      expect(deepEqualsHelper(null, null)).to.be.true;
    });
    it("undefined", () => {
      expect(deepEqualsHelper(undefined, undefined)).to.be.true;
    });

    it("bigints", () => {
      expect(deepEqualsHelper(1n, 1n)).to.be.true;
      expect(deepEqualsHelper(15n, 15n)).to.be.true;
      expect(deepEqualsHelper(9007199254740991n, 9007199254740991n)).to.be.true;
      expect(deepEqualsHelper(1n, 15n)).to.be.false;
      expect(deepEqualsHelper(15n, 1n)).to.be.false;
      expect(deepEqualsHelper(9007199254740991n, 9007199254740992n)).to.be
        .false;
    });

    it("symbols", () => {
      const symbol1 = Symbol("1");
      const symbol2 = Symbol("2");
      expect(deepEqualsHelper(symbol1, symbol1)).to.be.true;
      expect(deepEqualsHelper(symbol2, symbol2)).to.be.true;
      expect(deepEqualsHelper(symbol1, symbol2)).to.be.false;
      expect(deepEqualsHelper(symbol2, symbol1)).to.be.false;
    });
  });
  describe("Different Primitive types", () => {
    it("always returns false", () => {
      expect(deepEqualsHelper(1, "1")).to.be.false;
      expect(deepEqualsHelper("1", 1)).to.be.false;
      expect(deepEqualsHelper(1, 1n)).to.be.false;
      expect(deepEqualsHelper(1n, 1)).to.be.false;
      expect(deepEqualsHelper(1, true)).to.be.false;
    });
  });

  describe("Other types: Arrays, Objects, etc:", () => {
    it("with no values are equal", () => {
      expect(deepEqualsHelper([], [])).to.be.true;
    });

    it("with the same primitive values are equal", () => {
      expect(deepEqualsHelper([1], [1])).to.be.true;
      expect(deepEqualsHelper([0, 1, 2], [0, 1, 2])).to.be.true;
      expect(deepEqualsHelper([0, "abc", 2], [0, "abc", 2])).to.be.true;
    });
    it("with different primitive values are not equal", () => {
      expect(deepEqualsHelper([0], [1])).to.be.false;
      expect(deepEqualsHelper([0, 1, 2], [4, 5, 6])).to.be.false;
    });
    it("with different lengths are not equal", () => {
      expect(deepEqualsHelper([], [1, 3, 4])).to.be.false;
      expect(deepEqualsHelper([1], [])).to.be.false;
    });
  });
  expect(deepEqualsHelper([[1]], [[1]])).to.be.true;
  expect(deepEqualsHelper([[1], [2]], [[1], [2]])).to.be.true;
  expect(deepEqualsHelper({ a: {} }, { a: false })).to.be.false;
  expect(deepEqualsHelper({ a: false }, { a: {} })).to.be.false;
  expect(deepEqualsHelper([{}], [{}])).to.be.true;
  expect(deepEqualsHelper([{}, {}, []], [{}, {}, []])).to.be.true;
  expect(deepEqualsHelper(null, {})).to.be.false;
  expect(deepEqualsHelper({}, null)).to.be.false;
  expect(deepEqualsHelper(undefined, {})).to.be.false;
  expect(
    deepEqualsHelper(
      [{ a: true, b: {} }, {}, [1, "2", null, true, { c: "abc" }, 0]],
      [{ a: true, b: {} }, {}, [1, 2, null, true, { c: "abc" }, 0]]
    )
  ).to.be.false;
});
