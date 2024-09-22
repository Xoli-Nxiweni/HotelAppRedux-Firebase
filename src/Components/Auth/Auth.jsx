import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpUser, signInUser, setUser } from "../../Features/slices/authSlice";
import { auth, googleProvider, signInWithPopup } from "../../Firebase/firebase";
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import './auth.css';
import PropTypes from 'prop-types';

const db = getFirestore();

const Auth = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector(state => state.auth);

  const authBoxRef = useRef(null);

  const memoizedOnClose = useCallback(() => {
    if (typeof onClose === 'function') {
      onClose();
    } else {
      console.warn('onClose is not a function');
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
    if (authState.user && !hasNavigated) {
      navigate('/');
      setHasNavigated(true);
      memoizedOnClose();
    }
  }, [authState.user, navigate, memoizedOnClose, hasNavigated]);

  const toggleForm = () => {
    setIsRegistered(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      if (isRegistered) {
        if (password === confirmPassword) {
          const result = await dispatch(signUpUser({ email, password, name, surname, phoneNumber })).unwrap();
          await setDoc(doc(db, 'users', result.uid), {
            uid: result.uid,
            name,
            surname,
            phoneNumber,
            email
          });
          dispatch(setUser(result));
          memoizedOnClose();
          navigate('/');
        } else {
          setError('Passwords do not match');
        }
      } else {
        const result = await dispatch(signInUser({ email, password })).unwrap();
        memoizedOnClose();
        navigate('/');
      }
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      });
      dispatch(setUser({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }));
      memoizedOnClose();
      navigate('/');
    } catch (error) {
      console.error("Google sign-in error:", error);
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
                <div className="divider"><hr /></div>
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
