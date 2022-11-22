const deepEquals = (valueOne, valueTwo) => {
    // High level value checks
  const keysOne = Object.keys(valueOne);
  const keysTwo = Object.keys(valueTwo);
  if (typeof valueOne !== "object" || typeof valueOne !== "object")
    return false;
  const targetKeys = [
    "name",
    "freeze",
    "styles",
    "merges",
    "rows",
    "validations",
  ];

  for (let idx = 0; idx < targetKeys.length; idx++) {
    if (targetKeys[idx] !== keysOne[idx] || targetKeys[idx] !== keysTwo[idx]) {
      return false;
    }
  }
  return deepEqualsHelper(valueOne, valueTwo);
};

function deepEqualsHelper(valueOne, valueTwo) {
  // Basic Check
  if (typeof valueOne !== typeof valueTwo) return false;

  // NaN Check
  if (typeof valueOne !== "object") {
    if (Number.isNaN(valueOne) && Number.isNaN(valueTwo)) return true;
    return valueOne === valueTwo;
  }

  // Null Checks
  if (valueOne === null || valueTwo === null) return valueOne === valueTwo;

  // This handles the case where both values point to the same object.
  if (valueOne === valueTwo) return true;

  // Arrays Check
  if (Array.isArray(valueOne) && Array.isArray(valueTwo)) {
    if (valueOne.length !== valueTwo.length) return false;
    for (let i = 0; i < valueOne.length; i++) {
      if (!deepEqualsHelper(valueOne[i], valueTwo[i])) return false;
    }
    return true;
  }

  if (Array.isArray(valueOne) || Array.isArray(valueTwo)) return false;

  // Objects Check
  const valueOneKeys = Object.keys(valueOne);
  const valueTwoKeys = Object.keys(valueTwo);

  if (valueOneKeys.length !== valueTwoKeys.length) return false;

  for (const key of valueOneKeys) {
    if (!valueTwo.hasOwnProperty(key)) return false;
    if (!deepEqualsHelper(valueOne[key], valueTwo[key])) return false;
  }
  return true;
}

exports.deepEquals = deepEquals;
exports.deepEqualsHelper = deepEqualsHelper;
