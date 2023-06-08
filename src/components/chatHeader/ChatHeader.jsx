import React from "react";
import "./chatHeader.scss";
import { Link } from "react-router-dom";

const ChatHeader = () => {
  // Dummy online status (you can replace this with actual logic)
  const isOnline = true;
  const lastSeen = "Last seen: 5 minutes ago";

  return (
    <div className="chat__header">
      <div className="header__wrap">
        <Link className="avatar__wrapper">
          <div className="avatar">
            <img src="avatar2.png" alt="Avatar" />
            {isOnline && <span className="status online"></span>}
          </div>
          <div className="profile__">
            <h3 className="name">John Doe</h3>
            <p className="last-seen">{lastSeen}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ChatHeader;
