// получение данных с сервера
async function fetchCards() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=4');
        const comments = await response.json();
        
        //комментарии в формат карточек
        return comments.map((comment, index) => ({
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

function createCardElement(cardData) {
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


async function renderCards() {
    const container = document.querySelector('.praise__reviews');
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

function namesSwiper() {
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
};

function modalOpen() {
    document.querySelector('.modal').style.display = "flex";
}

function modalClose() {
    document.querySelector('.modal').style.display = "none";
}

setTimeout(() => {
    const preloader = document.querySelector('.preloader');
    preloader.innerHTML = '';
    preloader.style.display = "none";
}, 500);

document.addEventListener('DOMContentLoaded', function () {
    renderCards();
    namesSwiper();
});