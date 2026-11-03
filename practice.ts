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