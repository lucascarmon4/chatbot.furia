interface InputBoxProps {
    input: string;
    setInput: (value: string) => void;
    onSend: () => void;
    botIsTyping: boolean;
}
  
const InputBox = ({ input, setInput, onSend, botIsTyping }: InputBoxProps) => {
    return (
        <div className="w-full max-w-md flex mt-4">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !botIsTyping) onSend(); }}
                placeholder="Digite sua mensagem..."
                className="flex-1 p-2 rounded-l-lg bg-gray-700 text-white outline-none"
            />
            <button
                onClick={onSend}
                disabled={botIsTyping}
                className="bg-purple-600 hover:bg-purple-700 p-2 rounded-r-lg cursor-pointer"
            >
                Enviar
            </button>
        </div>
    );
}

export default InputBox;