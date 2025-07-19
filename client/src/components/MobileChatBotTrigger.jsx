import React from "react";
import { ChatBot } from "./ChatBot";

export function MobileChatBotTrigger() {
  return (
    <div className="sm:hidden fixed bottom-4 right-4 z-50">
      <ChatBot />
    </div>
  );
}
