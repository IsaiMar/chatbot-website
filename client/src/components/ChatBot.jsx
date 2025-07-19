import { useEffect, useRef, useState } from "react"

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [position, setPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isMinimized, setIsMinimized] = useState(false)
  const [context, setContext] = useState(null);

  const bottomRef = useRef(null)

  const toggleChat = () => setIsOpen(!isOpen)

  const handleMouseDown = (e) => {
    if (!isMinimized) return
    e.preventDefault()
    setIsDragging(true)
    const rect = e.currentTarget.getBoundingClientRect()
    setOffset({
      x: window.innerWidth - e.clientX - (window.innerWidth - rect.right),
      y: window.innerHeight - e.clientY - (window.innerHeight - rect.bottom),
    })
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    setContext(token ? "booking" : "sales");
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !context) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8081/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, context }), 
      });

      const data = await res.json();
      const allLines = data.reply.split("\n").filter((line) => line.trim() !== "");
      const botMessage = { role: "bot", content: allLines };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !isMinimized) return
      const newRight = window.innerWidth - e.clientX - offset.x
      const newBottom = window.innerHeight - e.clientY - offset.y
      setPosition({
        x: Math.max(0, Math.min(newRight, window.innerWidth - 250)),
        y: Math.max(0, Math.min(newBottom, window.innerHeight - 100)),
      })
    }
    const handleMouseUp = () => setIsDragging(false)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, offset, isMinimized])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <div className="hidden sm:block">
        <button onClick={toggleChat} className="focus:outline-none">
          <img
            src="/chatbot-zyan.gif"
            alt="Chatbot"
            className="w-12 h-12 rounded-full hover:scale-105 transition-transform duration-200"
          />
        </button>
      </div>

      {!isOpen && (
        <button
          onClick={toggleChat}
          className="sm:hidden fixed bottom-4 right-4 z-50 w-16 h-16 rounded-full border-2 border-secondary-700 bg-white overflow-hidden flex items-center justify-center shadow-md"
        >
          <img src="/chatbot-zyan.gif" alt="Chatbot" className="w-10 h-10" />
        </button>
      )}

      {isOpen && (
        <div
          className="fixed z-50 border border-secondary-400 shadow-lg bg-light-100 rounded-lg flex flex-col"
          style={{
            right: Math.max(0, Math.min(position.x, window.innerWidth - 250)),
            bottom: Math.max(0, Math.min(position.y, window.innerHeight - 100)),
            width: isMinimized ? "auto" : "25vw",
            height: isMinimized ? "auto" : "50vh",
            minWidth: "250px",
            maxWidth: "500px",
          }}
        >
          <div
            onMouseDown={handleMouseDown}
            className="p-2 cursor-move select-none rounded-t flex justify-between items-center"
            style={{ backgroundColor: "#15803D", color: "white" }}
          >
            <span className="font-semibold">Ask Bugsy</span>
            <div className="flex gap-2">
              <button onClick={() => setIsMinimized((min) => !min)}>
                {isMinimized ? "▣" : "—"}
              </button>
              <button onClick={toggleChat}>✕</button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Show context for testing only.*/}
              <p className="text-xs text-gray-400 text-center">Context: {context}</p> 
              <div className="p-2 overflow-y-auto text-sm flex flex-col space-y-2 max-h-[60vh] flex-grow">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded text-sm whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-secondary-100 text-secondary-900 text-right"
                        : "bg-light-200 text-light-700 text-left"
                    }`}
                  >
                    {Array.isArray(msg.content)
                      ? msg.content.map((line, i) => <p key={i}>{line}</p>)
                      : <p>{msg.content}</p>}
                  </div>
                ))}

                {loading && (
                  <div className="p-2 rounded text-sm bg-light-200 text-left">
                    <img
                      src="/message_loading.gif"
                      alt="Bugsy is typing..."
                      className="w-6 h-6 inline-block"
                    />
                    <span className="ml-2 text-light-600 italic">Bugsy is typing...</span>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              <div className="flex border-t p-2 bg-light-100">
                <input
                  className="w-full p-2 border border-light-300 rounded-lg text-base text-light-700 focus:outline-none focus:ring-2 focus:ring-primary-300"
                  placeholder="Ask something..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                  className="ml-2 px-3 py-1 text-white rounded"
                  style={{ backgroundColor: "#34D399" }}
                  onClick={handleSend}
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
