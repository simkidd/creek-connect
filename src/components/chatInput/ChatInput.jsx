import React, { useRef, useState } from "react";
import "./chatInput.scss";
import { MdSend } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";
import { HiEmojiHappy } from "react-icons/hi";

const ChatInput = () => {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    adjustTextareaHeight();
  };

  const handleSendMessage = () => {
    onSendMessage(inputValue);
    setInputValue("");
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className="chat__input">
      <div className="input__wrap">
        <HiEmojiHappy size={26} />
        <textarea
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Message..."
          rows={1}
          ref={textareaRef}
        />
        <GrAttachment size={20} />
      </div>
      <button onClick={handleSendMessage}>
        <MdSend size={20} />
      </button>
    </div>
  );
};

export default ChatInput;
