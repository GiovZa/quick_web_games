import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose(); // Close modal on successful login
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onClose(); // Close modal on successful signup
    } catch (error) {
      alert('Signup failed: ' + error.message);
    }
  };

  return (
    <div className="auth-modal">
      <h1>{isLogin ? 'Login' : 'Signup'}</h1>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      {isLogin ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <button onClick={handleSignup}>Signup</button>
      )}
      <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Switch to Signup' : 'Switch to Login'}</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AuthModal;
