import Swiper from 'swiper';
import 'swiper/css';

//интерфейс данных карточки
interface CardData {
  text: string;
  avatar: string;
  name: string;
  description: string;
  specialClass: string;
}

//интерфейс данных пользователя
interface UserData {
  name: string;
  username: string;
  company: {
    catchPhrase: string;
  };
}

// Получение данных с сервера с типизацией
async function fetchCards(): Promise<CardData[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=4');
    const users: UserData[] = await response.json();
    
    return users.map((user, index): CardData => ({
      text: user.company.catchPhrase,
      avatar: `./img/avatars/${index + 1}.png`,
      name: user.name,
      description: user.username,
      specialClass: index === 2 ? "praise__item--left" : ""
    }));
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    return [];
  }
}

// Создание элемента карточки с типизацией параметров
function createCardElement(cardData: CardData): string {
  return `
    <div class="praise__item ${cardData.specialClass}">
      <p class="praise__item-text">${cardData.text}</p>
      <div class="praise__item-creator">
        <img class="praise__avatar" src="${cardData.avatar}" alt="${cardData.name}">
        <div class="praise__creator-block">
          <p class="praise__creator-name">${cardData.name}</p>
          <p class="praise__creator-description">${cardData.description}</p>
        </div>
      </div>
    </div>
  `;
}

// Рендер карточек с проверкой типа контейнера
async function renderCards(): Promise<void> {
  const container = document.querySelector('.praise__reviews');
  
  if (!(container instanceof HTMLElement)) {
    console.error('Контейнер не найден');
    return;
  }

  container.innerHTML = '';

  const cards = await fetchCards();
  
  if (cards.length === 0) {
    container.innerHTML = '<p>Не удалось загрузить данные</p>';
    return;
  }

  cards.forEach(card => {
    const cardElement = createCardElement(card);
    container.insertAdjacentHTML('beforeend', cardElement);
  });
}

// Типизация для Swiper
function namesSwiper(): void {
  new Swiper('.featured-in__many-names', {
    slidesPerView: 5,
    spaceBetween: 80,
    loop: true,
    autoplay: {
      delay: 2000,
    },
    speed: 2000,
    direction: 'horizontal',
  });
}

// Функции для модального окна с проверкой элементов
function modalOpen(): void {
  const modal = document.querySelector('.modal');
  if (modal instanceof HTMLElement) {
    modal.style.display = "flex";
  }
}

function modalClose(): void {
  const modal = document.querySelector('.modal');
  if (modal instanceof HTMLElement) {
    modal.style.display = "none";
  }
}

// Обработка прелоадера с проверкой элемента
setTimeout(() => {
  const preloader = document.querySelector('.preloader');
  if (preloader instanceof HTMLElement) {
    preloader.innerHTML = '';
    preloader.style.display = "none";
  }
}, 500);

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  renderCards();
  namesSwiper();
});