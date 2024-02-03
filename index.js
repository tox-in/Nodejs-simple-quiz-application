import fetch from 'node-fetch';


let Questions = [];
let currQuestion = 0;
let score = 0;

async function fetchQuestions() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10');
        if (!response.ok) {
            throw new Error(`Something went wrong!!
            Unable to fetch the data`);
        }
        const data = await response.json();
        Questions = data.results;
    } catch (error) {
        console.log(error);
    }
}

async function startQuiz() {
    await fetchQuestions();
    if (Questions.length === 0) {
        console.log("Please Wait!! Loading Questions...");
    } else {
        loadQuestion();
    }
}

function loadQuestion() {
    console.log(Questions[currQuestion].question);
}

function nextQuestion() {
    if (currQuestion < Questions.length - 1) {
        currQuestion++;
        loadQuestion();
    } else {
        console.log(`You scored ${score} out of ${Questions.length}`);
        console.log("All Answers:");
        Questions.forEach((el, index) => {
            console.log(`${index + 1}. ${el.correct_answer}`);
        });
    }
}

startQuiz();
