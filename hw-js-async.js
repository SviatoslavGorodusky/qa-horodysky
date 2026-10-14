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