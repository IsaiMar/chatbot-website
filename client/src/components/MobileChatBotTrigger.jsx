import React, { useState } from "react";
import { ChatBot } from "./ChatBot";
import { X } from "lucide-react";

export function MobileChatBotTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating ChatBot Button */}
      <div
        className="sm:hidden fixed bottom-4 right-4 z-50 w-16 h-16 rounded-full border-2 border-green-700 bg-white overflow-hidden flex items-center justify-center shadow-[0_0_10px_rgba(34,197,94,0.5)] hover:shadow-[0_0_20px_rgba(34,197,94,0.7)] transition"
        onClick={() => setIsOpen(true)}
      >
        💬
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="sm:hidden fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 p-4 shadow-lg">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            <ChatBot />
          </div>
        </div>
      )}
    </>
  );
}
