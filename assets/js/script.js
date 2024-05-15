//Inital Data
let currentQuestion = 0;
let correctAnswers = 0;
showQuestion();


//Events

document.querySelector('.scoreArea button').addEventListener('click', resetQuestion);

//Functions
function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let percentage = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${percentage}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;

        let optionsHtml = '';
        for (let i in q.options) {
            optionsHtml += `<div data-op ='${i}' class="option"><span>${parseInt(i) + 1}</span> ${q.options[i]} </div>`;
        }

        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });

    } else {
        finishQuiz();

    }
};



function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if (questions[currentQuestion].answer === clickedOption) {
        correctAnswers += 1;

    }

    currentQuestion += 1;
    showQuestion();
};

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100)

    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Muito ruim em?!';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if (points >= 0 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bem!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if (points > 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
        document.querySelector('.scorePct').style.color = '#008000';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `100%`;
};

function resetQuestion() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}