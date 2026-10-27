const getSlowFailed = (results, limitMs) =>
  results
    .filter((test) => test.status === 'failed' && test.duration > limitMs)
    .toSorted((a, b) => b.duration - a.duration)
    .map((test) => test.name);

const testData = [
  { name: 'Auth test', status: 'failed', duration: 1500 },
  { name: 'Payment test', status: 'passed', duration: 3000 },
  { name: 'Cart test', status: 'failed', duration: 2500 },
  { name: 'Profile test', status: 'failed', duration: 800 },
  { name: 'Settings test', status: 'skipped', duration: 5000 }
];

// Копія початкових даних для перевірки незмінності
const testDataCopy = JSON.stringify(testData);

// 1. Перевірка правильного сортування та фільтрації за затримкою
const result1 = getSlowFailed(testData, 1000);
console.assert(
  JSON.stringify(result1) === JSON.stringify(['Cart test', 'Auth test']),
  `Сценарій 1: Очікували ['Cart test', 'Auth test'], отримали ${JSON.stringify(result1)}`
);

// 2. Перевірка незмінності вхідного масиву
console.assert(
  JSON.stringify(testData) === testDataCopy,
  'Сценарій 2: Вхідний масив результатів був змінений (мутований)!'
);

// 3. Перевірка порожнього масиву та масиву без впалих тестів
const resultEmpty = getSlowFailed([], 1000);
console.assert(
  Array.isArray(resultEmpty) && resultEmpty.length === 0,
  `Сценарій 3 (порожній): Очікували [], отримали ${JSON.stringify(resultEmpty)}`
);

const passedOnly = [
  { name: 'UI test', status: 'passed', duration: 2000 }
];
const resultNoFailed = getSlowFailed(passedOnly, 1000);
console.assert(
  Array.isArray(resultNoFailed) && resultNoFailed.length === 0,
  `Сценарій 3 (без впалих): Очікували [], отримали ${JSON.stringify(resultNoFailed)}`
);

console.log('Усі асерти для getSlowFailed пройшли успішно!');

// ==========================================
// Блок Д2: Групування за статусом (groupByStatus)
// ==========================================

const groupByStatus = (results) =>
  results.reduce(
    (acc, test) => {
      if (acc[test.status]) {
        acc[test.status].push(test.name);
      }
      return acc;
    },
    { passed: [], failed: [], skipped: [] }
  );

const testResultsData = [
  { name: 'Auth test', status: 'failed' },
  { name: 'Payment test', status: 'passed' },
  { name: 'Cart test', status: 'failed' },
  { name: 'Profile test', status: 'passed' },
  { name: 'Settings test', status: 'skipped' },
  { name: 'Legacy test', status: 'unknown' } // невідомий статус
];

// 1. Перевірка коректного групування за статусами
const groupedResult = groupByStatus(testResultsData);
console.assert(
  JSON.stringify(groupedResult.passed) === JSON.stringify(['Payment test', 'Profile test']),
  `Сценарій 1 (passed): Очікували ['Payment test', 'Profile test'], отримали ${JSON.stringify(groupedResult.passed)}`
);
console.assert(
  JSON.stringify(groupedResult.failed) === JSON.stringify(['Auth test', 'Cart test']),
  `Сценарій 1 (failed): Очікували ['Auth test', 'Cart test'], отримали ${JSON.stringify(groupedResult.failed)}`
);
console.assert(
  JSON.stringify(groupedResult.skipped) === JSON.stringify(['Settings test']),
  `Сценарій 1 (skipped): Очікували ['Settings test'], отримали ${JSON.stringify(groupedResult.skipped)}`
);

// 2. Перевірка порожнього масиву (повертає об'єкт із трьома порожніми масивами)
const emptyGrouped = groupByStatus([]);
console.assert(
  JSON.stringify(emptyGrouped) === JSON.stringify({ passed: [], failed: [], skipped: [] }),
  `Сценарій 2 (порожній): Очікували потрійний порожній об'єкт, отримали ${JSON.stringify(emptyGrouped)}`
);

// 3. Перевірка стійкості до невідомих статусів (не ламає функцію і не додає зайвих ключів)
console.assert(
  !('unknown' in groupedResult),
  'Сценарій 3: Ключ з невідомим статусом не повинен створюватися в акумуляторі!'
);

console.log('Усі асерти для groupByStatus пройшли успішно!');

// ==========================================
// Блок Д3: Парсинг користувачів (parseUsers)
// ==========================================

const parseUsers = ({ data: { users = [] } = {} } = {}) =>
  users
    .filter((user) => user?.email && user.email.includes('@'))
    .map(({ id, firstName, lastName, email }) => {
      const name = lastName ? `${firstName} ${lastName}` : firstName;
      return `#${id} ${name} <${email}>`;
    });

const apiResponseData = {
  data: {
    users: [
      { id: 7, firstName: 'Olena', lastName: 'Koval', email: 'olena@test.com' },
      { id: 8, firstName: 'Taras', email: 'taras@test.com' }, // Без lastName
      { id: 9, firstName: 'Ivan', lastName: 'Franko', email: 'invalid-email' }, // Невалідний email
      { id: 10, firstName: 'Anna', lastName: 'Petrenko' } // Без email
    ]
  },
  meta: { page: 1 }
};

// 1. Перевірка коректного форматування та фільтрації по невалідному email
const parsedResult = parseUsers(apiResponseData);
console.assert(
  JSON.stringify(parsedResult) ===
    JSON.stringify([
      '#7 Olena Koval <olena@test.com>',
      '#8 Taras <taras@test.com>'
    ]),
  `Сценарій 1: Очікували відформатований масив, отримали ${JSON.stringify(parsedResult)}`
);

// 2. Перевірка відсутності подвійних пробілів (для користувачів без lastName)
console.assert(
  !parsedResult[1].includes('  '),
  `Сценарій 2: Рядок без lastName містить подвійний пробіл: "${parsedResult[1]}"`
);

// 3. Перевірка порожнього масиву users
const emptyResponse = { data: { users: [] }, meta: { page: 1 } };
const emptyParsed = parseUsers(emptyResponse);
console.assert(
  Array.isArray(emptyParsed) && emptyParsed.length === 0,
  `Сценарій 3 (порожній): Очікували [], отримали ${JSON.stringify(emptyParsed)}`
);

console.log('Усі асерти для parseUsers пройшли успішно!');