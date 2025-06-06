// Define interfaces for the data structure
interface Company {
    catchPhrase: string;
    // Add other company properties if needed
}

interface UserComment {
    company: Company;
    name: string;
    username: string;
    // Add other user properties if needed
}

interface CardData {
    text: string;
    avatar: string;
    name: string;
    description: string;
    specialClass: string;
}

// получение данных с сервера
async function fetchCards(): Promise<CardData[]> {
    try {
        const response = await fetch('./jsonplaceholder-users.json');
        const comments: UserComment[] = await response.json();
        
        //комментарии в формат карточек
        return comments.map((comment: UserComment, index: number) => ({
            text: comment.company.catchPhrase,
            avatar: `./img/avatars/${index + 1}.png`, // локальные аватары
            name: comment.name,
            description: comment.username,
            specialClass: index === 2 ? "praise__item--left" : "" //особый класс для карточки 3
        }));
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return [];
    }
}

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

async function renderCards(): Promise<void> {
    const container = document.querySelector('.praise__reviews');
    if (!container) return;
    
    container.innerHTML = '';

    const cards = await fetchCards(); // Получаем данные с сервера
    
    if (cards.length === 0) {
        container.innerHTML = '<p>Не удалось загрузить данные</p>';
        return;
    }

    cards.forEach(card => {
        const cardElement = createCardElement(card);
        container.insertAdjacentHTML('beforeend', cardElement);
    });
}

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

function modalOpen(): void {
    const modal = document.querySelector('.modal') as HTMLElement;
    if (modal) {
        modal.style.display = "flex";
    }
}

function modalClose(): void {
    const modal = document.querySelector('.modal') as HTMLElement;
    if (modal) {
        modal.style.display = "none";
    }
}

setTimeout(() => {
    const preloader = document.querySelector('.preloader') as HTMLElement;
    if (preloader) {
        preloader.innerHTML = '';
        preloader.style.display = "none";
    }
}, 500);

document.addEventListener('DOMContentLoaded', function () {
    renderCards();
    namesSwiper();
});