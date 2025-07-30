import { useState, useRef, useEffect } from "react";
import { getMovieRecommendations } from "../services/openrouter";

const AIGuru = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(
    '👋 Hey movie buff! Ask me anything - like "films for people who think they\'re film critics"'
  );
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [response]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setResponse(
        "🤨 I need more than your grocery list, buddy... Try something like '80s action movies'"
      );
      return;
    }

    setIsLoading(true);
    try {
      const aiResponse = await getMovieRecommendations(prompt);
      setResponse(aiResponse);
    } catch (error) {
      setResponse(
        "🔥 My brain short-circuited... Like a rom-com plot. Try again?"
      );
    } finally {
      setIsLoading(false);
      setPrompt("");
    }
  };

  return (
    <div className={`ai-guru ${isOpen ? "open" : ""}`}>
      <button
        className="guru-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="AI Guru"
      >
        <div className="guru-avatar">
          <span>🍿</span>
        </div>
      </button>

      {isOpen && (
        <div className="guru-chat">
          <div className="chat-header">
            <h3>Abdulaziz's clone</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="chat-messages" ref={chatRef}>
            <div className="message ai">{response}</div>
          </div>

          <form onSubmit={handleSubmit} className="chat-input">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type like 'movies for people who hate happy endings'"
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "🧠 Thinking..." : "🚀 Send"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIGuru;
