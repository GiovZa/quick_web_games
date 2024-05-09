import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const LogoutModal = ({ onClose }) => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Navigate to the home page or login page after sign out
      onClose(); // Close the modal
    } catch (error) {
      alert("Error signing out: " + error.message); // Provide user feedback
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '300px',
      padding: '20px',
      backgroundColor: 'white',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      zIndex: '1000'
    }}>
      <h2>Logout</h2>
      <p>You are currently logged in. Do you wish to sign out?</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default LogoutModal;
