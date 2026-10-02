const fizzBuzz = (n) => {
  const result = [];

  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      result.push('FizzBuzz');
    } else if (i % 3 === 0) {
      result.push('Fizz');
    } else if (i % 5 === 0) {
      result.push('Buzz');
    } else {
      result.push(`${i}`);
    }
  }

  return result;
};

const res15 = fizzBuzz(15);
console.log(res15);

console.assert(res15.length === 15, 'Довжина має бути 15');
console.assert(res15[2] === 'Fizz', 'Індекс 2 має бути Fizz');
console.assert(res15[4] === 'Buzz', 'Індекс 4 має бути Buzz');
console.assert(res15[14] === 'FizzBuzz', 'Індекс 14 має бути FizzBuzz');

const res0 = fizzBuzz(0);
console.assert(res0.length === 0, 'Для 0 має бути порожній масив');

const res5 = fizzBuzz(5);
console.log(res5);
console.assert(res5.length === 5, 'Довжина має бути 5');
console.assert(typeof res5[0] === 'string', 'Елемент має бути рядком');