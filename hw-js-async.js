// ==========================================
// Стартовий код (імітація бази даних та API)
// ==========================================

const users = [
  { id: 1, name: 'Olena' },
  { id: 2, name: 'Taras' }
];

const orders = [
  { id: 101, userId: 1, amount: 100 },
  { id: 102, userId: 1, amount: 145.5 }
];

// Error-first callback: getUser(id, callback)
function getUser(id, callback) {
  setTimeout(() => {
    const user = users.find((u) => u.id === id);
    if (!user) {
      callback(new Error(`User ${id} not found`), null);
    } else {
      callback(null, user);
    }
  }, 50);
}

// Error-first callback: getOrders(userId, callback)
function getOrders(userId, callback) {
  setTimeout(() => {
    const userOrders = orders.filter((o) => o.userId === userId);
    callback(null, userOrders);
  }, 50);
}

// ==========================================
// Спосіб 1: Лише колбеки (Callback approach)
// ==========================================

function printTotalCb(id, done) {
  getUser(id, (err, user) => {
    if (err) {
      console.log(`Помилка: ${err.message}`);
      if (done) done();
      return;
    }

    getOrders(user.id, (orderErr, userOrders) => {
      if (orderErr) {
        console.log(`Помилка: ${orderErr.message}`);
        if (done) done();
        return;
      }

      const total = userOrders.reduce((sum, order) => sum + order.amount, 0);
      console.log(`${user.name}: ${total}`);
      if (done) done();
    });
  });
}

// ==========================================
// Спосіб 2: Промісифікація та плаский .then
// ==========================================

// Ручні обгортки через new Promise (без util.promisify)
function getUserAsync(id) {
  return new Promise((resolve, reject) => {
    getUser(id, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

function getOrdersAsync(userId) {
  return new Promise((resolve, reject) => {
    getOrders(userId, (err, ordersList) => {
      if (err) {
        reject(err);
      } else {
        resolve(ordersList);
      }
    });
  });
}

// Плаский ланцюжок .then без вкладеності з одним .catch у кінці
function printTotalThen(id) {
  let currentUser;

  return getUserAsync(id)
    .then((user) => {
      currentUser = user;
      return getOrdersAsync(user.id);
    })
    .then((userOrders) => {
      const total = userOrders.reduce((sum, order) => sum + order.amount, 0);
      console.log(`${currentUser.name}: ${total}`);
    })
    .catch((err) => {
      console.log(`Помилка: ${err.message}`);
    });
}

// ==========================================
// Спосіб 3: Async/Await + Try/Catch (без .then)
// ==========================================

async function printTotalAwait(id) {
  try {
    const user = await getUserAsync(id);
    const userOrders = await getOrdersAsync(user.id);
    const total = userOrders.reduce((sum, order) => sum + order.amount, 0);
    console.log(`${user.name}: ${total}`);
  } catch (err) {
    console.log(`Помилка: ${err.message}`);
  }
}

// ==========================================
// Тестові перевірки (виклики для id: 1, 2, 3)
// ==========================================

async function runAllTests() {
  console.log('--- 1. Тест Callback ---');
  await new Promise((resolve) => printTotalCb(1, resolve));
  await new Promise((resolve) => printTotalCb(2, resolve));
  await new Promise((resolve) => printTotalCb(3, resolve));

  console.log('\n--- 2. Тест Promise (.then) ---');
  await printTotalThen(1);
  await printTotalThen(2);
  await printTotalThen(3);

  console.log('\n--- 3. Тест Async/Await ---');
  await printTotalAwait(1);
  await printTotalAwait(2);
  await printTotalAwait(3);
}

runAllTests();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function retryAsync(fn, attempts = 3, delayMs = 500) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < attempts) {
        await delay(delayMs);
      }
    }
  }

  throw new Error(`Failed after ${attempts} attempts`, { cause: lastError });
}

function makeFlaky(failTimes) {
  let calls = 0;
  return async () => {
    calls++;
    if (calls <= failTimes) {
      throw new Error(`Flaky error on call ${calls}`);
    }
    return 'ok';
  };
}

async function testRetryAsync() {
  const flaky0 = makeFlaky(0);
  const res1 = await retryAsync(flaky0, 3, 100);
  console.assert(res1 === 'ok', `Сценарій 1: Очікували 'ok', отримали ${res1}`);

  const flaky2 = makeFlaky(2);
  const startTime = Date.now();
  const res3 = await retryAsync(flaky2, 3, 500);
  const duration = Date.now() - startTime;

  console.assert(res3 === 'ok', `Сценарій 2: Очікували 'ok', отримали ${res3}`);
  console.assert(
    duration >= 1000,
    `Сценарій 2: Час виконання має бути >= 1000ms, тривало ${duration}ms`
  );

  const flaky5 = makeFlaky(5);
  let caughtError = null;

  try {
    await retryAsync(flaky5, 3, 100);
  } catch (err) {
    caughtError = err;
  }

  console.assert(
    caughtError !== null,
    'Сценарій 3: Мала виникнути помилка, але її не було'
  );
  console.assert(
    caughtError?.message === 'Failed after 3 attempts',
    `Сценарій 3: Неправильне повідомлення помилки: "${caughtError?.message}"`
  );
  console.assert(
    caughtError?.cause instanceof Error,
    'Сценарій 3: Поле cause має містити обʼєкт помилки Error'
  );
  console.assert(
    caughtError?.cause?.message === 'Flaky error on call 3',
    `Сценарій 3: Неправильна остання помилка в cause: "${caughtError?.cause?.message}"`
  );
}

testRetryAsync();

// ==========================================
// Блок Д2: Event loop (передбач порядок виводу)
// ==========================================

// ------------------------------------------
// Фрагмент A
// ------------------------------------------
/*
--- Прогноз порядку виводу (до запуску) ---
Очікуваний вивід: A, F, C, E, D, B

--- Пояснення через Event Loop ---
1. 'A' — Синхронний код. Виконується негайно в основному потоці виконання.
2. setTimeout ('B') — Реєструє таймер із затримкою 0мс. Коллбек () => console.log('B') додається у чергу макрозадач (MacroTask / Task Queue).
3. Promise.resolve().then ('C') — Коллбек першого .then() стає у чергу мікрозадач (Microtask Queue).
4. queueMicrotask ('E') — Коллбек () => console.log('E') додається в кінець поточного списку мікрозадач.
5. 'F' — Синхронний код. Виконується одразу в основному потоці.

Після завершення синхронного коду Event Loop вичерпує ВСІ мікрозадачі:
6. 'C' — Перша мікрозадача з черги мікрозадач. Під час її виконання створюється друга мікрозадача для другого .then('D'), яка стає у кінець черги.
7. 'E' — Друга мікрозадача (queueMicrotask), яка вже перебувала у черзі.
8. 'D' — Третя мікрозадача, згенерована виконанням першого .then().

Після повного очищення черги мікрозадач Event Loop переходить до макрозадач:
9. 'B' — Перша макрозадача з черги (setTimeout).

--- Фактичний вивід ---
A
F
C
E
D
B
*/

console.log('=== Фрагмент A ===');
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve()
  .then(() => console.log('C'))
  .then(() => console.log('D'));
queueMicrotask(() => console.log('E'));
console.log('F');


// ------------------------------------------
// Фрагмент B
// ------------------------------------------
/*
--- Прогноз порядку виводу (до запуску) ---
Очікуваний вивід: 3, 1, 4, 2, 5

--- Пояснення через Event Loop ---
1. '3' — Синхронний код основного потоку.
2. Виклик `run()`:
   - '1' — Синхронний код всередині async-функції. Виконується негайно до оператора `await`.
   - `await null` — Огортає `null` у проміс (`Promise.resolve(null)`). Весь код після `await` (`console.log('2')`) реєструється як мікрозадача та відкладається, а контроль повертається в основний потік.
3. '4' — Синхронний код основного потоку, що виконується після повернення з async-функції.
4. setTimeout ('5') — Реєструє коллбек у черзі макрозадач.

Очищення черг після синхронного коду:
5. '2' — Мікрозадача, створена оператором `await`. Виконується першою перед макрозадачами.
6. '5' — Макрозадача (setTimeout), виконується останньою.

--- Фактичний вивід ---
3
1
4
2
5
*/

setTimeout(() => {
  console.log('\n=== Фрагмент B ===');
  async function run() {
    console.log('1');
    await null;
    console.log('2');
  }
  console.log('3');
  run();
  console.log('4');
  setTimeout(() => console.log('5'), 0);
}, 100);


// ------------------------------------------
// Фрагмент C
// ------------------------------------------
/*
--- Прогноз порядку виводу (до запуску) ---
Очікуваний вивід: p1, t1, t2, p2, t3

--- Пояснення через Event Loop ---
Синхронний етап:
1. setTimeout 1, 2, 3 — Додають 3 макрозадачі у чергу макрозадач у порядку: [t1, t2, t3].
2. Promise.resolve().then('p1') — Додає мікрозадачу 'p1' у чергу мікрозадач.

Фаза 1: Очищення мікрозадач після синхронного коду
3. 'p1' — Єдина мікрозадача в черзі.

Фаза 2: Обробка макрозадач (Event Loop бере макрозадачі по одній і очищає мікрозадачі після кожної)
4. 't1' — Виконується 1-ша макрозадача з черги.
5. 't2' — Виконується 2-га макрозадача. Усередині неї створюється мікрозадача `Promise.resolve().then('p2')`.
6. 'p2' — Мікрозадача, яка виникла ПІД ЧАС виконання 2-ї макрозадачі. Вона виконується негайно ДО переходу до наступної макрозадачі ('t3').
7. 't3' — Виконується 3-тя макрозадача.

--- Фактичний вивід ---
p1
t1
t2
p2
t3
*/

setTimeout(() => {
  console.log('\n=== Фрагмент C ===');
  setTimeout(() => console.log('t1'), 0);
  setTimeout(() => {
    console.log('t2');
    Promise.resolve().then(() => console.log('p2'));
  }, 0);
  setTimeout(() => console.log('t3'), 0);
  Promise.resolve().then(() => console.log('p1'));
}, 300);