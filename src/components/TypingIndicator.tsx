const TypingIndicator = () => {
    return (
        <div className="flex items-center space-x-2 p-2 bg-gray-600 text-left rounded animate-pulse">
            <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-400" />
            </div>
        </div>
    );
}

export default TypingIndicator;