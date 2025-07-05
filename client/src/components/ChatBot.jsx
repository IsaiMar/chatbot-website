import { useState } from "react"

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  const toggleChat = () => setIsOpen(!isOpen)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    try {
      const res = await fetch("http://localhost:8081/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })
      const data = await res.json()

      // Keep the first sentence as-is, split the rest into numbered lines
      const allLines = data.reply
        .split("\n")
        .filter((line) => line.trim() !== "")
      const firstLine = allLines[0]
      const numberedLines = allLines.slice(1)

      const formattedReply = [firstLine, ...numberedLines]
      const botMessage = { role: "bot", content: formattedReply }
      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      console.error("Error:", err)
    }
  }

  return (
    <>
      <button onClick={toggleChat} className="focus:outline-none">
        <img
          src="/chatbot-zyan.gif"
          alt="Chatbot"
          className="w-12 h-12 rounded-full hover:scale-105 transition-transform duration-200"
        />
      </button>

      {isOpen && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg w-[90%] sm:w-[400px] md:w-[500px] z-50 border border-[rgb(62,194,147)]">
          {/* Header */}
          <div
            className="p-2 rounded-t flex justify-between items-center"
            style={{ backgroundColor: "rgb(70, 168, 133)", color: "white" }}
          >
            <span className="font-semibold">Ask AI</span>
            <button onClick={toggleChat}>✕</button>
          </div>

          {/* Messages */}
          <div className="p-2 h-64 overflow-y-auto text-sm space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded text-sm whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-green-100 text-green-800 text-right"
                    : "bg-gray-100 text-gray-800 text-left"
                }`}
              >
                {Array.isArray(msg.content) ? (
                  msg.content.map((line, i) => (
                    <p key={i} className="mb-1">
                      {line}
                    </p>
                  ))
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex border-t p-2 bg-gray-50">
            <input
              className="flex-grow p-1 border rounded text-sm text-gray-800"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="ml-2 px-3 py-1 text-white rounded"
              style={{ backgroundColor: "rgb(62,194,147)" }}
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}
