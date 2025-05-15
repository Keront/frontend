const cards = {
    card_1: {
        text: "I can always find what I'm looking for on Splice, whether it's the exact sound I want or just a bit of inspiration.",
        avatar: "./img/avatars/1.png",
        name: "Andrew Huang",
        description: "Artist",
        specialClass: ""
    },
    card_2: {
        text: "Finally a way to buy plugins that works. By paying a little at a time, producers can get legit access to the top VSTs.",
        avatar: "./img/avatars/2.png",
        name: "KSHMR",
        description: "Artist",
        specialClass: ""
    },
    card_3: {
        text: "It's been fun to dive into Splice's creator community and explore tools that support my own creative process.",
        avatar: "./img/avatars/3.png",
        name: "Kesha Lee",
        description: "Artist",
        specialClass: "praise__item--left"
    },
    card_4: {
        text: "I can always find what I'm looking for on Splice, whether it's the exact sound I want or just a bit of inspiration.",
        avatar: "./img/avatars/1.png",
        name: "Andrew Huang",
        description: "Artist",
        specialClass: ""
    }
};


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
    const container = document.querySelector('.praise__reviews');


    container.innerHTML = '';


    for (const cardKey in cards) {
        if (cards.hasOwnProperty(cardKey)) {
            const cardElement = createCardElement(cards[cardKey]);
            container.insertAdjacentHTML('beforeend', cardElement);
        }
    }
}

// //////////////////////////////////////////
function namesSwiper() {
    new Swiper('.featured-in__many-names', {
        slidesPerView: 5,  // Показывает столько слайдов, сколько помещается
        spaceBetween: 80,        // Убирает отступы между слайдами
        loop: true,             // Бесконечная прокрутка
        autoplay: {
            delay: 2000,        //Задержка между переключениями
        },
        speed: 2000,            //Скорость переключения
        direction: 'horizontal', //Горизонтальное направление
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