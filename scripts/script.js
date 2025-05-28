var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// получение данных с сервера
function fetchCards() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('./jsonplaceholder-users.json');
            const comments = yield response.json();
            //комментарии в формат карточек
            return comments.map((comment, index) => ({
                text: comment.company.catchPhrase,
                avatar: `./img/avatars/${index + 1}.png`, // локальные аватары
                name: comment.name,
                description: comment.username,
                specialClass: index === 2 ? "praise__item--left" : "" //особый класс для карточки 3
            }));
        }
        catch (error) {
            console.error('Ошибка при загрузке данных:', error);
            return [];
        }
    });
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
function renderCards() {
    return __awaiter(this, void 0, void 0, function* () {
        const container = document.querySelector('.praise__reviews');
        if (!container)
            return;
        container.innerHTML = '';
        const cards = yield fetchCards(); // Получаем данные с сервера
        if (cards.length === 0) {
            container.innerHTML = '<p>Не удалось загрузить данные</p>';
            return;
        }
        cards.forEach(card => {
            const cardElement = createCardElement(card);
            container.insertAdjacentHTML('beforeend', cardElement);
        });
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
}
function modalOpen() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = "flex";
    }
}
function modalClose() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = "none";
    }
}
setTimeout(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.innerHTML = '';
        preloader.style.display = "none";
    }
}, 500);
document.addEventListener('DOMContentLoaded', function () {
    renderCards();
    namesSwiper();
});
//# sourceMappingURL=script.js.map