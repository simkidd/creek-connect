import React from "react";
import "./message.scss";

const Message = () => {
  return (
    <>
      <div className="message recieved__msg">
        <div className="avatar recieved__av">
          <img src="" alt="avatar" />
        </div>
        <div className="message__content__wrap">
          <div className="message__content recieved">hidnfndndnindindfinfindfndkndkndkndkdnkdndknfkdnfkdnfkdnkdnkdndkndkndkdndkndkdn</div>
          <span className="message__timestamp recieved__time">1 min ago</span>
        </div>
      </div>

      <div className="message sent__msg">
        <div className="message__content__wrap">
          <div className="message__content sent">heyjfjdnfjdnfjdnjdnfjdnfdjnjdnfkjdnfjdndnfdjfdnfjdnfkjdnkjfndfndndkdnjkdnfjdknfdknfdkn</div>
          <span className="message__timestamp sent__time">1 min ago</span>
        </div>
        <div className="avatar sent__av">
          <img src="" alt="avatar" />
        </div>
      </div>
    </>
  );
};

export default Message;
