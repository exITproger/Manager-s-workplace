export interface ProductCharacteristic {
  name: string
  value: string
}

export interface Product {
  id: string
  name: string
  price: string
  quantity: string
  image: string
  category: string
  description: string
  characteristics: ProductCharacteristic[]
}

export const products: Product[] = [
  {
    id: '100001',
    name: 'Coca-Cola 0.5L',
    price: '89',
    quantity: '24',
    image: '/phone.jpg',
    category: 'Газированные напитки',
    description: 'Классическая Coca-Cola в пластиковой бутылке объёмом 0.5 литра.',
    characteristics: [
      { name: 'Объём', value: '0.5 л' },
      { name: 'Производитель', value: 'Coca-Cola' },
      { name: 'Страна производства', value: 'Россия' },
      { name: 'Тип упаковки', value: 'Пластиковая бутылка' },
      { name: 'Вкус', value: 'Классический' }
    ]
  },
  {
    id: '100002',
    name: 'Pepsi 0.5L',
    price: '79',
    quantity: '18',
    image: '/phone.jpg',
    category: 'Газированные напитки',
    description: 'Освежающий газированный напиток Pepsi с насыщенным вкусом.',
    characteristics: [
      { name: 'Объём', value: '0.5 л' },
      { name: 'Производитель', value: 'PepsiCo' },
      { name: 'Страна производства', value: 'Россия' },
      { name: 'Тип упаковки', value: 'Пластиковая бутылка' },
      { name: 'Вкус', value: 'Кола' },
      { name: 'С сахаром', value: 'Да' }
    ]
  },
  {
    id: '100003',
    name: 'Lay’s Classic',
    price: '129',
    quantity: '32',
    image: '/phone.jpg',
    category: 'Снэки',
    description: 'Классические картофельные чипсы с лёгкой солёностью.',
    characteristics: [
      { name: 'Вес', value: '140 г' },
      { name: 'Производитель', value: 'Lay’s' },
      { name: 'Страна производства', value: 'Россия' },
      { name: 'Вкус', value: 'Классический' },
      { name: 'Тип упаковки', value: 'Мягкая упаковка' }
    ]
  },
  {
    id: '100004',
    name: 'Snickers',
    price: '99',
    quantity: '41',
    image: '/phone.jpg',
    category: 'Шоколадные батончики',
    description: 'Шоколадный батончик с арахисом, карамелью и нугой.',
    characteristics: [
      { name: 'Вес', value: '50 г' },
      { name: 'Производитель', value: 'Mars' },
      { name: 'Страна производства', value: 'Россия' },
      { name: 'Состав', value: 'Шоколад, арахис, карамель, нуга' },
      { name: 'Тип упаковки', value: 'Индивидуальная упаковка' }
    ]
  },
  {
    id: '100005',
    name: 'Kinder Chocolate',
    price: '119',
    quantity: '27',
    image: '/phone.jpg',
    category: 'Шоколадные батончики',
    description: 'Молочный шоколад с нежной молочной начинкой.',
    characteristics: [
      { name: 'Вес', value: '100 г' },
      { name: 'Производитель', value: 'Ferrero' },
      { name: 'Страна производства', value: 'Италия' },
      { name: 'Вкус', value: 'Молочный шоколад' },
      { name: 'Количество в упаковке', value: '4 шт.' },
      { name: 'Тип упаковки', value: 'Картонная упаковка' }
    ]
  },
  {
    id: '100006',
    name: 'Red Bull 0.25L',
    price: '149',
    quantity: '15',
    image: '/phone.jpg',
    category: 'Энергетические напитки',
    description: 'Газированный энергетический напиток с кофеином и таурином.',
    characteristics: [
      { name: 'Объём', value: '0.25 л' },
      { name: 'Производитель', value: 'Red Bull' },
      { name: 'Страна производства', value: 'Австрия' },
      { name: 'Содержание кофеина', value: '32 мг / 100 мл' },
      { name: 'Вкус', value: 'Классический' },
      { name: 'Тип упаковки', value: 'Алюминиевая банка' },
      { name: 'С газом', value: 'Да' }
    ]
  }
]