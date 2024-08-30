import { useState, useEffect, useRef } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import './auth.css';
import {auth} from '../../Firebase/firebase'

// eslint-disable-next-line react/prop-types
const Auth = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  
  // Create a ref for the auth-box
  const authBoxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (authBoxRef.current && !authBoxRef.current.contains(event.target)) {
        onClose(); // Close the popup if clicked outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const toggleForm = () => {
    setIsRegistered(prev => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistered) {
      if (password === confirmPassword) {
        // Replace with your sign-up logic using Firebase
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredentials) => {
            console.log('User registered:', userCredentials);
            alert(`Signing up with ${name} ${surname}, phone: ${phoneNumber}, email: ${email}, password: ${password}`);
          })
          .catch((error) => console.error(error.message));
      } else {
        alert('Passwords do not match');
      }
    } else {
      // Replace with your sign-in logic using Firebase
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          console.log('User signed in:', userCredentials);
          alert('Signing in with email and password');
        })
        .catch((error) => console.error(error.message));
    }
  };

  // Render nothing if `isOpen` is false
  if (!isOpen) return null;

  return (
    <div className="auth-container">
      <div className="auth-box" ref={authBoxRef}>
        <div className="auth-form">
          <h1>{isRegistered ? 'Sign Up' : 'Sign In'}</h1>
          <form onSubmit={handleSubmit}>
            {!isRegistered && (
              <>
                <button type="button" className="google-btn">Continue with Google</button>
                <span className="divider">--or--</span>
              </>
            )}
            {isRegistered && (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </>
            )}
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isRegistered && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}
            <button type="submit" className="submit-btn">
              {isRegistered ? 'Sign Up' : 'Sign In'}
            </button>
            <p>
              {isRegistered ? 'Already have an account? ' : 'New User? '}
              <span onClick={toggleForm} className="toggle-link">
                {isRegistered ? 'Sign In here!' : 'Sign Up here!'}
              </span>
            </p>
          </form>
        </div>
        <div className="auth-info">
          {/* Additional content or imagery */}
        </div>
      </div>
    </div>
  );
};

export default Auth;
