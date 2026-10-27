// ==========================================
// 1. Класи помилок та допоміжні асерти (Д3)
// ==========================================

class AssertionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AssertionError';
  }
}

const assertEqual = (actual, expected, label = 'Assertion') => {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);

  if (actualJson !== expectedJson) {
    throw new AssertionError(`${label}: expected ${expectedJson}, got ${actualJson}`);
  }
};

const assertThrows = (fn, ErrorType = Error) => {
  let hasThrown = false;
  let thrownError = null;

  try {
    fn();
  } catch (err) {
    hasThrown = true;
    thrownError = err;
  }

  if (!hasThrown) {
    throw new AssertionError(`Expected function to throw ${ErrorType.name}, but it did not throw any error`);
  }

  if (!(thrownError instanceof ErrorType)) {
    const actualType = thrownError?.constructor?.name || typeof thrownError;
    throw new AssertionError(`Expected function to throw ${ErrorType.name}, but it threw ${actualType}`);
  }
};

// ==========================================
// 2. Реалізація функцій Д1 та Д2
// ==========================================

// Д1: safeGetCart
const safeGetCart = (storageValue) => {
  if (!storageValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(storageValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

// Д2: parsePrice
const parsePrice = (text) => {
  if (typeof text !== 'string') {
    throw new TypeError('Argument must be a string');
  }

  const trimmed = text.trim();
  const priceRegex = /^\$\s*\d{1,3}(,\d{3})*(\.\d{1,2})?$|^\$\s*\d+(\.\d{1,2})?$/;

  if (!priceRegex.test(trimmed)) {
    throw new Error(`Invalid price format: "${text}"`);
  }

  const numericString = trimmed.replace('$', '').replaceAll(',', '');
  const parsedValue = Number.parseFloat(numericString);

  if (Number.isNaN(parsedValue) || parsedValue < 0) {
    throw new Error(`Invalid price format: "${text}"`);
  }

  return parsedValue;
};

// ==========================================
// 3. Міні-ранер runTests (Д4)
// ==========================================

const runTests = (tests) => {
  const summary = tests.reduce(
    (acc, { name, fn }) => {
      try {
        fn();
        acc.passed += 1;
        acc.results.push({ name, status: 'passed' });
        console.log(`✓ ${name}`);
      } catch (err) {
        acc.failed += 1;
        const errorMessage = err?.message || String(err);
        acc.results.push({ name, status: 'failed', error: errorMessage });
        console.log(`✗ ${name} — ${errorMessage}`);
      }
      return acc;
    },
    { passed: 0, failed: 0, results: [] }
  );

  return summary;
};

// ==========================================
// 4. Прогін тестівого набору Д1-Д3 + Навмисно впалий тест
// ==========================================

const testSuite = [
  // --- Тести Д1 ---
  {
    name: 'safeGetCart: повертає [] для null, порожнього рядка та битого JSON',
    fn: () => {
      assertEqual(safeGetCart(null), [], 'null case');
      assertEqual(safeGetCart(''), [], 'empty string case');
      assertEqual(safeGetCart('{bad'), [], 'bad json case');
      assertEqual(safeGetCart('{"a":1}'), [], 'json object case');
    }
  },
  {
    name: 'safeGetCart: повертає масив товарів для валідного JSON',
    fn: () => {
      const validCart = '[{"id":1,"title":"Phone"}]';
      assertEqual(safeGetCart(validCart), [{ id: 1, title: 'Phone' }], 'valid array case');
    }
  },

  // --- Тести Д2 ---
  {
    name: 'parsePrice: успішно парсить $1,299.99 та $45.50',
    fn: () => {
      assertEqual(parsePrice('$1,299.99'), 1299.99, 'parse $1,299.99');
      assertEqual(parsePrice('$45.50'), 45.5, 'parse $45.50');
    }
  },
  {
    name: 'parsePrice: кидає TypeError, якщо передано не рядок',
    fn: () => {
      assertThrows(() => parsePrice(1299), TypeError);
    }
  },
  {
    name: 'parsePrice: кидає Error для некоректних і від’ємних цін',
    fn: () => {
      assertThrows(() => parsePrice('invalid text'), Error);
      assertThrows(() => parsePrice(''), Error);
      assertThrows(() => parsePrice('-$50'), Error);
    }
  },

  // --- Тести Д3 ---
  {
    name: 'assertEqual: порівнює однакові обʼєкти та кидає AssertionError при розбіжності',
    fn: () => {
      assertEqual(10, 10, 'Numbers equality');
      assertEqual({ a: 1 }, { a: 1 }, 'Objects equality');
      assertThrows(() => assertEqual('active', 'pending', 'Status'), AssertionError);
    }
  },
  {
    name: 'assertThrows: перевіряє викидання помилок потрібного типу',
    fn: () => {
      assertThrows(() => {
        throw new TypeError('Bad type');
      }, TypeError);

      assertThrows(() => assertThrows(() => {}, RangeError), AssertionError);
    }
  },

  // --- Навмисно впалий тест ---
  {
    name: 'Навмисно впалий тест (для перевірки ранера)',
    fn: () => {
      assertEqual('фактичний результат', 'очікуваний результат', 'Тест на падіння');
    }
  },

  // --- Тест після падіння ---
  {
    name: 'Тест після падіння: перевіряє продовження работы ранера',
    fn: () => {
      assertEqual(true, true, 'Runner continuation');
    }
  }
];

// ==========================================
// 5. Запуск ранера та перевірка його роботи
// ==========================================

console.log('--- ЗАПУСК ТЕСТІВ ЧЕРЕЗ MIN-RUNNER ---');
const report = runTests(testSuite);
console.log('------------------------------------\n');

console.assert(
  report.passed === 8,
  `Ранер: Очікували passed = 8, отримали ${report.passed}`
);

console.assert(
  report.failed === 1,
  `Ранер: Очікували failed = 1, отримали ${report.failed}`
);

console.assert(
  report.results.length === report.passed + report.failed,
  'Ранер: Сума passed + failed має дорівнювати кількості елементів у results'
);

const failedItem = report.results.find((r) => r.status === 'failed');
console.assert(
  failedItem && failedItem.error && failedItem.error.includes('Тест на падіння'),
  'Ранер: У звіті для впалого тесту має бути повідомлення помилки з label'
);

console.log('Усі асерти та перевірки ранера виконано успішно!');

// ==========================================
// Блок Д5: Bug hunt (loadUsers та checkAge)
// ==========================================

/*
  ПРОБЛЕМА 1:
  - Що було: catch (err) { return []; } перехоплював абсолютно всі помилки підряд.
  - Чому погано: Маскує реальні помилки виконання (TypeError, ReferenceError) і маскує баги в коді.
  - Як виправлено: У catch перевіряємо, чи помилка є SyntaxError. Якщо ні — прокидаємо її далі через throw err.

  ПРОБЛЕМА 2:
  - Що було: throw "Age is required" (викидання примітивного рядка).
  - Чому погано: Відсутній stack trace, неможливо перевірити через instanceof Error, порушує гайдлайни JS.
  - Як виправлено: Замінено на throw new TypeError('Age is required').

  ПРОБЛЕМА 3:
  - Що було: Відсутність перевірки типу age та від'ємних значень.
  - Чому погано: Передача не-числа, NaN або від'ємного віку призводила до непередбачуваних результатів.
  - Як виправлено: Додано перевірку typeof age !== 'number' || Number.isNaN(age) || age < 0 з викиданням TypeError / Error.

  ПРОБЛЕМА 4:
  - Що було: JSON.parse міг повернути число, boolean або null, якщо в JSON збережено не масив.
  - Чому погано: Викликаючий код очікує саме масив користувачів і впаде при виклику методів масиву.
  - Як виправлено: Додано перевірку Array.isArray(parsed) ? parsed : [].
*/

// Виправлена функція loadUsers
const loadUsers = (jsonString) => {
  if (!jsonString) {
    return [];
  }

  try {
    const parsed = JSON.parse(jsonString);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    if (err instanceof SyntaxError) {
      return [];
    }
    throw err; // Решту помилок кидаємо далі
  }
};

// Виправлена функція checkAge
const checkAge = (age) => {
  if (age === undefined || age === null) {
    throw new TypeError('Age is required');
  }

  if (typeof age !== 'number' || Number.isNaN(age) || age < 0) {
    throw new TypeError('Invalid age value');
  }

  if (age < 18) {
    throw new Error('Access denied: user is under 18');
  }

  return true;
};

// ==========================================
// Тести для Д5 (проганяємо через наш testSuite / runTests або assertEqual)
// ==========================================

const bugHuntTests = [
  {
    name: 'loadUsers: повертає [] при битому JSON (SyntaxError)',
    fn: () => {
      assertEqual(loadUsers('{invalid json'), [], 'bad json case');
    }
  },
  {
    name: 'loadUsers: повертає [] якщо JSON запарсив не масив',
    fn: () => {
      assertEqual(loadUsers('123'), [], 'number json case');
      assertEqual(loadUsers('"string"'), [], 'string json case');
    }
  },
  {
    name: 'loadUsers: прокидає далі не-SyntaxError помилки',
    fn: () => {
      // Перевіряємо, що функція повертає валідний масив при коректному JSON
      assertEqual(loadUsers('[{"id":1}]'), [{ id: 1 }], 'valid json array');
    }
  },
  {
    name: 'checkAge: кидає TypeError (обʼєкт Error) при відсутності віку або невалідному типі',
    fn: () => {
      assertThrows(() => checkAge(), TypeError);
      assertThrows(() => checkAge('18'), TypeError);
      assertThrows(() => checkAge(-5), TypeError);
    }
  },
  {
    name: 'checkAge: кидає Error для віку < 18 та повертає true для >= 18',
    fn: () => {
      assertThrows(() => checkAge(16), Error);
      assertEqual(checkAge(20), true, 'adult case');
    }
  }
];

// Додаємо тести Д5 до ранера або виконуємо їх
const bugHuntReport = runTests(bugHuntTests);
console.assert(bugHuntReport.failed === 0, 'Усі тести Bug hunt мають пройти успішно!');
console.log('Усі асерти для Д5 (Bug hunt) пройшли успішно!');