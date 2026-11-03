// Граничні значення та класи еквівалентності:
// - Межа cold / warm: 9.9 (cold), 10 (warm)
// - Межа warm / hot: 25 (warm), 25.1 (hot)
// - Невалідні значення: '20' (рядок замість числа -> invalid), NaN (invalid)

// const classifyTemperature = (t) => {
//   if (typeof t !== 'number' || Number.isNaN(t)) {
//     return 'invalid';
//   }

//   if (t < 10) {
//     return 'cold';
//   } else if (t <= 25) {
//     return 'warm';
//   } else {
//     return 'hot';
//   }
// };

// // Перевірки критеріїв приймання через console.assert
// console.assert(classifyTemperature(9.9) === 'cold', 'Failed for 9.9: expected "cold"');
// console.assert(classifyTemperature(10) === 'warm', 'Failed for 10: expected "warm"');
// console.assert(classifyTemperature(25) === 'warm', 'Failed for 25: expected "warm"');
// console.assert(classifyTemperature(25.1) === 'hot', 'Failed for 25.1: expected "hot"');
// console.assert(classifyTemperature('20') === 'invalid', 'Failed for "20": expected "invalid"');
// console.assert(classifyTemperature(NaN) === 'invalid', 'Failed for NaN: expected "invalid"');

// // console.log('Усі перевірки пройшли успішно')

// const age = (x) =>{
//   if (typeof x !== 'number' || Number.isNaN(x)){
//     return 'error'
//   }
//   if (x<18){
//     return 'child'
//   } else if (x<=60){
//     return 'adult'
//   } else {
//     return 'pensioner'
//   }
// }

// console.assert(age(18) === 'adult', 'Тест провалено: очікувався adult для 18');
// console.assert(age(17.9) === 'child', 'Тест провалено: очікувався child для 17.9');
// console.assert(age(18.1) === 'adult', 'Тест провалено: очікувався adult для 18.1');
// console.assert(age(17) === 'child', 'Тест провалено: очікувався child для 17');
// console.assert(age(19) === 'adult', 'Тест провалено: очікувався adult для 19');

// console.assert(age(60) === 'adult', 'Тест провалено: очікувався adult для 60');
// console.assert(age(59.9) === 'adult', 'Тест провалено: очікувався adult для 59.9');
// console.assert(age(59) === 'adult', 'Тест провалено: очікувався adult для 59');
// console.assert(age(60.1) === 'pensioner', 'Тест провалено: очікувався pensioner для 60.1');
// console.assert(age(61) === 'pensioner', 'Тест провалено: очікувався pensioner для 61');

// console.assert(age('nine') === 'error', 'Тест провалено: очікувався eror для nine');

// // Межа 18
// console.assert(age(17.9) === 'child', 'Failed for 17.9');
// console.assert(age(18) === 'adult', 'Failed for 18');

// // Межа 60
// console.assert(age(60) === 'adult', 'Failed for 60');
// console.assert(age(60.1) === 'pensioner', 'Failed for 60.1');

// // Негативні кейси
// console.assert(age('nine') === 'error', 'Failed for "nine"');
// console.assert(age(NaN) === 'error', 'Failed for NaN');

// const getStatusMessage = (status) => {
//   switch (status) {
//     case 'passed':
//       return 'Тест пройдено успішно';

//     case 'failed':
//       return 'Знайдено баг або дефект';

//     case 'skipped':
//     case 'pending': // Групування кейсів: один результат для двох статусів
//       return 'Тест пропущено або очікує виконання';

//     default:
//       return 'Невідомий статус тесту';
//   }
// };

// console.log(getStatusMessage('passed'));  // Тест пройдено успішно
// console.log(getStatusMessage('skipped')); // Тест пропущено або очікує виконання
// console.log(getStatusMessage('unknown')); // Невідомий статус тесту

// const handleStatusCode = (code) =>{
//   switch(code){
//     case 200:
//       return 'OK';
//     case 201:
//       return 'Created';
//      case 400:
//       return 'Bad Request';
//     case 401:
//     case 403:
//       return 'Auth eror';
//     case 404:
//       return 'Not Found';
//     case 500:
//       return 'serv erorr';
//     default:
//       return 'Unknown Code';
//   }
// }
// console.log(handleStatusCode(200));

// for (let i = 1; i <= 3; i++) {
//   console.log(`Спроба ${i}: надсилаємо запит до API...`);
// }
// const statusCodes = [200, 201, 204, 'lol'];

// for (const code of statusCodes) {
//   console.log(`Перевіряємо код: ${code}`);
// }
// const testResults = ['passed', 'passed', 'failed', 'passed'];
// for (const status of testResults){
//   if (status === 'failed'){
//     console.log('Знайдено падіння тесту');
//     break;
//   } else {
//     console.log('Тест пройдено');
//   }
// }

// const prices = [120, 450, -10, 890];
// for(const random of prices){
//   if(random <=0){
//     console.log('Знайдено невалідну ціну');
//     continue;
//   } else {
//     console.log('всьо класно')
//   }
// }

// for (let i=1; i<=4; i++){
//   console.log(`Створено юзера test_user_${i}:`)
// }

// let battery = 100
// while(battery > 70){
//   console.log(`заряд battery ${battery}`)
//   battery =battery-10
// }

// let attemptsb = 5;
// do {
//   console.log(`Спроба #${attemptsb}: виконуємо дію мінімум один раз`);
//   attemptsb++;
// } while (attemptsb < 3);

// let count = 10;
// do{
//   console.log(`Поточне число: ${count}`);
//   count--;
// } while (count >5)

// const user = {
//   name: 'Ivan',
//   role: 'QA Engineer',
//   status: 'active'
// };

// for (const key in user) {
//   console.log(`Ключ: ${key}, Значення: ${user[key]}`);
// }

// const testSuite = {
//   authTest: 'passed',
//   checkoutTest: 'failed',
//   searchTest: 'passed'
// };
// for (const key in testSuite){
//   if (testSuite[key] === 'failed' ){
//     console.log(`Увага! Тест ${key} впав!`)
//   }
// }
// const environmentConfig = {
//   baseUrl: 'https://staging.example.com',
//   browser: 'chromium',
//   apiKey: '',
//   timeout: '5000'
// };
// for(const key in environmentConfig){
//   if (environmentConfig[key] === ''){
//     console.log(`помилка в ${key}`)
//   }
// }

// const generateTestUsers = (count) =>{
//     const result = [];
//     for(let i=1; i<=count; i++){
//         result.push(`user_${i}`)
//     }
//     return result
// }
// const user = generateTestUsers(3);
// console.assert(user.length===3);
// console.assert(user[0]==='user_1');

// const getFailedResponses = (statusCodes) => {
//   const result = [];
//   for (const code of statusCodes) {
//     if (code >= 500) {
//       result.push(code);
//     }
//   }
//   return result;
// };
// const stat = [200, 404, 500, 502, 201]
// const actual = getFailedResponses(stat);
// console.assert(actual.length === 2, 'Очікувалась довжина 2');

// const getCriticalBugs= (priorities)=>{
//     const result = [];
//     for (const status of priorities){
//         if (status === 'critical'){
//             result.push(status)
//         }
//     }
//     return result;
// }
// const mas = ['low', 'critical', 'medium', 'critical', 'high']
// const actual=getCriticalBugs(mas)
// console.assert(actual.length === 2)

// const getSlowRequests = (responseTimes)=>{
//     const result = [];
//     for (const time of responseTimes){
//         if (time > 1000){
//             result.push(time)
//         }
//     }
//     return result
// }
// const rn = [250, 1200, 800, 3400, 1000]
// const actual = getSlowRequests(rn)
// console.assert(actual.length === 2)
// console.assert(actual[0] === 1200)

// const rn = ' run'
// console.log(rn.length[-1])

// const countItems = (items) => {
//   let phone = 0;
//   let other = 0;

//   for (const device of items) {
//     if (device === 'phone') {
//       phone++;
//     } else {
//       other++;
//     }
//   }

//   return { phone, other };
// };

// const calculatePassRate = (passed, total) => {
//   let rate = 0;

//   if (total === 0) {
//     rate = 0;
//   } else {
//     rate = (passed / total) * 100;
//   }

//   return Number(rate.toFixed(2));
// };

// const cart = ['phone', 'laptop', 'phone', 'book', 'tablet'];
// const counts = countItems(cart);
// console.log('Кількість товарів:', counts);
// const rate1 = calculatePassRate(2, 3);
// console.log('Відсоток успіху (2 з 3):', rate1);
// const rateZero = calculatePassRate(0, 0);
// console.log('Відсоток успіху (0 з 0):', rateZero);

// const analyzeScores = (scores) =>{
//     let passedCount = 0;
//     let failedCount = 0;
//     let abset = 0;

//     for (const mark of scores){
//         if (mark >= 50 ){ passedCount++
//         } else if (mark < 50 && mark > 0 ){ failedCount++
//         } else if (mark === 0){abset++
//         }
//     }
//     const attended = passedCount + failedCount;
//     let successRate = 0;
//     if (attended === 0){
//         successRate = 0
//     } else {
//         successRate= (passedCount / attended) * 100;
//     }
//     successRate = Number(successRate.toFixed(2));
//     return {passedCount, failedCount, abset, successRate}
// }

// const sem1 = [85, 42, 90, 55, 70, 30]
// console.log(analyzeScores(sem1));

// const userData = { username: 'sviatoslav', email: 'test@example.com' };
// const user2 = { username: 'sviatoslav', email: 'bad-email.com' };


// const validateUser =(user) =>{
//     const {username,email}=user;
//     if (!username){
//         throw new Error('problem')
//     }
//     if (!email || !email.includes('@')){
//         throw new Error('Невалідний формат email')
//     }
//     return 'данні валідні'
// }

// const register = (user) => {
//     try{
//         validateUser(user);
//         return {success: true};
//     } catch (error) {
//         return { success: false, reason: error.message };
//     }
// }

// console.log(register(userData))
// console.log(register(user2))

const payment1 = { amount: 250, currency: 'UAH', recipient: 'Ivan' };
const payment2 = { amount: -50, currency: 'USD', recipient: 'Anna' };
const payment3 = { amount: 100, currency: 'EUR', recipient: '' };

const validatePayment=(payment)=>{
    const {amount,currency,recipient}=payment;
    if (!amount|| amount<=0){
        throw new Error ('Сума має бути більшою за нуль')
    }
    if (!recipient){
        throw new Error ('Вкажіть отримувача')
    }
    return true
}
const processPayment= (payment) =>{
    try{
        validatePayment(payment);
        return {status: 'success', message: 'Платіж проведено'};
    } catch (error){
        return {status: 'failed', reason: eror.message}
    }
}

// const orders = [101, 102, 103, 104];

// const getOrder = (orders, index) => {
//   return orders[index];
// };

// const updateOrder=(orders, index, newId)=>{
//     orders[index]= newId
//     return orders
// }

// const addOrderToEnd=(orders, newId)=>{
//     orders.push(newId)
//     return orders
// }

// const removeOrderFromEnd=(orders)=>{
//     orders.pop()
//     return orders
// }

// const addPriorityOrder=(orders, newId)=>{
//     orders.unshift(newId)
//     return orders
// }

// const processFirstOrder = (orders)=>{
//     orders.shift()
//     return orders
// }

// const removeOrderByIndex = (orders, index)=>{
//     orders.splice(index,1)
//     return orders
// }

// const checkQueueSize = (orders, expectedSize) =>{
//     return orders.length === expectedSize;
// }


const addOrderToEnd = (orders, newId) => {
  return [...orders, newId]; //Додати в кінець
};

const addPriorityOrder = (orders, newId) => {
  return [newId, ...orders]; //Додати на початок
};

const removeOrderFromEnd = (orders) => {
  return orders.slice(0, -1); //Видалити останній або перший елемент (прибрати останній)
};

const removeOrderFromStart = (orders) => {
  return orders.slice(1); //Видалити останній або перший елемент (прибрати перший)
};

// console.log(orders)
// console.log(addOrderToEnd(orders, 13))
// console.log(addPriorityOrder(orders, 13))
// console.log(removeOrderFromEnd(orders))
// console.log(removeOrderFromStart(orders))
// console.log(orders)

const amounts = [45, 120, 300, 550, 15, 200];

const getBigAmounts = (amounts) =>{
    return amounts.filter((items) => {
        return items>=100
    })
}

// console.log(getBigAmounts(amounts))
// console.log(amounts)


const ordersв = [
  { id: 1, status: 'completed', amount: 350 },
  { id: 2, status: 'cancelled', amount: 120 },
  { id: 3, status: 'completed', amount: 890 },
  { id: 4, status: 'pending', amount: 50 },
  { id: 5, status: 'completed', amount: 410 }
];

const  getCompletedOrders =(ordersList) =>{
    return ordersList.filter((item) => {
        return item.status === 'completed'
    })
}

// console.log(getCompletedOrders(orders))

// const users = [
//   { id: 1, name: 'Олександр', age: 17, isActive: true },
//   { id: 2, name: 'Марія', age: 24, isActive: true },
//   { id: 3, name: 'Тарас', age: 31, isActive: false },
//   { id: 4, name: 'Олена', age: 19, isActive: true },
//   { id: 5, name: 'Дмитро', age: 16, isActive: false }
// ];

// const getValidUsers = (usersList) =>{
//     return usersList.filter((item) => {
//         return item.age>=18 && item.isActive === true
//     })
// }
// console.log(getValidUsers(users))

// const pricesInUSD = [10, 25, 50, 100];
// const convertToUAH = (pricesList, rate) =>{
//     return pricesList.map((price) => {
//         return price*rate
//     })
// }
// console.log(convertToUAH(pricesInUSD,20))

// const users = [
//   { id: 101, name: 'Олександр', role: 'admin' },
//   { id: 102, name: 'Марія', role: 'user' },
//   { id: 103, name: 'Тарас', role: 'moderator' }
// ];

// const getUserNames=(usersList)=>{
//     return usersList.map((namo)=> namo.name )
// }
// console.log(getUserNames(users))

// const cart = [
//   { title: 'Ноутбук', price: 32000, inStock: true },
//   { title: 'Мишка', price: 800, inStock: false },
//   { title: 'Клавіатура', price: 2100, inStock: true },
//   { title: 'Монітор', price: 9500, inStock: false },
//   { title: 'Навушники', price: 1500, inStock: true }
// ];

// const getAvailableProductTitles = (cartList) =>{
//     return cartList.filter((tovar)=> tovar.inStock === true)
//     .map((tovar)=> tovar.title)
// }
// console.log(getAvailableProductTitles(cart))

const ordern = [
  { id: 1, amount: 250, isVip: false },
  { id: 2, amount: 1200, isVip: true },
  { id: 3, amount: 400, isVip: false },
  { id: 4, amount: 3000, isVip: true },
  { id: 5, amount: 800, isVip: true }
];

const getDiscountedVipPrices = (ordersList)=>{
    return ordersList.filter ((VIP) => VIP.isVip === true)
    .map ((VIP)=> VIP.amount*0.9)
}
// console.log(getDiscountedVipPrices(ordern))

class User1 {
  // 1. Конструктор: запускається автоматично при виклику new User(...)
  constructor(name, role) {
    this.name = name; // створюємо властивість для конкретного об'єкта
    this.role = role;
  }

  // 2. Метод: дія, яку цей об'єкт вміє робити
  login() {
    return `${this.name} увійшов у систему як ${this.role}`;
  }
}

// // Створення екземплярів (об'єктів):
// const user1 = new User1('Олександр', 'admin');
// const user2 = new User1('Марія', 'tester');



class User{
    constructor(username,email){
        this.username=username
        this.email=email
        this.isLoggedIn = false
    }
    get info() {
        return `${this.username} (${this.email})`
    }
    static compare(userA, userB){
        if (userA.username=== userB.username) { return true} else { return false}
    }
    login() {
        this.isLoggedIn = true
        return `${this.isLoggedIn} проходиь`
    }
    logout() {
        this.isLoggedIn = false
        return `${this.isLoggedIn} не проходиь`
    }
}


class Admin extends User{
    #token = 'secret_token_123'
    constructor (username, email, role){
        super (username,email)
        this.role=role
    }
    deleteUser(targetUsername){
        return  `${this.username} видалив користувача ${targetUsername}`
    }
    login(){
        const baseLog = super.login()
        if ( this.isLoggedIn === true){ return `Якесь повідомлення ${baseLog}` } else { return 'ніяке повідомлення'}
    }
    getToken(){
        if (this.isLoggedIn === true){
        return this.#token
    }
        return 'доступ заборонено'
    }
}

const admin = new Admin('Root', 'root@sys.com', 'SuperAdmin');
// console.log (admin.username)
// console.log (admin.isLoggedIn)
// console.log (admin.login())
// console.log (admin.isLoggedIn)
// console.log (admin.logout())
// console.log (admin.isLoggedIn)
// console.log (admin.deleteUser('random'))

// console.log(admin.getToken()); // "Доступ заборонено: увійдіть у систему"
// admin.login();
// console.log(admin.getToken()); // "secret_token_123"
// console.log(user.info)

// const u1 = new User('Alex', 'alex@test.com');
// const u2 = new User('Alex', 'alex2@test.com');
// const u3 = new User('Bob', 'bob@test.com');

// console.log (User.compare(u1,u2))
// console.log (User.compare(u1,u3))

const user = new User('Alex', 'alex@test.com');

// console.assert(user.isLoggedIn === false , 'Має бути false на старті')
// user.login()
// console.assert(user.isLoggedIn === true, "Має бути true після логіну")
// console.assert(user.username === 'Max', 'Ім’я користувача не збігається з очікуваним!');

// Звичайна функція
function getNumber() {
  return 42;
}

// Асинхронна функція
async function getNumberAsync() {
  return 42; 
}

// console.log(getNumber());      // 42
// console.log(getNumberAsync()); // Promise { 42 }

// Функція-імітація запиту до сервера (повертає Promise із затримкою)
// const fetchUser = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve({ id: 1, name: 'Sviatoslav' }), 1000);
//   });
// };

// // Використання в звичайному коді:
// async function run() {
//   console.log('Початок запиту...');
  
//   // await буквально чекає 1 секунду і повертає чистий об'єкт:
//   const user = await fetchUser(); 
  
//   console.log('Дані отримано:', user.name); // 'Sviatoslav'
//   console.log('Кінець');
// }

// run();

// async function getUserProfile(userId) {
//   try {
//     // 1. Пробуємо виконати небезпечні асинхронні дії:
//     const response = await fetch(`https://api.example.com/users/${userId}`);
//     const data = await response.json();
    
//     return data;
//   } catch (error) {
//     // 2. Якщо сервер віддав помилку або інтернет упав — виконання перестрибує сюди:
//     console.error('Не вдалося отримати профіль:', error.message);
//     return null; // або викидаємо помилку далі
//   } finally {
//     // 3. Виконується завжди (закрити лоадер, записати логи тощо)
//     console.log('Запит завершено');
//   }
// }

// test('успішний логін користувача', async ({ page }) => {
//   // Кожна дія з браузером потребує часу, тому скрізь стоїть await:
//   await page.goto('https://myapp.com/login');
//   await page.fill('#username', 'alex');
//   await page.fill('#password', 'secret123');
//   await page.click('#submit-btn');

//   const welcomeText = await page.textContent('.welcome-message');
  
//   console.assert(welcomeText === 'Привіт, alex!', 'Текст привітання не збігається');
// });

// const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// async function startGame() {
//   console.log('Ініціалізація гри...');

//   await wait(1000)
//   console.log ('шось')

//    await wait(1000)
//   console.log ('Завантаження текстур')
// }

// startGame()

// Функція, яка нібито робить запит до бекенду і повертає Promise:
// const fetchUserData = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ id: 101, username: 'test_user', status: 'active' });
//     }, 1000);
//   });
// };

// async function checkUserStatus() {
//     const user = await fetchUserData()
//     console.log(`Користувач: ${user.username}, статус: ${user.status}`)
// }
//  checkUserStatus()

// 1. Повертає Promise з числом 42 через 1 секунду
// const getUserId = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(42), 1000);
//   });
// };

// // 2. Приймає id і повертає Promise з балансом через 1 секунду
// const getUserBalance = (id) => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(`Баланс користувача ${id}: 1500 грн`), 1000);
//   });
// };

// async function showBalance(){
//     const idUser = await getUserId()
//     const idBalance = await getUserBalance(idUser)
//     console.log(idBalance)
// }
// showBalance()

// const login = (password) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (password === 'admin123') {
//         resolve('Успішний вхід!');
//       } else {
//         reject(new Error('Невірний пароль'));
//       }
//     }, 1000);
//   });
// };

// async function handleLogin(pass) {
//   try {
//     const result = await login(pass); // Чекаємо успішний результат
//     console.log(result);              // Друкуємо: 'Успішний вхід!'
//   } catch (error) {                    // Обов'язково вказуємо (error)
//     console.log(`Помилка входу: ${error.message}`);
//   }
// }

// async function getTodoItem() {
//   try {
//     console.log('1. Надсилаємо запит до сервера...');

//     // Запит летить через інтернет. await чекає на відповідь від сервера
//     const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');

//     // Сервер віддав потік байтів, чекаємо його розпакування в звичайний JS-об'єкт
//     const data = await response.json();

//     console.log('2. Відповідь отримано успішно!');
//     console.log(`Задача: "${data.title}", статус виконання: ${data.completed}`);

//     // Перевірка (Assertion), як у реальному автотесті:
//     console.assert(data.id === 1, 'Помилка: ID задачі має бути 1');
//   } catch (error) {
//     // Якщо зникне інтернет або впаде сервер — ми тут:
//     console.error('Сталася мережева помилка:', error.message);
//   }
// }


// async function getUser(id) {
//     try{
//         console.log ("Просто перевірка чи працює запит до сервака")
//         const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
//         console.assert(response.ok, `Сервер повернув статус помилки: ${response.status}`);
//         if (!response.ok) {
//       throw new Error(`Помилка HTTP: ${response.status}`);
//     }
//         const data = await response.json()
//         console.log(`Користувач: ${data.name} ${data.email}`)
//         console.assert(data.id === id, "помилка в id")
//     }
//     catch (error){
//         console.error('помилка така то', error.message)
//     }
// }

// getUser(2)

const mapArray = (arr, fn)=>{
    const mas = []
    for(let i=0; i < arr.length-1; i++){
        if (fn(arr[i],i)){
            mas.push(fn(arr[i],i))
        }
    }
    return mas
}

const reduceArray = (nums, fn, init) => {
  let res = init; // 1. Беремо стартове значення
  for (let i = 0; i < nums.length; i++) { // 2. Проходимо по кожному елементу
    res = fn(res, nums[i]); // 3. Оновлюємо акумулятор через fn
  }
  return res; // 4. Повертаємо одне число/значення
};

const colors = ['червоний', 'зелений', 'синій', 'жовтий',31];
const trimArray = (arr) =>{
    return arr.slice(1,arr.length - 1)
}


const doubleNumbers = (arr)=>{
    return arr.map((n) => n*2)
}

const getPositiveNumbers = (arr) => {
    return arr.filter((n)=>n>=0)
}
const numbers = [-5, 10, -2, 25, 0, -1, 30];

const getDiscountedPrices = (prices)=> {
    return prices
    .filter((n) => n>0)
    .map((n)=> n*0.8)
    .slice(0,2)
}
const price = [50, 200, 80, 150, 300, 90];

const getTopPassedScores = (scores) => {
    return scores
    .filter((n)=> n >= 60)
    .map((n) => n+5)
    .slice(0,3)
}

const processOddNumbers = (numbers) =>{
    return numbers
    .filter((n)=> n % 2 !== 0)
    .map((n)=> n**2)
    .slice(0,3)
}

const total = numbers.reduce ((acc, curr) => {
    return acc + curr
}, 0)

const multiplyAll = (numbers) => {
    return numbers.reduce((acc,curr)=>{
    return acc * curr
    },1)
}

const order = [
    { id: 1, status: 'completed', amount: 250 },
    { id: 2, status: 'pending', amount: 100 },
    { id: 3, status: 'completed', amount: 400 },
    { id: 4, status: 'canceled', amount: 50 },
    { id: 5, status: 'completed', amount: 150 }
];

const getRevenueWithTax = (orders)=>{
    return orders
    .filter(({status}) => status === 'completed')
    .map(({amount})=> amount*1.2)
    .reduce((acc,curr)=>{
        return acc+curr
    },0)
}

const users = [
    { id: 1, name: 'Олексій', age: 17, isActive: true },
    { id: 2, name: 'Марія', age: 22, isActive: false },
    { id: 3, name: 'Ярослав', age: 19, isActive: true },
    { id: 4, name: 'Вікторія', age: 15, isActive: true }
];

const getAdultActiveUserNames = (users) => {
    return users
    .filter (({isActive, age}) => isActive === true && age >=18)
    .map (({name})=> name)
}

const inventory = [
    { id: 1, name: 'Ноутбук', price: 30000, quantity: 2, inStock: true },
    { id: 2, name: 'Мишка', price: 500, quantity: 0, inStock: false },
    { id: 3, name: 'Монітор', price: 8000, quantity: 3, inStock: true },
    { id: 4, name: 'Клавіатура', price: 1500, quantity: 5, inStock: true },
    { id: 5, name: 'планшет', price: 4124, quantity: 0, inStock: true }
];

const getTotalInventoryValue = (inventory)=>{
    return inventory
    .filter (({inStock}) => inStock === true)
    .map (({quantity,price}) => quantity*price)
    .reduce((acc,curr) =>{
        return acc+curr
    },0)
}
// console.log(getTotalInventoryValue(inventory))

const getUserDiscount = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(15); // Знижка 15%
        }, 100);
    });
};

const applyDiscount= async (originalPrice) =>{
    const discount = await getUserDiscount()
    const full = originalPrice - (originalPrice * discount/100)
    return full
}

const main1 = async() =>{
    const full= await applyDiscount(1000)
    console.log(full)
}


const getItemPrice = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(1200), 100);
    });
};

const getShippingCost = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(150), 100);
    });
};

const getTotalOrderPrice = async () =>{
    const [price , cost] = await Promise.all([getItemPrice(), getShippingCost()])
    return price + cost
}

const main3 = async () =>{
    const sum = await getTotalOrderPrice()
    console.log(sum)
}

const promise1 = new Promise(resolve => setTimeout(() => resolve(2), 20));
const promise2 = new Promise(resolve => setTimeout(() => resolve(5), 60));

const addTwoPromises= async (promise1 ,promise2) =>{
    const [pr,mp] = await Promise.all([promise1,promise2])
    return pr+mp
}

const main = async()=>{
    const sum = await addTwoPromises(promise1,promise2)
    console.log(sum)
}

const fillTank = (capacity) =>{
    let curentwatter = 0
    let bucket = 0
    while (curentwatter<capacity){
        curentwatter = curentwatter +15 
        bucket = bucket + 1 
    }
    return bucket
}

const timeToFullCharge = (battery)=>{
    let minute = 0
    while (battery<=100){
        minute +=1
        battery +=8
    }
    return minute
}

const countBanknotes = (targetAmount) =>{
    let wallet = 0
    let currentSum = 0
    while (currentSum < targetAmount){
        wallet +=1
        currentSum +=50
    }
    return wallet
}
const monthsToSave = (laptopPrice) =>{
    let savedmoney= 0
    let month = 0
    while (savedmoney < laptopPrice){
        month+=1
        savedmoney+=150
    }
    return month
}

const rollUntilSix = () => {
  let attempts = 0;
  let dice = 0;

  do {
    attempts +=1
    dice +=1
  } while (dice !== 6)
  return attempts;
};

const requestedAmount = (money )=> {
    let paper = 0
    let suma = 0
    do {
        paper +=1
        suma +=500
    } while (suma < money)
    return paper
}

const fillCar = (capacity, groups) => {
  let seatedPeople = 0;

  do {
    const nextGroup = groups.shift(); // Беремо першу групу (наприклад, 3)
    seatedPeople += nextGroup;       // Додаємо всіх людей з цієї групи
  } while (seatedPeople < capacity && groups.length > 0);

  return groups; // Повертаємо чергу, яка залишилася
};

const sellTickets = (maxTickets, groups)=>{
    let Allsold = 0 
    do{
        const newGroup = groups.shift()
        Allsold += newGroup
    } while (Allsold<maxTickets && groups.length>0)
        return groups
}

const fuelCars = (availableFuel, cars) =>{
    let fuel = 0
    do{
        const newCarsGroup = cars.shift()
        fuel += newCarsGroup
    } while (fuel<availableFuel && cars.length>0)
        return cars
}

const getTrafficLightAction = (color) =>{
    switch (color) {
        case 'red':
        return 'Стоп';
        case 'yellow':
        return 'Почекай';
        case 'green':
        return 'їдь';
        default:
        return 'Світлофор зламався'

    }
}

const cleanAndDouble = (code) =>{
    const reversCode = code.split('').reverse().join('')
    const num = Number(reversCode)
    if (num) {
        return num * 2 
    }
    return 'Invalid code'
}
const isCardValid = (cardNumber) =>{
    if (!cardNumber) {
    return false;
  }
    const string = String(cardNumber)
    const reverseCardNumber= string.split('').reverse().join('')
    if (string === reverseCardNumber){
        return true
    }
    return false
}

const sumReversed = (a, b) =>{
    if(!a || !b){
        return 'Invalid input'
    }
    const stringA = String(a)
    const stringB = String(b)
    const reveA = stringA.split('').reverse().join('')
    const reveB = stringB.split('').reverse().join('')
    const numA = Number(reveA)
    const numB = Number(reveB)
    return numA+numB
}

const sumReversed2 = (a, b) => {
  if (!a || !b) return 'Invalid input';

  const numA = Number(String(a).split('').reverse().join(''));
  const numB = Number(String(b).split('').reverse().join(''));

  return numA + numB;
};
