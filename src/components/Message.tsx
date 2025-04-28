interface MessageProps {
    sender: "user" | "bot";
    text: string;
  }
  
const Message = ({ sender, text }: MessageProps) => {
    return (
      <div
        className={`flex items-start space-x-2 p-2 rounded transition-all duration-300 ease-out ${
          sender === "user"
            ? "justify-end bg-purple-500 text-right animate-slide-in-right"
            : "justify-start bg-gray-600 text-left animate-slide-in-left"
        }`}
      >
        {sender === "bot" && (
          <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            🤖
          </div>
        )}
        <div className="max-w-[70%] whitespace-pre-line">{text}</div>
        {sender === "user" && (
          <div className="flex-shrink-0 w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center text-white">
            🧑‍💻
          </div>
        )}
      </div>
    );
}

export default Message;
  