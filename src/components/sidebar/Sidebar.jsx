import React, { useContext, useEffect, useState } from "react";
import "./sidebar.scss";
import Logo from "../../assets/logo.png";
import Msg from "../../assets/mail.png";
import People from "../../assets/user.png";
import { Link } from "react-router-dom";
import Search from "../search/Search";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Sidebar = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="sidebar">
      <div className="aside">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>

        <ul>
          <li>
            <Link>
              <img src={Msg} alt="" />
            </Link>
          </li>
          <li>
            <Link>
              <img src={People} alt="" />
            </Link>
          </li>
        </ul>
      </div>
      <div className="aside__content">
        <h2>Messages</h2>
        <Search />

        <div className="conversation__list">
          {Object.entries(chats)
            .sort((a, b) => b[1].date - a[1].date)
            .map((chat) => (
              <div
                className="conversation__item"
                key={chat[0]}
                onClick={() => handleSelect(chat[1].userInfo)}
              >
                <div className="avatar__cover">
                  <img src={chat[1].userInfo.photoURL} alt="Avatar" />
                </div>
                <div className="conversation__details">
                  <h4>{chat[1].userInfo.displayName}</h4>
                  <span>{chat[1].lastMessage?.text}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
