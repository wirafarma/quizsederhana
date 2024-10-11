const quizData = [
    {
        question: "Apa ibukota Indonesia?",
        a: "Jakarta",
        b: "Bandung",
        c: "Surabaya",
        d: "Medan",
        correct: "a",
        explanation: "Jakarta adalah ibu kota Indonesia."
    },
    {
        question: "Siapa presiden pertama Indonesia?",
        a: "Joko Widodo",
        b: "Soeharto",
        c: "Bung Karno",
        d: "Megawati",
        correct: "c",
        explanation: "Soekarno, sering disebut Bung Karno, adalah presiden pertama Indonesia."
    },
    {
        question: "Apa bahasa pemrograman yang digunakan untuk pengembangan web frontend?",
        a: "Python",
        b: "JavaScript",
        c: "C#",
        d: "Java",
        correct: "b",
        explanation: "JavaScript adalah bahasa pemrograman utama untuk pengembangan web frontend."
    },
    {
        question: "Apa singkatan dari HTML?",
        a: "HyperText Markup Language",
        b: "HighText Machine Language",
        c: "HyperText and links Markup Language",
        d: "None of the above",
        correct: "a",
        explanation: "HTML adalah singkatan dari HyperText Markup Language."
    }
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const resultDiv = document.getElementById('result');

let currentQuiz = 0;
let score = 0;

// Fungsi untuk memuat quiz
function loadQuiz() {
    deselectAnswers();

    if (currentQuiz < quizData.length) {
        const currentQuizData = quizData[currentQuiz];

        questionEl.innerText = currentQuizData.question;
        a_text.innerText = currentQuizData.a;
        b_text.innerText = currentQuizData.b;
        c_text.innerText = currentQuizData.c;
        d_text.innerText = currentQuizData.d;

        // Menampilkan progress
        showProgress();
    }
}

// Fungsi untuk menghapus pilihan yang dipilih
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

// Fungsi untuk mendapatkan jawaban yang dipilih
function getSelected() {
    let answer = undefined;

    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

// Fungsi untuk menampilkan progress
function showProgress() {
    const progress = document.createElement('div');
    progress.classList.add('progress');
    progress.innerText = `Pertanyaan ${currentQuiz + 1} dari ${quizData.length}`;
    quiz.insertBefore(progress, submitBtn);
}

// Fungsi untuk menghapus progress sebelum memuat pertanyaan baru
function removeProgress() {
    const progress = document.querySelector('.progress');
    if (progress) {
        progress.remove();
    }
}

// Event listener untuk tombol submit
submitBtn.addEventListener('click', () => {
    const answer = getSelected();

    if(answer) {
        const currentQuizData = quizData[currentQuiz];
        removeProgress();

        if(answer === currentQuizData.correct){
            score++;
            showFeedback(true, currentQuizData.explanation);
        } else {
            showFeedback(false, currentQuizData.explanation);
        }

        currentQuiz++;

        if(currentQuiz < quizData.length){
            setTimeout(loadQuiz, 3000); // Memuat pertanyaan berikutnya setelah 3 detik
        } else {
            setTimeout(showFinalResult, 3000); // Menampilkan hasil akhir setelah 3 detik
        }
    } else {
        alert("Silakan pilih jawaban sebelum melanjutkan.");
    }
});

// Fungsi untuk menampilkan umpan balik
function showFeedback(isCorrect, explanation) {
    if(isCorrect){
        resultDiv.innerHTML = `<p class="correct">Jawaban benar! <br> ${explanation}</p>`;
    } else {
        resultDiv.innerHTML = `<p class="incorrect">Jawaban salah. <br> ${explanation}</p>`;
    }

    // Menghapus umpan balik setelah 3 detik
    setTimeout(() => {
        resultDiv.innerHTML = "";
    }, 3000);
}

// Fungsi untuk menampilkan hasil akhir
function showFinalResult() {
    quiz.innerHTML = `
        <h2>Quiz Selesai!</h2>
        <p>Skor Anda: ${score} dari ${quizData.length}</p>
        <button onclick="location.reload()">Mulai Ulang</button>
    `;
}

// Memuat quiz pertama kali
loadQuiz();

