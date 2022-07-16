module.exports = function check(str, bracketsConfig) {

  let stack = [];
  let temp = bracketsConfig.flat();
  let openBracket = temp.filter((a, b) => !(b % 2));

  let config = {};

  for (let i = 0; i < temp.length; i += 2) {
    let key = temp[i + 1];
    let value = temp[i];
    config[key] = value;
  }

  for (let i = 0; i < str.length; i++) {
    let symbol = str[i];
    if (openBracket.includes(symbol)) {
      stack.push(symbol);
      if (stack[stack.length - 1] === '|' || stack[stack.length - 1] === '7' || stack[stack.length - 1] === '8') {
        if (stack[stack.length - 1] === stack[stack.length - 2]) {
          stack.splice(stack.length - 2, 2)
        }
      }
    } else {
      if (stack.length === 0) {
        return false;
      }
      let topSymbol = stack[stack.length - 1];
      if (config[symbol] === topSymbol) {
        stack.pop();
      } else { return false }
    }
  }

  return stack.length === 0;
}
