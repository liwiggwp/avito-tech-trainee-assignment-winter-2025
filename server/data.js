const bcrypt = require('bcryptjs');

const ItemTypes = {
  REAL_ESTATE: 'Недвижимость',
  AUTO: 'Авто',
  SERVICES: 'Услуги',
};

const initialUsers = [
  {
    id: 1,
    email: 'test@example.com',
    password: bcrypt.hashSync('test@example.com', 10), 
  },
  {
    id: 2,
    email: 'test2@example.com',
    password: bcrypt.hashSync('test2@example.com', 10), 
  },
];

const initialItems = [
  // Недвижимость
  {
    userId: 1,
    name: 'Квартира в центре',
    description: 'Просторная квартира в центре города с ремонтом',
    location: 'Москва',
    type: ItemTypes.REAL_ESTATE,
    propertyType: 'Квартира',
    area: 85,
    rooms: 3,
    price: 12000000,
    imageUrl: 'http://localhost:5000/uploads/placeholder.jpg', 
  },
  {
    userId: 1,
    name: 'Загородный дом',
    description: 'Прекрасный дом в экологически чистом районе',
    location: 'Санкт-Петербург',
    type: ItemTypes.REAL_ESTATE,
    propertyType: 'Дом',
    area: 200,
    rooms: 5,
    price: 25000000,
    imageUrl: 'http://localhost:5000/uploads/placeholder.jpg', 
  },
  {
    userId: 1,
    name: 'Офисное помещение',
    description: 'Офис 100 м² в бизнес-центре',
    location: 'Новосибирск',
    type: ItemTypes.REAL_ESTATE,
    propertyType: 'Офис',
    area: 100,
    rooms: 4,
    price: 8000000,
    imageUrl: 'http://localhost:5000/uploads/placeholder.jpg', 
  },
  {
    userId: 2,
    name: 'Таунхаус в Подмосковье',
    description: 'Современный таунхаус в закрытом поселке',
    location: 'Москва',
    type: ItemTypes.REAL_ESTATE,
    propertyType: 'Таунхаус',
    area: 120,
    rooms: 4,
    price: 18000000,
    imageUrl: 'http://localhost:5000/uploads/placeholder.jpg', 
  },
  {
    userId: 2,
    name: 'Гараж',
    description: 'Кирпичный гараж в центре города',
    location: 'Казань',
    type: ItemTypes.REAL_ESTATE,
    propertyType: 'Гараж',
    area: 25,
    rooms: 1,
    price: 500000,
    imageUrl: 'http://localhost:5000/uploads/placeholder.jpg', 
  },
  {
    userId: 2,
    name: 'Земельный участок',
    description: 'Участок 15 соток с коммуникациями',
    location: 'Ростов-на-Дону',
    type: ItemTypes.REAL_ESTATE,
    propertyType: 'Участок',
    area: 1500,
    rooms: '/uploads/home_repair.jpg',
    price: 3000000,
    imageUrl: 'http://localhost:5000/uploads/placeholder.jpg', 
  },
  {
    userId: 1,
    name: 'Апартаменты с видом на море',
    description: 'Роскошные апартаменты с панорамным видом',
    location: 'Сочи',
    type: ItemTypes.REAL_ESTATE,
    propertyType: 'Апартаменты',
    area: 110,
    rooms: 3,
    price: 30000000,
    imageUrl: 'http://localhost:5000/uploads/placeholder.jpg', 
  },

  // Авто
  {
    userId: 1,
    name: 'BMW X5',
    description: 'Отличный кроссовер в идеальном состоянии',
    location: 'Москва',
    type: ItemTypes.AUTO,
    brand: 'BMW',
    model: 'X5',
    year: 2019,
    mileage: 40000,
    imageUrl: 'http://localhost:5000/uploads/placeholder.jpg', 
  },
  {
    userId: 1,
    name: 'Mercedes-Benz E-Класс',
    description: 'Комфортный седан с кожаным салоном',
    location: 'Сочи',
    type: ItemTypes.AUTO,
    brand: 'Mercedes-Benz',
    model: 'E 200',
    year: 2021,
    mileage: 20000,
    imageUrl: 'http://localhost:5000/uploads/placeholder.jpg', 
  },
  {
    userId: 2,
    name: 'Lada Vesta',
    description: 'Новый автомобиль, без пробега',
    location: 'Казань',
    type: ItemTypes.AUTO,
    brand: 'Lada',
    model: 'Vesta',
    year: 2023,
    mileage: 0,
    imageUrl: 'http://localhost:5000/uploads/placeholder.jpg', 
  },
  {
    userId: 2,
    name: 'Toyota Corolla',
    description: 'Экономичный и надежный авто',
    location: 'Екатеринбург',
    type: ItemTypes.AUTO,
    brand: 'Toyota',
    model: 'Corolla',
    year: 2018,
    mileage: 60000,
    imageUrl: 'http://localhost:5000/uploads/placeholder.jpg', 
  },
  {
    userId: 2,
    name: 'Audi A6',
    description: 'Бизнес-седан с отличной динамикой',
    location: 'Санкт-Петербург',
    type: ItemTypes.AUTO,
    brand: 'Audi',
    model: 'A6',
    year: 2020,
    mileage: 30000,
    imageUrl: 'http://localhost:5000/uploads/placeholder.jpg', 
  },
  {
    userId: 1,
    name: 'Volkswagen Tiguan',
    description: 'Надежный кроссовер для города и загорода',
    location: 'Челябинск',
    type: ItemTypes.AUTO,
    brand: 'Volkswagen',
    model: 'Tiguan',
    year: 2019,
    mileage: 50000,
    imageUrl: 'http://localhost:5000/uploads/placeholder.jpg',
  },

  // Услуги
  {
    userId: 1,
    name: 'Ремонт автомобилей',
    description: 'Качественный ремонт двигателей и подвески',
    location: 'Москва',
    type: ItemTypes.SERVICES,
    serviceType: 'Автосервис',
    experience: 10,
    cost: 3000,
    workSchedule: 'Пн-Пт, 9:00-20:00',
    imageUrl: 'http://localhost:5000/uploads/placeholder.jpg', 
  },
  {
    userId: 1,
    name: 'Уроки английского',
    description: 'Индивидуальные занятия с опытным преподавателем',
    location: 'Санкт-Петербург',
    type: ItemTypes.SERVICES,
    serviceType: 'Обучение',
    experience: 5,
    cost: 1500,
    workSchedule: 'Пн-Сб, 10:00-19:00',
    imageUrl: 'http://localhost:5000/uploads/placeholder.jpg',
  },
  {
    userId: 2,
    name: 'Клининг офисов',
    description: 'Профессиональная уборка офисных помещений',
    location: 'Екатеринбург',
    type: ItemTypes.SERVICES,
    serviceType: 'Клининг',
    experience: 3,
    cost: 5000,
    workSchedule: 'Ежедневно, 8:00-22:00',
    imageUrl: 'http://localhost:5000/uploads/placeholder.jpg', 
  },
  {
    userId: 2,
    name: 'Репетитор по математике',
    description: 'Подготовка к ЕГЭ и ОГЭ',
    location: 'Ростов-на-Дону',
    type: ItemTypes.SERVICES,
    serviceType: 'Обучение',
    experience: 7,
    cost: 2000,
    workSchedule: 'Пн-Сб, 9:00-18:00',
    imageUrl: 'http://localhost:5000/uploads/placeholder.jpg', 
  },
  {
    userId: 2,
    name: 'Доставка еды',
    description: 'Быстрая доставка блюд из ресторанов',
    location: 'Москва',
    type: ItemTypes.SERVICES,
    serviceType: 'Доставка',
    experience: 2,
    cost: 500,
    workSchedule: 'Круглосуточно',
    imageUrl: 'http://localhost:5000/uploads/placeholder.jpg', 
  },
  {
    userId: 1,
    name: 'Фотосессии',
    description: 'Портретная и студийная съемка',
    location: 'Санкт-Петербург',
    type: ItemTypes.SERVICES,
    serviceType: 'Фотография',
    experience: 6,
    cost: 4000,
    workSchedule: 'Пн-Вс, 10:00-21:00',
    imageUrl: 'http://localhost:5000/uploads/placeholder.jpg', 
  },
  {
    userId: 1,
    name: 'Ремонт бытовой техники',
    description: 'Ремонт холодильников и стиральных машин',
    location: 'Челябинск',
    type: ItemTypes.SERVICES,
    serviceType: 'Ремонт',
    experience: 8,
    cost: 2500,
    workSchedule: 'Пн-Сб, 8:00-19:00',
    imageUrl: 'http://localhost:5000/uploads/placeholder.jpg', 
  },
];

module.exports = { initialItems, ItemTypes, initialUsers };