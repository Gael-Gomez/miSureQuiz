/*
====================================
FORMSpree
====================================
*/

const FORMSPREE_URL =
    'https://formspree.io/f/xojbvkln';

/*
====================================
ELEMENTOS
====================================
*/

const introScreen = document.querySelector(
    '.intro-screen'
);

const questionScreen = document.querySelector(
    '.question-screen'
);

const finalScreen = document.querySelector(
    '.final-screen'
);

const startBtn = document.getElementById(
    'startBtn'
);

const questionText = document.getElementById(
    'questionText'
);

const answersContainer = document.getElementById(
    'answersContainer'
);

const questionCounter = document.getElementById(
    'questionCounter'
);

const progressFill = document.querySelector(
    '.progress-fill'
);

const confirmModal = document.querySelector(
    '.confirm-modal'
);

const resultModal = document.querySelector(
    '.result-modal'
);

const confirmBtn = document.getElementById(
    'confirmBtn'
);

const cancelBtn = document.getElementById(
    'cancelBtn'
);

const continueBtn = document.getElementById(
    'continueBtn'
);

const resultTitle = document.getElementById(
    'resultTitle'
);

const resultText = document.getElementById(
    'resultText'
);

/*
====================================
MUSICA
====================================
*/

const introMusic = document.getElementById(
    'introMusic'
);

const questionsMusic = document.getElementById(
    'questionsMusic'
);

const finalMusic = document.getElementById(
    'finalMusic'
);

/*
====================================
VARIABLES
====================================
*/

let currentQuestion = 0;

let selectedAnswer = null;

let playerName = '';

let points = 0;

let locked = false;

const results = [];

/*
====================================
MUSICA INTRO
====================================
*/

window.addEventListener('load', () => {

    if (introMusic) {

        introMusic.volume = 0.4;

        introMusic.play().catch(() => {

            console.log(
                'Esperando interacción usuario'
            );

        });

    }

});

/*
====================================
INICIAR
====================================
*/

startBtn.addEventListener('click', () => {

    const input = document.getElementById(
        'playerName'
    );

    if (input.value.trim() === '') {

        alert('Ingresá tu nombre ❤️');

        return;
    }

    playerName = input.value.trim();

    /*
        Música preguntas
    */

    if (introMusic) {

        introMusic.pause();

    }

    if (questionsMusic) {

        questionsMusic.volume = 0.35;

        questionsMusic.play();

    }

    /*
        Pantallas
    */

    introScreen.classList.add('hidden');

    questionScreen.classList.remove('hidden');

    loadQuestion();

});

/*
====================================
CARGAR PREGUNTA
====================================
*/

function loadQuestion() {

    locked = false;

    const q = questions[currentQuestion];

    /*
        Pregunta final
    */

    if (
        currentQuestion === questions.length - 1
    ) {

        if (questionsMusic) {

            questionsMusic.pause();

        }

        if (finalMusic) {

            finalMusic.volume = 0.45;

            finalMusic.play();

        }

    }

    /*
        Numero
    */

    questionCounter.innerText =
        `Pregunta ${currentQuestion + 1} de ${questions.length}`;

    /*
        Barra
    */

    progressFill.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    /*
        Texto
    */

    questionText.innerText = q.question;

    /*
        Fondo
    */

    changeBackground(q.image);

    /*
        Limpiar respuestas
    */

    answersContainer.innerHTML = '';

    /*
        Crear respuestas
    */

    q.answers.forEach((answer, index) => {

        const div = document.createElement('div');

        div.classList.add('answer');

        div.innerText = answer;

        /*
            Click respuesta
        */

        div.addEventListener('click', () => {

            if (locked) return;

            locked = true;

            selectedAnswer = index;

            /*
                Oscurecer otras
            */

            document
                .querySelectorAll('.answer')
                .forEach(el => {

                    el.style.opacity = '0.3';

                });

            /*
                Respuesta elegida
            */

            div.style.opacity = '1';

            div.style.background =
                'rgba(0,0,0,0.35)';

            div.style.border =
                '1px solid rgba(255,255,255,0.35)';

            showModal(confirmModal);

        });

        answersContainer.appendChild(div);

    });

}

/*
====================================
CANCELAR
====================================
*/

cancelBtn.addEventListener('click', () => {

    locked = false;

    /*
        Restaurar respuestas
    */

    document
        .querySelectorAll('.answer')
        .forEach(el => {

            el.style.opacity = '1';

            el.style.background =
                'rgba(255,255,255,0.07)';

        });

    hideModal(confirmModal);

});

/*
====================================
CONFIRMAR RESPUESTA
====================================
*/

confirmBtn.addEventListener('click', () => {

    hideModal(confirmModal);

    const q = questions[currentQuestion];

    /*
        Ocultar respuestas
    */

    document
        .querySelectorAll('.answer')
        .forEach(answer => {

            answer.classList.add(
                'answers-hide'
            );

        });

    /*
        Correcta?
    */

    const correct = Array.isArray(q.correct)

        ? q.correct.includes(selectedAnswer)

        : selectedAnswer === q.correct;

    /*
        Punto interno
    */

    if (correct) {

        points++;

    }

    /*
        Guardar
    */

    results.push({

        question: q.question,

        selectedAnswer:
            q.answers[selectedAnswer],

        correct: correct

    });

    /*
        Reveal cinematic
    */

    revealBackground();

    zoomBackground();

    /*
        Esperar reveal
    */

    setTimeout(() => {

        /*
            Modal resultado
        */

        resultModal.classList.remove(
            'hidden'
        );

        /*
            Abrirse desde centro
        */

        const resultCard = document.querySelector(
            '.result-card'
        );

        resultCard.classList.add(
            'center-open'
        );

        setTimeout(() => {

            resultCard.classList.remove(
                'center-open'
            );

        }, 700);

        /*
            Textos
        */

        resultTitle.innerText =
            correct
                ? 'Correcto ❤️'
                : 'Incorrecto 💔';

        resultText.innerText =
            correct
                ? q.texts.correct
                : q.texts.wrong;

        /*
            Bordes
        */

        resultCard.classList.remove(
            'correct',
            'wrong'
        );

        if (correct) {

            resultCard.classList.add(
                'correct'
            );

        } else {

            resultCard.classList.add(
                'wrong'
            );

        }

        /*
            Botón
        */

        if (
            currentQuestion ===
            questions.length - 1
        ) {

            continueBtn.innerText =
                'Terminar ❤️';

        } else {

            continueBtn.innerText =
                'Continuar ❤️';

        }

    }, 700);

});

/*
====================================
CONTINUAR
====================================
*/

continueBtn.addEventListener('click', () => {

    hideModal(resultModal);

    currentQuestion++;

    /*
        Fin
    */

    if (
        currentQuestion >= questions.length
    ) {

        finishGame();

    } else {

        loadQuestion();

    }

});

/*
====================================
FINAL
====================================
*/

async function finishGame() {

    questionScreen.classList.add(
        'hidden'
    );

    finalScreen.classList.remove(
        'hidden'
    );

    /*
        Datos
    */

    const data = {

        name: playerName,

        points: points,

        totalQuestions: questions.length,

        results: results,

        date: new Date()

    };

    /*
        Enviar a Formspree
    */

    try {

        const response = await fetch(
            FORMSPREE_URL,
            {
                method: 'POST',

                headers: {
                    'Content-Type':
                        'application/json',

                    'Accept':
                        'application/json'
                },

                body: JSON.stringify({
                    message:
                        JSON.stringify(
                            data,
                            null,
                            2
                        )
                })
            }
        );

        if (response.ok) {

            console.log(
                'Enviado correctamente ❤️'
            );

        } else {

            console.error(
                'Error enviando'
            );

        }

    } catch (error) {

        console.error(
            'Error:',
            error
        );

    }

}