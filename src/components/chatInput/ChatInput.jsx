import React, { useContext, useEffect, useRef, useState } from "react";
import "./chatInput.scss";
import { MdSend } from "react-icons/md";
import { HiEmojiHappy } from "react-icons/hi";
import { BsEmojiHeartEyesFill } from "react-icons/bs";
import { FaFileImage } from "react-icons/fa";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import { v4 as uuid } from "uuid";

const ChatInput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const textareaRef = useRef();

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress monitoring if needed
        },
        (error) => {
          // Handle the error if the upload fails
          console.error("Error uploading image:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  const handleInputChange = (e) => {
    setText(e.target.value);
    adjustTextareaHeight();

    if (e.target.files.length > 0) {
      setImg(e.target.files[0]);
    }
  };

  return (
    <div className="chat__input">
      <div className="input__wrap">
        <BsEmojiHeartEyesFill size={23} />
        <textarea
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="Message..."
          rows={1}
          ref={textareaRef}
        />
      </div>

      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <FaFileImage size={24} />
        </label>

        <button onClick={handleSend}>
          <MdSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
