import { useEffect, useRef } from "react";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";

interface ChatContainerProps {
  messages: { sender: "user" | "bot"; text: string }[];
  botIsTyping: boolean;
}

const ChatContainer = ({ messages, botIsTyping }: ChatContainerProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, botIsTyping]);

    return (
        <div className="w-full max-w-md bg-gray-800 rounded-lg p-4 flex flex-col space-y-4 overflow-y-auto overflow-x-hidden h-[400px]">
            {
                messages.map((msg, index) => (
                    <Message key={index} sender={msg.sender} text={msg.text} />
                ))
            }
            {botIsTyping && <TypingIndicator />}
            {messages.length === 0 && (
                <div className="text-center text-gray-400">
                    Digite algo para começar a conversa!
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default ChatContainer;