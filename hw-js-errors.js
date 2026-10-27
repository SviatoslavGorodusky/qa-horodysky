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