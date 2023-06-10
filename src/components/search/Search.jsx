import React, { useContext, useState } from "react";
import "./search.scss";
import { BsSearch } from "react-icons/bs";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    // try {
    //   const querySnapshot = await getDocs(q);
    //   querySnapshot.forEach((doc) => {
    //     setUser(doc.data());
    //   });
    // } catch (error) {
    //   console.log(error);
    //   setError(true);
    // }
    try {
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map((doc) => doc.data());
        setUser(userData[0] || null);
        setError(userData.length === 0);
      } catch (error) {
        console.log(error);
        setError(true);
      }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
    setUser(null);
    setUsername("");
  };

  return (
    <>
      <div className="chat__search">
        <BsSearch />
        <input
          type="text"
          placeholder="Search"
          onKeyDown={handleKey}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {error && <span>User not found!</span>}
      {user && (
        <div className="conversation__item" onClick={handleSelect}>
          <img src={user.photoURL} alt="Avatar" />
          <div className="conversation__details">
            <h3>{user.displayName}</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
