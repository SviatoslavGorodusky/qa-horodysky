// ==========================================
// Блок Д1: Безпечне отримання кошика (safeGetCart)
// ==========================================

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

// --- Тести Д1 ---
console.assert(
  JSON.stringify(safeGetCart(null)) === '[]',
  'Сценарій 1 (null): Має повертати порожній масив []'
);

console.assert(
  JSON.stringify(safeGetCart('')) === '[]',
  'Сценарій 1 (empty string): Має повертати порожній масив []'
);

console.assert(
  JSON.stringify(safeGetCart('{bad')) === '[]',
  'Сценарій 1 (bad JSON): Має повертати порожній масив []'
);

console.assert(
  JSON.stringify(safeGetCart('{"a":1}')) === '[]',
  'Сценарій 1 (JSON object): Має повертати порожній масив [], бо це не масив'
);

const validCartJson = '[{"id":1,"title":"Phone"}]';
const parsedCart = safeGetCart(validCartJson);

console.assert(
  Array.isArray(parsedCart) && parsedCart.length === 1 && parsedCart[0].id === 1,
  `Сценарій 2 (valid array): Очікували масив із товаром, отримали ${JSON.stringify(parsedCart)}`
);

let didCartThrow = false;
try {
  safeGetCart('{{{invalid json content');
} catch (e) {
  didCartThrow = true;
}

console.assert(
  !didCartThrow,
  'Сценарій 3 (never throws): Функція не повинна викидати помилку на некоректних даних'
);

console.log('Усі асерти для safeGetCart пройшли успішно!');


// ==========================================
// Блок Д3: Кастомний AssertionError, assertEqual та універсальний assertThrows
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
// Блок Д2: Парсинг ціни з помилками (parsePrice)
// ==========================================

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

// --- Тести Д2 ---
console.assert(
  parsePrice('$1,299.99') === 1299.99,
  'Сценарій 1 (валідний $1,299.99): Очікували 1299.99'
);

console.assert(
  parsePrice('$45.50') === 45.5,
  'Сценарій 1 (валідний $45.50): Очікували 45.5'
);

assertThrows(() => parsePrice(1299), TypeError);
assertThrows(() => parsePrice('invalid text'), Error);
assertThrows(() => parsePrice(''), Error);
assertThrows(() => parsePrice('-$50'), Error);

console.log('Усі асерти для parsePrice пройшли успішно!');


// --- Тести Д3 ---
assertEqual(10, 10, 'Перевірка чисел');
assertEqual({ a: 1 }, { a: 1 }, 'Перевірка об’єктів');

try {
  assertEqual('active', 'pending', 'Статус юзера');
  console.assert(false, 'assertEqual мав кинути AssertionError');
} catch (err) {
  console.assert(
    err instanceof AssertionError,
    'AssertionError: Має бути екземпляром класу AssertionError'
  );
  console.assert(
    err.name === 'AssertionError',
    `AssertionError: Поле name має бути 'AssertionError', отримали '${err.name}'`
  );
  console.assert(
    err.message === 'Статус юзера: expected "pending", got "active"',
    `AssertionError: Неправильне повідомлення: '${err.message}'`
  );
}

assertThrows(() => {
  throw new TypeError('Bad type');
}, TypeError);

try {
  assertThrows(() => {}, RangeError);
  console.assert(false, 'assertThrows мав упасти, бо fn нічого не кинула');
} catch (err) {
  console.assert(
    err instanceof AssertionError && err.message.includes('did not throw any error'),
    'assertThrows: Коректно впав при відсутності помилки'
  );
}

try {
  assertThrows(() => {
    throw new SyntaxError('Invalid syntax');
  }, TypeError);
  console.assert(false, 'assertThrows мав упасти через невідповідність типу');
} catch (err) {
  console.assert(
    err instanceof AssertionError && err.message.includes('Expected function to throw TypeError, but it threw SyntaxError'),
    'assertThrows: Коректно впав при відмінності типів'
  );
}

console.log('Усі асерти для assertEqual та assertThrows пройшли успішно!');