// ===== Question Bank =====
const questions = [
    {
        question: "The scientific study of the diversity of organisms and their evolutionary relationships is called:",
        options: ["Ecology", "Systematics", "Genetics", "Evolution"],
        correct: 1
    },
    {
        question: "The term 'taxonomy' was first used by:",
        options: ["Linnaeus", "De Candolle", "Whittaker", "Aristotle"],
        correct: 1
    },
    {
        question: "The basic unit of classification is:",
        options: ["Genus", "Order", "Species", "Family"],
        correct: 2
    },
    {
        question: "The five-kingdom system of classification was proposed by:",
        options: ["Linnaeus", "Whittaker", "Woese", "Haeckel"],
        correct: 1
    },
    {
        question: "The three-domain system of classification was proposed by:",
        options: ["Whittaker", "Aristotle", "Woese", "Linnaeus"],
        correct: 2
    },
    {
        question: "Which of the following is not a taxonomic rank?",
        options: ["Phylum", "Order", "Class", "Population"],
        correct: 3
    },
    {
        question: "Numerical taxonomy is based on:",
        options: ["Evolutionary relationship", "Observable characters and statistics", "Chromosome number", "Genetic sequencing"],
        correct: 1
    },
    {
        question: "Chemotaxonomy uses:",
        options: ["External morphology", "Chromosome behavior", "Chemical composition of cells", "Statistical data"],
        correct: 2
    },
    {
        question: "Which of the following classification systems is based on evolutionary relationships?",
        options: ["Artificial", "Natural", "Phylogenetic", "Numerical"],
        correct: 2
    },
    {
        question: "The sequence of taxonomic categories in ascending order is:",
        options: [
            "Species → Genus → Family → Order → Class → Phylum → Kingdom",
            "Kingdom → Phylum → Class → Order → Family → Genus → Species",
            "Family → Order → Class → Phylum → Kingdom → Species → Genus",
            "None of these"
        ],
        correct: 0
    }
];

// ===== App State =====
const state = {
    currentQuestion: 0,
    answers: new Array(questions.length).fill(null),
    studentName: '',
    studentRoll: '',
    startTime: null,
    endTime: null,
    timeRemaining: 15 * 60,
    timerInterval: null
};

// ===== DOM Elements =====
const elements = {
    welcomeScreen: document.getElementById('welcomeScreen'),
    testScreen: document.getElementById('testScreen'),
    studentName: document.getElementById('studentName'),
    studentRoll: document.getElementById('studentRoll'),
    startBtn: document.getElementById('startBtn'),
    quesInfo: document.getElementById('quesInfo'),
    questionText: document.getElementById('questionText'),
    optionsBox: document.getElementById('optionsBox'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    submitBtn: document.getElementById('submitBtn'),
    progressBar: document.getElementById('progressBar'),
    timer: document.getElementById('timer'),
    timerDisplay: document.getElementById('timerDisplay'),
    resultsModal: document.getElementById('resultsModal'),
    reviewModal: document.getElementById('reviewModal'),
    confirmModal: document.getElementById('confirmModal'),
    toast: document.getElementById('toast'),
    toastMsg: document.getElementById('toastMsg')
};

// ===== Utility Functions =====
function showToast(message, duration = 2000) {
    elements.toastMsg.textContent = message;
    elements.toast.classList.add('show');
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, duration);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ===== Start Test =====
document.getElementById('startBtn').addEventListener('click', () => {
    const name = elements.studentName.value.trim();
    if (!name) {
        showToast('Please enter your name!');
        return;
    }
    
    state.studentName = name;
    state.studentRoll = elements.studentRoll.value.trim();
    state.startTime = Date.now();
    
    elements.welcomeScreen.style.display = 'none';
    elements.testScreen.style.display = 'block';
    
    displayQuestion();
    startTimer();
    showToast('Test started! Good luck!');
});

// ===== Display Question =====
function displayQuestion() {
    const question = questions[state.currentQuestion];
    
    // Update question info
    elements.quesInfo.textContent = `Question ${state.currentQuestion + 1} of ${questions.length}`;
    elements.questionText.textContent = question.question;
    
    // Update progress bar
    const progress = ((state.currentQuestion + 1) / questions.length) * 100;
    elements.progressBar.style.width = `${progress}%`;
    
    // Display options
    elements.optionsBox.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        
        if (state.answers[state.currentQuestion] === index) {
            optionDiv.classList.add('selected');
        }
        
        optionDiv.innerHTML = `
            <div class="option-label">${String.fromCharCode(65 + index)}</div>
            <div class="option-text">${option}</div>
        `;
        
        optionDiv.addEventListener('click', () => selectOption(index));
        elements.optionsBox.appendChild(optionDiv);
    });
    
    // Update buttons
    elements.prevBtn.disabled = state.currentQuestion === 0;
    if (state.currentQuestion === questions.length - 1) {
        elements.nextBtn.style.display = 'none';
    } else {
        elements.nextBtn.style.display = 'flex';
    }
    
    window.scrollTo(0, 0);
}

// ===== Select Option =====
function selectOption(index) {
    state.answers[state.currentQuestion] = index;
    displayQuestion();
    showToast('Answer selected!', 1000);
}

// ===== Navigation =====
document.getElementById('prevBtn').addEventListener('click', () => {
    if (state.currentQuestion > 0) {
        state.currentQuestion--;
        displayQuestion();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (state.currentQuestion < questions.length - 1) {
        state.currentQuestion++;
        displayQuestion();
    }
});

// ===== Submit Test =====
document.getElementById('submitBtn').addEventListener('click', () => {
    const unanswered = state.answers.filter(ans => ans === null).length;
    const msg = document.getElementById('confirmMsg');
    
    if (unanswered > 0) {
        msg.textContent = `You have ${unanswered} unanswered question(s). Submit anyway?`;
    } else {
        msg.textContent = 'Are you sure you want to submit the test?';
    }
    
    elements.confirmModal.classList.add('active');
});

document.getElementById('confirmSubmitBtn').addEventListener('click', () => {
    elements.confirmModal.classList.remove('active');
    submitTest();
});

document.getElementById('cancelBtn').addEventListener('click', () => {
    elements.confirmModal.classList.remove('active');
});

// ===== Submit Test Logic =====
function submitTest() {
    state.endTime = Date.now();
    clearInterval(state.timerInterval);
    
    calculateResults();
    
    elements.testScreen.style.display = 'none';
    elements.resultsModal.classList.add('active');
}

// ===== Calculate Results =====
function calculateResults() {
    let correct = 0;
    state.answers.forEach((answer, index) => {
        if (answer === questions[index].correct) {
            correct++;
        }
    });
    
    const incorrect = state.answers.filter(ans => ans !== null).length - correct;
    const percentage = (correct / questions.length) * 100;
    const timeTaken = Math.floor((state.endTime - state.startTime) / 1000);
    
    // Update results display
    document.getElementById('scoreValue').textContent = correct;
    document.getElementById('correctCount').textContent = correct;
    document.getElementById('incorrectCount').textContent = questions.length - correct;
    document.getElementById('percentage').textContent = `${percentage.toFixed(1)}%`;
    document.getElementById('timeTaken').textContent = formatTime(timeTaken);
    
    // Update score circle
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (percentage / 100) * circumference;
    document.getElementById('scoreProgress').style.strokeDashoffset = offset;
    
    // Performance message and icon
    const perfMsg = document.getElementById('performanceMsg');
    const resIcon = document.getElementById('resultsIcon');
    
    resIcon.className = 'results-icon';
    
    if (percentage >= 80) {
        perfMsg.textContent = '🎉 Excellent! You have a strong understanding of the concepts. Keep it up!';
        resIcon.classList.add('excellent');
    } else if (percentage >= 60) {
        perfMsg.textContent = '👍 Good job! You performed well. Practice more to improve further.';
        resIcon.classList.add('good');
    } else if (percentage >= 40) {
        perfMsg.textContent = '📚 Fair attempt. Review the topics and practice more.';
        resIcon.classList.add('average');
    } else {
        perfMsg.textContent = '💪 Don\'t worry! Study the material and try again.';
        resIcon.classList.add('poor');
    }
}

// ===== Review Answers =====
document.getElementById('reviewBtn').addEventListener('click', () => {
    showReview();
});

function showReview() {
    const reviewContent = document.getElementById('reviewContent');
    reviewContent.innerHTML = '';
    
    questions.forEach((question, index) => {
        const userAnswer = state.answers[index];
        const correctAnswer = question.correct;
        const isCorrect = userAnswer === correctAnswer;
        
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        const userAnswerText = userAnswer !== null ? question.options[userAnswer] : 'Not Answered';
        const correctAnswerText = question.options[correctAnswer];
        
        reviewItem.innerHTML = `
            <div class="review-item-header">
                <span class="review-question-num">Q${index + 1}</span>
                <span class="review-badge ${isCorrect ? 'correct' : 'incorrect'}">
                    ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </span>
            </div>
            <div class="review-question-text">${question.question}</div>
            <div class="review-answer ${isCorrect ? 'correct' : 'incorrect'}">
                Your Answer: ${userAnswerText}
            </div>
            ${!isCorrect ? `<div class="review-answer correct">Correct Answer: ${correctAnswerText}</div>` : ''}
        `;
        
        reviewContent.appendChild(reviewItem);
    });
    
    elements.resultsModal.classList.remove('active');
    elements.reviewModal.classList.add('active');
}

document.getElementById('backBtn').addEventListener('click', () => {
    elements.reviewModal.classList.remove('active');
    elements.resultsModal.classList.add('active');
});

document.getElementById('closeReviewBtn').addEventListener('click', () => {
    elements.reviewModal.classList.remove('active');
    elements.resultsModal.classList.add('active');
});

// ===== Download Results =====
document.getElementById('downloadBtn').addEventListener('click', () => {
    const correct = state.answers.filter((ans, idx) => ans === questions[idx].correct).length;
    const percentage = (correct / questions.length) * 100;
    const timeTaken = Math.floor((state.endTime - state.startTime) / 1000);
    
    let content = `BIOLOGY TEST RESULTS
Chapter 1 & 2: Systematics & Classification
==========================================

STUDENT INFORMATION
-------------------
Name: ${state.studentName}
Roll Number: ${state.studentRoll || 'N/A'}
Date: ${new Date().toLocaleString()}

SCORE SUMMARY
-------------
Total Questions: ${questions.length}
Correct Answers: ${correct}
Incorrect Answers: ${questions.length - correct}
Score: ${correct}/${questions.length}
Percentage: ${percentage.toFixed(1)}%
Time Taken: ${formatTime(timeTaken)}

DETAILED ANSWERS
----------------
`;
    
    questions.forEach((q, idx) => {
        const userAns = state.answers[idx];
        const correctAns = q.correct;
        const isCorrect = userAns === correctAns;
        
        content += `
Q${idx + 1}: ${q.question}
Your Answer: ${userAns !== null ? q.options[userAns] : 'Not Answered'}
Correct Answer: ${q.options[correctAns]}
Status: ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
---`;
    });
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Biology-Test-Results-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Results downloaded!');
});

// ===== Retake Test =====
document.getElementById('restartBtn').addEventListener('click', () => {
    state.currentQuestion = 0;
    state.answers = new Array(questions.length).fill(null);
    state.timeRemaining = 15 * 60;
    
    elements.studentName.value = '';
    elements.studentRoll.value = '';
    
    elements.resultsModal.classList.remove('active');
    elements.testScreen.style.display = 'none';
    elements.welcomeScreen.style.display = 'block';
    
    clearInterval(state.timerInterval);
    showToast('Test reset. Ready to start again?');
});

// ===== Timer =====
function startTimer() {
    state.timerInterval = setInterval(() => {
        state.timeRemaining--;
        elements.timer.textContent = formatTime(state.timeRemaining);
        
        if (state.timeRemaining <= 120) {
            elements.timerDisplay.classList.add('warning');
        }
        
        if (state.timeRemaining <= 0) {
            clearInterval(state.timerInterval);
            showToast('Time is up! Submitting test...', 2000);
            setTimeout(() => submitTest(), 2000);
        }
    }, 1000);
}

// ===== Initialize =====
window.addEventListener('load', () => {
    console.log('Biology Test App Loaded!');
});
