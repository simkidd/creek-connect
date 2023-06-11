import React, { useContext, useEffect, useState } from "react";
import "./chatHeader.scss";
import { Link } from "react-router-dom";
import { MdCall, MdMoreVert } from "react-icons/md";
import { FaTrash, FaVideo } from "react-icons/fa";
import { ChatContext } from "../../contexts/ChatContext";
import { db } from "../../firebase";
import { deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../contexts/AuthContext";

const ChatHeader = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [showOptions, setShowOptions] = useState(false);

  // // Dummy online status (you can replace this with actual logic)
  const isOnline = true;
  const lastSeen = "Last seen: 5 minutes ago";

  

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

  return (
    <div className="chat__header">
      <div className="header__wrap">
        <Link className="avatar__wrapper">
          <div className="avatar">
            <img src={data.user?.photoURL} alt="Avatar" />
            {isOnline ? <span className="status online"></span> : null}
          </div>
          <div className="profile__">
            <h3 className="name">{data.user?.displayName}</h3>
            {isOnline ? (
              <p className="last-seen">Online</p>
            ) : (
              <p className="last-seen">Last seen: {lastSeen}</p>
            )}
          </div>
        </Link>

        <div className="header__contact">
          <MdCall />
          <FaVideo />
          <MdMoreVert onClick={handleMoreOptions} />

          {showOptions && (
            <div className="options-dropdown">
              <button onClick={handleDeleteMessage}>
                <FaTrash />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
