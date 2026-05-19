/*
    Reveal cinematic fondo
*/

function revealBackground() {

    const bg = document.querySelector(
        '.background'
    );

    bg.classList.add(
        'cinematic-reveal'
    );

    setTimeout(() => {

        bg.classList.remove(
            'cinematic-reveal'
        );

    }, 1000);

}

/*
    Fade In
*/

function fadeIn(element) {

    element.classList.add('fade-in');

    setTimeout(() => {

        element.classList.remove('fade-in');

    }, 500);

}

/*
    Modal animado
*/

function showModal(modal) {

    modal.classList.remove('hidden');

    const card = modal.querySelector(
        '.modal-card, .result-card'
    );

    if (card) {

        card.classList.add('modal-show');

        setTimeout(() => {

            card.classList.remove('modal-show');

        }, 350);

    }

}

/*
    Ocultar modal
*/

function hideModal(modal) {

    modal.classList.add('hidden');

}

/*
    Zoom fondo
*/

function zoomBackground() {

    const bg = document.querySelector(
        '.background'
    );

    bg.classList.add('zoom');

    setTimeout(() => {

        bg.classList.remove('zoom');

    }, 800);

}

/*
    Cambio imagen
*/

function changeBackground(image) {

    const bg = document.querySelector(
        '.background'
    );

    bg.style.backgroundImage =
        `url(${image})`;

    fadeIn(bg);

}