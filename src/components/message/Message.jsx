import React, { useContext, useEffect, useRef, useState } from "react";
import "./message.scss";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import { FaTrash } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const msgRef = useRef();
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    msgRef.current?.scrollIntoView({ behavior: "smooth" });

    const handleClickOutside = (event) => {
      if (!msgRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [message]);

  const isSentMessage = message.senderId === currentUser.uid;

  const handleMoreOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleDeleteMessage = async () => {
    if (message.senderId !== currentUser.uid) {
      // Message does not belong to the current user, do not allow deletion
      return;
    }

    try {
      // Delete the message from the "chats" collection
      const chatRef = doc(db, "chats", data.chatId);
      await deleteDoc(chatRef);
      console.log("Message deleted successfully:", message.id);
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  const getMessageTimestamp = (timestamp) => {
    const currentDate = new Date();
    const messageDate = new Date(timestamp);
    const diffInMinutes = Math.floor((currentDate - messageDate) / (1000 * 60));

    if (diffInMinutes < 1) {
      return "Just now";
    } else if (diffInMinutes === 1) {
      return "1 minute ago";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  };

  console.log(message.timestamp)

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
          <div className="message__img">
            {message.img && <img src={message.img} alt="" />}
          </div>
          <div className="message__text">
            {message.text && <p>{message.text}</p>}
          </div>
        </div>
        <span className="message__timestamp recieved__time">
          {getMessageTimestamp(message.timestamp)}
        </span>
      </div>
      {isSentMessage && (
        <div className="message__options">
          <button className="more-button" onClick={handleMoreOptions}>
            <MdMoreVert size={24} />
          </button>
          {showOptions && (
            <div className="options-dropdown">
              <button onClick={handleDeleteMessage}>
                <FaTrash />
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Message;
