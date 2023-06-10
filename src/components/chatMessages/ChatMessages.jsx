import React, { useContext, useEffect, useState } from "react";
import Message from "../message/Message";
import "./chatMessages.scss";
import { ChatContext } from "../../contexts/ChatContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase";

const ChatMessages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages);

  return (
    <div className="chat__messages">
      {messages.map((message) => {
        return <Message message={message} key={message} />;
      })}
    </div>
  );
};

export default ChatMessages;
