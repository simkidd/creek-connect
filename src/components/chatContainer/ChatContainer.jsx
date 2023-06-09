import React, { useEffect, useState } from "react";
import ChatHeader from "../chatHeader/ChatHeader";
import "./chatContainer.scss";
import ChatMessages from "../chatMessages/ChatMessages";
import ChatInput from "../chatInput/ChatInput";
import { useParams } from "react-router-dom";

const ChatContainer = () => {
  

  return (
    <div className="chat__container">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default ChatContainer;
