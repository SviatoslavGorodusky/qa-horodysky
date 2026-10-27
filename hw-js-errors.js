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