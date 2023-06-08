import React, { useEffect, useState } from "react";
import ChatHeader from "../chatHeader/ChatHeader";
import "./chatContainer.scss";
import ChatMessages from "../chatMessages/ChatMessages";
import ChatInput from "../chatInput/ChatInput";
import { useParams } from "react-router-dom";

const ChatContainer = () => {
  // const { userId } = useParams();
  // // const firebase = useFirebase();
  // const [messageText, setMessageText] = useState("");
  // const [messages, setMessages] = useState([]);
  // const [chatUser, setChatUser] = useState(null);
  // const currentUser = firebase.auth().currentUser;

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     const currentUserMessagesRef = firebase
  //       .database()
  //       .ref("messages")
  //       .child(currentUser.uid)
  //       .child(userId);

  //     const chatUserMessagesRef = firebase
  //       .database()
  //       .ref("messages")
  //       .child(userId)
  //       .child(currentUser.uid);

  //     // Fetch messages for the current user
  //     currentUserMessagesRef.on("value", (snapshot) => {
  //       const messagesData = snapshot.val();
  //       if (messagesData) {
  //         const messagesList = Object.values(messagesData);
  //         setMessages(messagesList);
  //       } else {
  //         setMessages([]);
  //       }
  //     });

  //     // Fetch messages for the chat user
  //     chatUserMessagesRef.on("value", (snapshot) => {
  //       const messagesData = snapshot.val();
  //       if (messagesData) {
  //         const messagesList = Object.values(messagesData);
  //         setMessages((prevMessages) => [...prevMessages, ...messagesList]);
  //       }
  //     });
  //   };

  //   fetchMessages();

  //   return () => {
  //     // Cleanup the event listeners when the component is unmounted
  //     firebase
  //       .database()
  //       .ref("messages")
  //       .child(currentUser.uid)
  //       .child(userId)
  //       .off();

  //     firebase
  //       .database()
  //       .ref("messages")
  //       .child(userId)
  //       .child(currentUser.uid)
  //       .off();
  //   };
  // }, [firebase, currentUser.uid, userId]);

  // useEffect(() => {
  //   const fetchChatUser = async () => {
  //     const snapshot = await firebase
  //       .database()
  //       .ref("users")
  //       .child(userId)
  //       .once("value");
  //     const chatUserData = snapshot.val();
  //     setChatUser(chatUserData);
  //   };
  //   fetchChatUser();
  // }, [firebase, userId]);

  // const handleSendMessage = () => {
  //   if (messageText) {
  //     const message = {
  //       sender: currentUser.uid,
  //       content: messageText,
  //       timestamp: new Date().toISOString(),
  //     };
  //     firebase
  //       .database()
  //       .ref("messages")
  //       .child(currentUser.uid)
  //       .child(userId)
  //       .push(message);

  //     setMessageText("");
  //   }
  // };

  // if (!chatUser) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="chat__container">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default ChatContainer;
