import React, { useContext, useEffect, useRef } from "react";
import "./message.scss";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const msgRef = useRef();

  useEffect(() => {
    msgRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const isSentMessage = message.senderId === currentUser.uid;
  

  return (
    <div ref={msgRef} className={`message ${isSentMessage ? "sent" : ""}`}>
      <div className="avatar">
        <img
          src={isSentMessage ? currentUser.photoURL : data.user.photoURL}
          alt="avatar"
        />
      </div>
      <div className="message__content__wrap">
        <div className="message__content">
          <p>{message.text}</p>
          {message.img && <img src={message.img} alt="" />}
        </div>
        <span className="message__timestamp recieved__time">1 min ago</span>
      </div>
    </div>
  );
};

export default Message;
