import React, { useContext, useEffect, useRef, useState } from "react";
import "./chatInput.scss";
import { MdSend } from "react-icons/md";
import { BsEmojiHeartEyesFill } from "react-icons/bs";
import { FaFileImage, FaTimes } from "react-icons/fa";
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
import Preview from "../../assets/316224577_816000659730251_6847587843923273879_n.jpg";

const ChatInput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const textareaRef = useRef();

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (!text && !img) {
      // No text or image, return early
      return;
    }

    setText("");
    setImg(null);
    setPreviewImg(null);
    adjustTextareaHeight();

    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress monitoring
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% complete`);
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
    setText(e.target.value); // Update the text state with the input value
    adjustTextareaHeight();
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setImg(file);

      // Preview the image
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImg(null);
      setPreviewImg(null);
    }

    adjustTextareaHeight();
  };

  
  const handleRemoveImage = () => {
    setImg(null);
    setPreviewImg(null);
  };
  

  return (
    <div className="chat__input">
      {previewImg && (
        <div className="preview">
          <img src={previewImg} alt="Preview" />
          <button className="remove-image-button" onClick={handleRemoveImage}>
            <FaTimes />
          </button>
        </div>
      )}
      <div className="input__container">
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
            // onChange={(e) => setImg(e.target.files[0])}
            onChange={handleImageChange}
          />
          <label htmlFor="file">
            <FaFileImage size={24} />
          </label>

          <button onClick={handleSend}>
            <MdSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
