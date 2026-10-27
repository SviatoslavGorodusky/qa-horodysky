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
    // Не порожній catch: обробляємо помилку парсингу та повертаємо дефолтний порожній масив
    return [];
  }
};

// 1. Перевірка невалідних значень (null, порожній рядок, битий JSON, об'єкт замість масиву)
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

// 2. Перевірка валідного масиву
const validCartJson = '[{"id":1,"title":"Phone"}]';
const parsedCart = safeGetCart(validCartJson);

console.assert(
  Array.isArray(parsedCart) && parsedCart.length === 1 && parsedCart[0].id === 1,
  `Сценарій 2 (valid array): Очікували масив із товаром, отримали ${JSON.stringify(parsedCart)}`
);

// 3. Перевірка на відсутність викидання помилок (never throws)
let didThrow = false;
try {
  safeGetCart('{{{invalid json content');
} catch (e) {
  didThrow = true;
}

console.assert(
  !didThrow,
  'Сценарій 3 (never throws): Функція не повинна викидати помилку на некоректних даних'
);

console.log('Усі асерти для safeGetCart пройшли успішно!');

// ==========================================
// Блок Д2: Парсинг ціни з помилками (parsePrice)
// ==========================================

const parsePrice = (text) => {
  if (typeof text !== 'string') {
    throw new TypeError('Argument must be a string');
  }

  const trimmed = text.trim();
  // Перевіряємо формат: символ $ на початку, далі число з комами/крапкою (без мінусів)
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


const assertThrows = (fn, ExpectedErrorClass, expectedMessagePart) => {
  try {
    fn();
    return false; // Помилка не виникла
  } catch (err) {
    const isCorrectType = err instanceof ExpectedErrorClass;
    const isCorrectMessage = expectedMessagePart ? err.message.includes(expectedMessagePart) : true;
    return isCorrectType && isCorrectMessage;
  }
};

// 1. Валідний запуск ($1,299.99 -> 1299.99)
console.assert(
  parsePrice('$1,299.99') === 1299.99,
  'Сценарій 1 (валідний $1,299.99): Очікували 1299.99'
);

console.assert(
  parsePrice('$45.50') === 45.5,
  'Сценарій 1 (валідний $45.50): Очікували 45.5'
);

// 2. Перевірка TypeError, якщо аргумент не рядок (instanceof TypeError)
console.assert(
  assertThrows(() => parsePrice(1299), TypeError, 'Argument must be a string'),
  'Сценарій 2 (TypeError): Має кидати TypeError, якщо передано не рядок'
);

// 3. Перевірка Error для сміття, порожнього рядка та від'ємних цін (instanceof Error + текст)
console.assert(
  assertThrows(() => parsePrice('invalid text'), Error, 'Invalid price format: "invalid text"'),
  'Сценарій 3 (сміття): Має кидати Error з відповідним повідомленням'
);

console.assert(
  assertThrows(() => parsePrice(''), Error, 'Invalid price format: ""'),
  'Сценарій 3 (порожній рядок): Має кидати Error для порожнього рядка'
);

console.assert(
  assertThrows(() => parsePrice('-$50'), Error, 'Invalid price format: "-$50"'),
  'Сценарій 3 (від’ємна ціна): Має кидати Error для від’ємних значень'
);

console.log('Усі асерти для parsePrice пройшли успішно!');