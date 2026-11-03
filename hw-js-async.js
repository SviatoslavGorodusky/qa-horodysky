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