const operations = require('./operations');

const params = process.argv.slice(2);

const currentOperationIndex = params.findIndex(item => item.startsWith('--'));

const [currentOperation] = params.splice(currentOperationIndex,1).map(e => e.substring(2));

const operands = params.map(e => Number(e));

let func = operations[currentOperation]

console.log(func(...operands));