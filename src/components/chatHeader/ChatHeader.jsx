import React, { useContext } from "react";
import "./chatHeader.scss";
import { Link } from "react-router-dom";
import { MdCall, MdMoreVert } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { ChatContext } from "../../contexts/ChatContext";

const ChatHeader = () => {
  const { data } = useContext(ChatContext);

  // Dummy online status (you can replace this with actual logic)
  const isOnline = true;
  const lastSeen = "Last seen: 5 minutes ago";

  return (
    <div className="chat__header">
      <div className="header__wrap">
        <Link className="avatar__wrapper">
          <div className="avatar">
            <img src={data.user?.photoURL} alt="Avatar" />
            {isOnline && <span className="status online"></span>}
          </div>
          <div className="profile__">
            <h3 className="name">{data.user?.displayName}</h3>
            <p className="last-seen">{lastSeen}</p>
          </div>
        </Link>

        <div className="header__contact">
          <MdCall  />
          <FaVideo  />
          <MdMoreVert  />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
