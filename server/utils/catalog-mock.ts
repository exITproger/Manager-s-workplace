export const MOCK_CATALOG = [
  {
    productId: 100001,
    name: 'Coca-Cola 0.5L',
    price: 89,
    quantity: 24,
    quantityInCart: 0,
    images: []
  },
  {
    productId: 100002,
    name: 'Pepsi 0.5L',
    price: 79,
    quantity: 18,
    quantityInCart: 0,
    images: []
  },
  {
    productId: 100003,
    name: 'Lay\'s Classic',
    price: 129,
    quantity: 32,
    quantityInCart: 0,
    images: []
  },
  {
    productId: 100004,
    name: 'Snickers',
    price: 99,
    quantity: 41,
    quantityInCart: 0,
    images: []
  },
  {
    productId: 100005,
    name: 'Kinder Chocolate',
    price: 119,
    quantity: 27,
    quantityInCart: 0,
    images: []
  },
  {
    productId: 100006,
    name: 'Red Bull 0.25L',
    price: 149,
    quantity: 15,
    quantityInCart: 0,
    images: []
  }
]

export const MOCK_PRODUCTS: Record<number, {
  quantity: number
  productId: number
  name: string
  price: number
  characteristics: { name: string; properties: { title: string; value: string }[] }[]
  description: string
  images: string[]
}> = {
  100001: {
    productId: 100001,
    name: 'Coca-Cola 0.5L',
    price: 89,
    quantity: 24,
    description: 'Классическая Coca-Cola в пластиковой бутылке объёмом 0.5 литра.',
    images: [],
    characteristics: [
      { name: 'Основные', properties: [
        { title: 'Объём', value: '0.5 л' },
        { title: 'Производитель', value: 'Coca-Cola' },
        { title: 'Страна производства', value: 'Россия' }
      ]},
      { name: 'Упаковка', properties: [
        { title: 'Тип упаковки', value: 'Пластиковая бутылка' },
        { title: 'Вкус', value: 'Классический' }
      ]}
    ]
  },
  100002: {
    productId: 100002,
    name: 'Pepsi 0.5L',
    price: 79,
    quantity: 18,
    description: 'Освежающий газированный напиток Pepsi с насыщенным вкусом.',
    images: [],
    characteristics: [
      { name: 'Основные', properties: [
        { title: 'Объём', value: '0.5 л' },
        { title: 'Производитель', value: 'PepsiCo' },
        { title: 'Страна производства', value: 'Россия' }
      ]},
      { name: 'Состав', properties: [
        { title: 'Тип упаковки', value: 'Пластиковая бутылка' },
        { title: 'Вкус', value: 'Кола' },
        { title: 'С сахаром', value: 'Да' }
      ]}
    ]
  },
  100003: {
    productId: 100003,
    name: 'Lay\'s Classic',
    price: 129,
    quantity: 32,
    description: 'Классические картофельные чипсы с лёгкой солёностью.',
    images: [],
    characteristics: [
      { name: 'Основные', properties: [
        { title: 'Вес', value: '140 г' },
        { title: 'Производитель', value: 'Lay\'s' },
        { title: 'Страна производства', value: 'Россия' }
      ]},
      { name: 'Упаковка', properties: [
        { title: 'Вкус', value: 'Классический' },
        { title: 'Тип упаковки', value: 'Мягкая упаковка' }
      ]}
    ]
  },
  100004: {
    productId: 100004,
    name: 'Snickers',
    price: 99,
    quantity: 41,
    description: 'Шоколадный батончик с арахисом, карамелью и нугой.',
    images: [],
    characteristics: [
      { name: 'Основные', properties: [
        { title: 'Вес', value: '50 г' },
        { title: 'Производитель', value: 'Mars' },
        { title: 'Страна производства', value: 'Россия' }
      ]},
      { name: 'Состав', properties: [
        { title: 'Состав', value: 'Шоколад, арахис, карамель, нуга' },
        { title: 'Тип упаковки', value: 'Индивидуальная упаковка' }
      ]}
    ]
  },
  100005: {
    productId: 100005,
    name: 'Kinder Chocolate',
    price: 119,
    quantity: 27,
    description: 'Молочный шоколад с нежной молочной начинкой.',
    images: [],
    characteristics: [
      { name: 'Основные', properties: [
        { title: 'Вес', value: '100 г' },
        { title: 'Производитель', value: 'Ferrero' },
        { title: 'Страна производства', value: 'Италия' }
      ]},
      { name: 'Состав', properties: [
        { title: 'Вкус', value: 'Молочный шоколад' },
        { title: 'Количество в упаковке', value: '4 шт.' },
        { title: 'Тип упаковки', value: 'Картонная упаковка' }
      ]}
    ]
  },
  100006: {
    productId: 100006,
    name: 'Red Bull 0.25L',
    price: 149,
    quantity: 15,
    description: 'Газированный энергетический напиток с кофеином и таурином.',
    images: [],
    characteristics: [
      { name: 'Основные', properties: [
        { title: 'Объём', value: '0.25 л' },
        { title: 'Производитель', value: 'Red Bull' },
        { title: 'Страна производства', value: 'Австрия' }
      ]},
      { name: 'Состав', properties: [
        { title: 'Содержание кофеина', value: '32 мг / 100 мл' },
        { title: 'Вкус', value: 'Классический' },
        { title: 'Тип упаковки', value: 'Алюминиевая банка' },
        { title: 'С газом', value: 'Да' }
      ]}
    ]
  }
}
