const questions = [
    // Question 1
    {
        question: "What does HTML stand for?",
        answer: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    // Question 2
    {
        question: "Which CSS property is used to change the background color?",
        answer: [
            { text: "bg-color", correct: false },
            { text: "color-background", correct: false },
            { text: "background-color", correct: true },
            { text: "background-style", correct: false }
        ]
    },
    // Question 3
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        answer: [
            { text: "# comment", correct: false },
            { text: "// comment", correct: true },
            { text: "&lt!-- comment --&gt", correct: false },
            { text: "/* comment */", correct: false }
        ]
    },
    // Question 4
    {
        question: "Which tag is used to display an image in HTML?",
        answer: [
            { text: "&ltpicture&gt", correct: false },
            { text: "&ltimg&gt", correct: true },
            { text: "&ltimage&gt", correct: false },
            { text: "&ltsrc&gt", correct: false }
        ]
    },
    // Question 5
    {
        question: "Which JavaScript method is used to write to the console?",
        answer: [
            { text: "console.log()", correct: true },
            { text: "print()", correct: false },
            { text: "document.log()", correct: false },
            { text: "log.console()", correct: false }
        ]
    },
    // Question 6
    {
        question: "In CSS, how do you make text bold?",
        answer: [
            { text: "font-weight: bold;", correct: true },
            { text: "text-weight: bold;", correct: false },
            { text: "font: bold;", correct: false },
            { text: "style: bold;", correct: false }
        ]
    }
];

const questionElement = document.querySelector(".question");
const answerButtons = document.querySelector(".answer-buttons");
const nextButton = document.querySelector(".next-btn");

let currenQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currenQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currenQuestion = questions[currenQuestionIndex];
    let questionNo = currenQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currenQuestion.question;

    currenQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handlenextButton() {
    currenQuestionIndex++;
    if (currenQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currenQuestionIndex < questions.length) {
        handlenextButton();
    } else {
        startQuiz();
    }
});

startQuiz();