// function wrapInBox<T>(value: T) {
//   return { content: value };
// }

// // Тепер TypeScript сам підхоплює тип:
// const stringBox = wrapInBox('Успішний тест'); // T перетворюється на string
// const numberBox = wrapInBox(404);              // T перетворюється на number


// function getLastElement<T>(items:T) T {
//   return  items[items.length-1] 

function getLastElement<T>(items: number[]): number | undefined {
  return items[items.length - 1];
}

const lastNumber = getLastElement([10, 20, 30, 40]);

function formatError<T>(error: string | Error): string | Error {
  if (typeof error === 'string') {return error.toUpperCase()} else {return error.message}
}

interface TestCase {
  id: number;
  title: string;
  isAutomated: boolean;
  severity: 'critical'|'major'|'minor';
}

// const myTest: TestCase = {
//   id: 10,
//   title: 'hi',
//   isAutomated: true,
//   severity: 'critical'
// }

interface CreateProductRequest {
title: string
price: number
category: 'electronics' | 'clothing' | 'books'
inStock?: boolean
}

interface ProductResponse{
id: number
createdAt: string
title:string
price:number
category:'electronics' | 'clothing' | 'books'
inStock: boolean
}
function validateCreatedProduct(items: ProductResponse){
  if (items.id > 0 && items.price>0) {
    console.log(`Тест пройдено: Товар ${items.title} успішно з ID ${items.id}`)
    return true
  } else {
    console.log('Тест не пройдено: Некоректні id або price')
    return false
  }
}
const mockResponse: ProductResponse = {
  id: 10,
  createdAt: 'hi',
  title: 'hi',
  price: 8,
  category:'electronics',
  inStock: true
}
validateCreatedProduct(mockResponse)

function cleanUserIds(userIds: number[]): number {
  if (userIds.length === 0) return 0;
  let k = 1; 
  for (let i = 1; i < userIds.length; i++) {
    if (userIds[i] !== userIds[i - 1]) {
      userIds[k] = userIds[i]!; // Перезаписуємо значення
      k++;                     // Зсуваємо вказівник
    }
  }
  return k; // Повертаємо довжину унікального списку
}

function removeInactiveItems(cartItems: number[], unavailId: number): number {
  let k = 0
  for (let i =0; i<cartItems.length; i++){
    if (cartItems[i] !== unavailId) {
    cartItems[k] = cartItems [i]!
    k++
    }
  }
  return k
}

function formatCurrencies(codes: string[]): string[] {
    const currencies: Record<string, string> = {
    USD: 'Долар США',
    EUR: 'Євро',
    UAH: 'Гривня',
  };
  const result: string [] = [] 
  for(let i=0; i<codes.length;i++){
    const currencyName = currencies[codes[i]!] ?? 'Невідома валюта';
    result.push(currencyName)
  }
  return result
}

function calculateTotalPrice(items: string[]): number {
  const priceList: Record<string, number> = {
    'ITEM-1': 100,
    'ITEM-2': 250,
    'ITEM-3': 50,
  };
  let totalPrice = 0;
  for (let i = 0; i < items.length; i++) {
    const priceUnd = priceList[items[i]!] ?? 0;
    totalPrice += priceUnd 
  }
  return totalPrice;
}

function getTopCity(cities: string[]): string {
  const counts: Record<string, number> = {};
  let maxCount = 0;
  let topCity = '';

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i]!;

    // ДІЯ 1: Звертаємося до city (одне місто), а не cities (весь масив)
    const curent = (counts[city] ?? 0) + 1;
    counts[city] = curent;

    // ДІЯ 2: Перевіряємо, чи побили рекорд
    if (curent > maxCount) {
      maxCount = curent;
      topCity = city;
    }
  }

  return topCity;
}

function getCheapestCategory(categories: string[]): string {
  const priceList: Record<string, number> = {
    electronics: 500,
    clothing: 300,
    food: 50,
  };

  let minPrice = Infinity;
  let cheapestCategory = '';

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i]!;

    const curentPrice = (priceList[category] ?? Infinity) 
    if (curentPrice<minPrice) {
      minPrice = curentPrice
      cheapestCategory = category
    }
  }

  return cheapestCategory;
}

function getMostActiveUser(users: string[]): string {
  const comentList: Record<string,number> ={}
  let name = ''
  let howTimes = 0

  for (let i=0; i<users.length; i++){
    const user = users[i]!

    const comTime = (comentList[user] ?? 0) + 1 
    comentList[user] = comTime;
    
    if (comTime>howTimes){
    howTimes = comTime
    name = user
    }
  }
  return name
}