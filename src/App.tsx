import { useState, useEffect } from "react";
import ChatContainer from "./components/ChatContainer";
import InputBox from "./components/InputBox";
import { getBotResponse } from "./services/botResponse";
import {
	initialQuizState,
	startQuiz,
	getQuizQuestionText,
	checkQuizAnswer,
	isQuizFinished,
	buildFinalScoreMessage,
	QuizState
} from "./services/quizManager";

interface IMessage {
	sender: "user" | "bot";
	text: string;
}

export default function App() {
	const [messages, setMessages] = useState<IMessage[]>(() => {
		const saved = localStorage.getItem("chatMessages");
		return saved ? JSON.parse(saved) : [];
	});

	const [input, setInput] = useState("");
	const [botIsTyping, setBotIsTyping] = useState(false);
	const [quizState, setQuizState] = useState<QuizState>(initialQuizState);

	useEffect(() => {
		localStorage.setItem("chatMessages", JSON.stringify(messages));
	}, [messages]);

	const handleSend = () => {
		if (input.trim() === "") return;
	  
		const userMessage: IMessage = { sender: "user", text: input };
		setMessages((prev) => [...prev, userMessage]);
	  
		const userMessagesCount = messages.filter(m => m.sender === "user").length + 1;
		const hasQuizInvite = messages.some(m => m.text.includes("participar de um quiz"));
	  
		if (input.toLowerCase() === "quiz") {
			initiateQuiz();
			setInput("");
			return;
		}
	  
		if (hasQuizInvite && !quizState.started) {
			if (input.toLowerCase() === "sim") {
				initiateQuiz();
				setInput("");
				return;
			}
			if (input.toLowerCase() === "não") {
				setMessages((prev) => [...prev, { sender: "bot", text: "Beleza! Se mudar de ideia, é só digitar 'quiz'! 🎯" }]);
				setInput("");
				return;
			}
		}
	  
		if (quizState.awaitingAnswer) {
			processQuizAnswer(input);
			setInput("");
			return;
		}
	  
		const botReplyText = getBotResponse(input);
		setBotIsTyping(true);
		setInput("");
	  
		// simulate bot typing
		// 500ms + 30ms per character, max 2s
		const typingTime = Math.min(2000, 500 + botReplyText.length * 30);
	  
		setTimeout(() => {
			setMessages((prev) => [...prev, { sender: "bot", text: botReplyText }]);
			setBotIsTyping(false);
		
			if (userMessagesCount === 3 && !hasQuizInvite) {
				setTimeout(() => {
					setMessages((prev) => [
						...prev,
						{ sender: "bot", text: "🎯 Você gostaria de participar de um quiz sobre a FURIA? (responda 'sim' ou 'não')" }
					]);
				}, 2000);
			}
	  
		}, typingTime);
	};
	  
  	const initiateQuiz = () => {
		const newQuizState = startQuiz();
		const firstQuestion = getQuizQuestionText(newQuizState.index);

		setQuizState(newQuizState);
		setMessages((prev) => [...prev, { sender: "bot", text: firstQuestion }]);
  	};

  	const processQuizAnswer = (input: string) => {
    	const { isCorrect, correctAnswer } = checkQuizAnswer(input, quizState);

    	if (isCorrect) {
      		setMessages((prev) => [...prev, { sender: "bot", text: "✅ Resposta correta!" }]);
      		setQuizState((prev) => ({ ...prev, score: prev.score + 1 }));
    	} else {
      		setMessages((prev) => [...prev, { sender: "bot", text: `❌ Resposta errada. Resposta correta: ${correctAnswer}` }]);
    	}

    	const nextIndex = quizState.index + 1;

    	if (isQuizFinished(nextIndex)) {
			const finalMessage = buildFinalScoreMessage(
			  quizState.score + (isCorrect ? 1 : 0)
			);
			setTimeout(() => {
			  setMessages((prev) => [...prev, { sender: "bot", text: finalMessage }]);
			}, 1000);
		  
			setQuizState(initialQuizState); // 
		  } else {
			const nextQuestion = getQuizQuestionText(nextIndex);
			setTimeout(() => {
				setMessages((prev) => [...prev, { sender: "bot", text: nextQuestion }]);
				setQuizState((prev) => ({ ...prev, index: nextIndex, awaitingAnswer: true }));
			}, 1000);
    	}
  	};

	const handleClearChat = () => {
		if (window.confirm("Tem certeza que deseja limpar o chat?")) {
			setMessages([]);
			localStorage.removeItem("chatMessages");
		}
	};

  	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
			<h1 className="text-3xl font-bold mb-6">🐾 FURIA CS Chatbot</h1>
			<div className="w-full flex justify-end max-w-md mb-4">
				<button 
					onClick={handleClearChat}
					className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
				>
					Limpar Chat
				</button>
			</div>
			<ChatContainer messages={messages} botIsTyping={botIsTyping} />
			<InputBox input={input} setInput={setInput} onSend={handleSend} botIsTyping={botIsTyping} />
		</div>
  	);
}
