import React from "react";
import { firebase, storage } from "./firebaseConfig";

const AccountSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      const user = firebase.auth().currentUser;
      const uid = user.uid;

      // Delete files in Firebase Storage
      await storage.ref(`users/${uid}`).delete();

      // Delete user account in Firebase Authentication
      await user.delete();

      console.log("User and associated files deleted successfully");
    } catch (error) {
      console.error("Error deleting user and associated files:", error);
    }
  };

  return (
    <div>
      {/* Your account settings UI */}
      <button onClick={() => setIsModalOpen(true)}>Delete Account</button>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>Confirm Account Deletion</h2>
        <p>Are you sure you want to delete your account?</p>
        <div>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          <button onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      </Modal>
    </div>
  );
};

export default AccountSettings;
