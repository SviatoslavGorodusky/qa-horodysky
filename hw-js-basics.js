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

// --- Завдання: retry(fn, maxAttempts) ---

const retry = (fn, maxAttempts = 3) => {
  let attempt = 1;

  while (attempt <= maxAttempts) {
    if (fn() === true) {
      return attempt;
    }
    attempt++;
  }

  return -1;
};

// 1. Тест: fn повертає true з першої спроби -> очікуємо 1
const resImmediateSuccess = retry(() => true);
console.assert(resImmediateSuccess === 1, `Очікували 1, отримали ${resImmediateSuccess}`);

// 2. Тест: fn завжди повертає false -> очікуємо -1, а викликана рівно maxAttempts разів (5 разів)
let callCount5 = 0;
const resAllFails = retry(() => {
  callCount5++;
  return false;
}, 5);
console.assert(resAllFails === -1, `Очікували -1, отримали ${resAllFails}`);
console.assert(callCount5 === 5, `Очікували 5 викликів, отримали ${callCount5}`);

// 3. Тест: дефолт maxAttempts = 3 працює без другого аргументу
let callCountDefault = 0;
const resDefault = retry(() => {
  callCountDefault++;
  return false;
});
console.assert(resDefault === -1, `Очікували -1, отримали ${resDefault}`);
console.assert(callCountDefault === 3, `Очікували 3 виклики за дефолтом, отримали ${callCountDefault}`);

// 4. Тест: успіх на конкретній спробі (наприклад, на 2-й)
let callCountSuccessOn2 = 0;
const resSuccessOn2 = retry(() => {
  callCountSuccessOn2++;
  return callCountSuccessOn2 === 2;
}, 4);
console.assert(resSuccessOn2 === 2, `Очікували успіх на 2 спробі, отримали ${resSuccessOn2}`);
console.assert(callCountSuccessOn2 === 2, `Мало бути 2 виклики, отримали ${callCountSuccessOn2}`);

console.log('Усі асерти для retry пройшли успішно!');


// --- Завдання: getTimeout ---

// 1. Замінили var на const і стрілкову функцію, прибрали hoisting та витоки області видимості.
// 2. Використали ?? (nullish coalescing) замість ||, щоб коректно зберігати timeout: 0, бо 0 є falsy для ||.
// 3. Замінили нестроге порівняння з рядком == '0' на суворе порівняння з числом === 0 без неявного приведення типів.
const getTimeout = (config) => {
  const timeout = config.timeout ?? 3000;
  const retries = config.retries ?? 1;

  if (retries === 0) {
    return 0;
  }

  return timeout * retries;
};

// --- Перевірки console.assert ---

// 1. Перевірка: timeout: 0 та retries: 0 мають повертати 0 (не 3000)
const resZero = getTimeout({ timeout: 0, retries: 0 });
console.assert(resZero === 0, `Очікували 0, отримали ${resZero}`);

// 2. Перевірка: retries: 2 без переданого timeout має взяти дефолтні 3000 і повернути 6000
const resDefaultTimeout = getTimeout({ retries: 2 });
console.assert(resDefaultTimeout === 6000, `Очікували 6000, отримали ${resDefaultTimeout}`);

// 3. Перевірка: стандартні значення з переданим timeout і retries
const resNormal = getTimeout({ timeout: 2000, retries: 3 });
console.assert(resNormal === 6000, `Очікували 6000, отримали ${resNormal}`);

// 4. Перевірка: збереження timeout: 0 при ненульових retries (0 * 3 = 0)
const resZeroTimeout = getTimeout({ timeout: 0, retries: 3 });
console.assert(resZeroTimeout === 0, `Очікували 0, отримали ${resZeroTimeout}`);

console.log('Усі асерти для getTimeout пройшли успішно!');