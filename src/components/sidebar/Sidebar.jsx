import React from "react";
import "./sidebar.scss";
import Logo from "../../assets/logo.png";
import Msg from "../../assets/mail.png";
import People from "../../assets/user.png";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Sidebar = () => {
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
        <div className="chat__search">
          <BsSearch />
          <input type="text" placeholder="search" />
        </div>

        <div className="conversation__list">
          <div className="conversation__item">
            <img src="avatar1.png" alt="Avatar" />
            <div className="conversation__details">
              <h3>John Doe</h3>
              <p>Last message...</p>
            </div>
          </div>
          <div className="conversation__item">
            <img src="avatar2.png" alt="Avatar" />
            <div className="conversation__details">
              <h3>Jane Smith</h3>
              <p>Last message...</p>
            </div>
          </div>
          <div className="conversation__item">
            <img src="avatar1.png" alt="Avatar" />
            <div className="conversation__details">
              <h3>John Doe</h3>
              <p>Last message...</p>
            </div>
          </div>
          <div className="conversation__item">
            <img src="avatar2.png" alt="Avatar" />
            <div className="conversation__details">
              <h3>Jane Smith</h3>
              <p>Last message...</p>
            </div>
          </div>
          <div className="conversation__item">
            <img src="avatar1.png" alt="Avatar" />
            <div className="conversation__details">
              <h3>John Doe</h3>
              <p>Last message...</p>
            </div>
          </div>
          <div className="conversation__item">
            <img src="avatar2.png" alt="Avatar" />
            <div className="conversation__details">
              <h3>Jane Smith</h3>
              <p>Last message...</p>
            </div>
          </div>
          <div className="conversation__item">
            <img src="avatar1.png" alt="Avatar" />
            <div className="conversation__details">
              <h3>John Doe</h3>
              <p>Last message...</p>
            </div>
          </div>
          <div className="conversation__item">
            <img src="avatar2.png" alt="Avatar" />
            <div className="conversation__details">
              <h3>Jane Smith</h3>
              <p>Last message...</p>
            </div>
          </div>
          <div className="conversation__item">
            <img src="avatar1.png" alt="Avatar" />
            <div className="conversation__details">
              <h3>John Doe</h3>
              <p>Last message...</p>
            </div>
          </div>
          <div className="conversation__item">
            <img src="avatar2.png" alt="Avatar" />
            <div className="conversation__details">
              <h3>Jane Smith</h3>
              <p>Last message...</p>
            </div>
          </div>
          <div className="conversation__item">
            <img src="avatar1.png" alt="Avatar" />
            <div className="conversation__details">
              <h3>John Doe</h3>
              <p>Last message...</p>
            </div>
          </div>
          <div className="conversation__item">
            <img src="avatar2.png" alt="Avatar" />
            <div className="conversation__details">
              <h3>Jane Smith</h3>
              <p>Last message...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
