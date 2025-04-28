import quizQuestions from "../data/quiz.json";

export interface QuizState {
    started: boolean;
    index: number;
    score: number;
    awaitingAnswer: boolean;
}

export const initialQuizState: QuizState = {
    started: false,
    index: 0,
    score: 0,
    awaitingAnswer: false,
};

export const startQuiz = (): QuizState => ({
    started: true,
    index: 0,
    score: 0,
    awaitingAnswer: true,
});

export const getQuizQuestionText = (index: number) => {
    const question = quizQuestions[index];
    const optionsFormatted = question.options.map(opt => `- ${opt}`).join("\n");
    return `❓ ${question.question}\n${optionsFormatted}`;
};

export const checkQuizAnswer = (userInput: string, quizState: QuizState) => {
    const correctAnswer = quizQuestions[quizState.index].answer.toLowerCase();
    const userAnswer = userInput.trim().toLowerCase();

    const isCorrect = userAnswer === correctAnswer;
    return {
        isCorrect,
        correctAnswer: quizQuestions[quizState.index].answer,
    };
};

export const isQuizFinished = (index: number) => {
    return index >= quizQuestions.length;
};

export const getQuizLength = () => {
    return quizQuestions.length;
};

export const buildFinalScoreMessage = (score: number) => {
    const total = getQuizLength();
    return `🏁 Fim do quiz! Você acertou ${score} de ${total} perguntas.`;
};
