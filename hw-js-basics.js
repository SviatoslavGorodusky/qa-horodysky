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


const summarizeResults = (results) => {
  let passed = 0;
  let failed = 0;
  let skipped = 0;

  for (const status of results) {
    if (status === 'passed') passed++;
    else if (status === 'failed') failed++;
    else if (status === 'skipped') skipped++;
  }

  const executed = passed + failed;
  const rawPassRate = executed === 0 ? 0 : (passed / executed) * 100;
  const passRate = Number(rawPassRate.toFixed(2));

  return { passed, failed, skipped, passRate };
};

// 1. Базовий сценарій з умови
const res1 = summarizeResults(['passed', 'failed', 'skipped', 'passed']);
console.assert(res1.passed === 2, 'Тест 1 провалено: passed має бути 2');
console.assert(res1.failed === 1, 'Тест 1 провалено: failed має бути 1');
console.assert(res1.skipped === 1, 'Тест 1 провалено: skipped має бути 1');
console.assert(res1.passRate === 66.67, 'Тест 1 провалено: passRate має бути 66.67');

// 2. Порожній масив (захист від ділення на нуль)
const resEmpty = summarizeResults([]);
console.assert(
  resEmpty.passed === 0 &&
  resEmpty.failed === 0 &&
  resEmpty.skipped === 0 &&
  resEmpty.passRate === 0,
  'Тест 2 провалено: для порожнього масиву всі показники мають бути 0'
);

// 3. Усі тести skipped (виконаних 0, захист від ділення на нуль)
const resAllSkipped = summarizeResults(['skipped', 'skipped']);
console.assert(
  resAllSkipped.skipped === 2 && resAllSkipped.passRate === 0,
  'Тест 3 провалено: коли всі skipped, passRate має бути 0'
);

// 4. Усі тести passed (100% успішності)
const resAllPassed = summarizeResults(['passed', 'passed']);
console.assert(
  resAllPassed.passRate === 100,
  'Тест 4 провалено: passRate має бути 100'
);

console.log('Усі перевірки console.assert виконано успішно!');