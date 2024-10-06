import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpUser, signInUser, signInWithGoogle } from "../../Features/slices/authSlice";
import './auth.css';
import PropTypes from 'prop-types';

const Auth = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const authBoxRef = useRef(null);

  // Handle closing the modal when clicking outside
  const memoizedOnClose = useCallback(() => {
    if (typeof onClose === 'function') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (authBoxRef.current && !authBoxRef.current.contains(event.target)) {
        memoizedOnClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, memoizedOnClose]);

  useEffect(() => {
    if (authState.user) {
      navigate('/');
      memoizedOnClose();
    }
  }, [authState.user, navigate, memoizedOnClose]);

  const toggleForm = () => {
    setIsRegistered((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      if (isRegistered) {
        if (password === confirmPassword) {
          await dispatch(signUpUser({ email, password, name, surname, phoneNumber })).unwrap();
        } else {
          setError('Passwords do not match');
        }
      } else {
        await dispatch(signInUser({ email, password })).unwrap();
      }
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await dispatch(signInWithGoogle()).unwrap();
    } catch (error) {
      setError('Google sign-in failed. Please try again.', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-container">
      <div className="auth-box" ref={authBoxRef}>
        <div className="auth-form">
          <h1>{isRegistered ? 'Sign Up' : 'Sign In'}</h1>
          <form onSubmit={handleSubmit}>
            {!isRegistered && (
              <>
                <button
                  type="button"
                  className="google-btn"
                  onClick={handleGoogleSignIn}
                >
                  Continue with Google
                </button>
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
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
            <br />
            <p>
              {isRegistered ? 'Already have an account? ' : 'New User? '}
              <span onClick={toggleForm} className="toggle-link">
                {isRegistered ? 'Sign In here!' : 'Sign Up here!'}
              </span>
            </p>
          </form>
          {error && <p className="error">{error}</p>}
          {authState.error && <p className="error">{authState.error}</p>}
        </div>
        <div className="auth-info"></div>
      </div>
    </div>
  );
};

Auth.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Auth;
