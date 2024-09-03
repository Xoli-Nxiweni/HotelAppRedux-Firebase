// import { useState, useEffect, useRef, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { signUpUser, signInUser } from "../../Features/slices/authSlice";
// import './auth.css';

// // eslint-disable-next-line react/prop-types
// const Auth = ({ isOpen, onClose }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [name, setName] = useState('');
//   const [surname, setSurname] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [hasNavigated, setHasNavigated] = useState(false); // Add state to prevent multiple navigations

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const authState = useSelector(state => state.auth);

//   const authBoxRef = useRef(null);

//   const memoizedOnClose = useCallback(() => {
//     onClose();
//   }, [onClose]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (authBoxRef.current && !authBoxRef.current.contains(event.target)) {
//         memoizedOnClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen, memoizedOnClose]);

//   useEffect(() => {
//     if (authState.user && !hasNavigated) {
//       navigate('/rooms');
//       setHasNavigated(true);
//       memoizedOnClose();
//     }
//   }, [authState.user, navigate, memoizedOnClose, hasNavigated]);

//   const toggleForm = () => {
//     setIsRegistered(prev => !prev);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (isRegistered) {
//       if (password === confirmPassword) {
//         dispatch(signUpUser({ email, password }));
//       } else {
//         alert('Passwords do not match');
//       }
//     } else {
//       dispatch(signInUser({ email, password }));
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="auth-container">
//       <div className="auth-box" ref={authBoxRef}>
//         <div className="auth-form">
//           <h1>{isRegistered ? 'Sign Up' : 'Sign In'}</h1>
//           <form onSubmit={handleSubmit}>
//             {!isRegistered && (
//               <>
//                 <button type="button" className="google-btn">Continue with Google</button>
//                 <span className="divider">--or--</span>
//               </>
//             )}
//             {isRegistered && (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Surname"
//                   value={surname}
//                   onChange={(e) => setSurname(e.target.value)}
//                   required
//                 />
//                 <input
//                   type="tel"
//                   placeholder="Phone Number"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   required
//                 />
//               </>
//             )}
//             <input
//               type="text"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {isRegistered && (
//               <input
//                 type="password"
//                 placeholder="Confirm Password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//             )}
//             <button type="submit" className="submit-btn">
//               {isRegistered ? 'Sign Up' : 'Sign In'}
//             </button>
//             <p>
//               {isRegistered ? 'Already have an account? ' : 'New User? '}
//               <span onClick={toggleForm} className="toggle-link">
//                 {isRegistered ? 'Sign In here!' : 'Sign Up here!'}
//               </span>
//             </p>
//           </form>
//           {authState.error && <p className="error">{authState.error}</p>}
//         </div>
//         <div className="auth-info">
//           {/* Additional content or imagery */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;

// import { useState, useEffect, useRef, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { signUpUser, signInUser } from "../../Features/slices/authSlice";
// import './auth.css';

// // eslint-disable-next-line react/prop-types
// const Auth = ({ isOpen, onClose }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [name, setName] = useState('');
//   const [surname, setSurname] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [hasNavigated, setHasNavigated] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const authState = useSelector(state => state.auth);

//   const authBoxRef = useRef(null);

//   const memoizedOnClose = useCallback(() => {
//     onClose();
//   }, [onClose]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (authBoxRef.current && !authBoxRef.current.contains(event.target)) {
//         memoizedOnClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen, memoizedOnClose]);

//   useEffect(() => {
//     if (authState.user && !hasNavigated) {
//       navigate('/');
//       setHasNavigated(true);
//       memoizedOnClose();
//     }
//   }, [authState.user, navigate, memoizedOnClose, hasNavigated]);

//   const toggleForm = () => {
//     setIsRegistered(prev => !prev);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (isRegistered) {
//       if (password === confirmPassword) {
//         dispatch(signUpUser({ email, password }));
//       } else {
//         alert('Passwords do not match');
//       }
//     } else {
//       dispatch(signInUser({ email, password }));
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="auth-container">
//       <div className="auth-box" ref={authBoxRef}>
//         <div className="auth-form">
//           <h1>{isRegistered ? 'Sign Up' : 'Sign In'}</h1>
//           <form onSubmit={handleSubmit}>
//             {!isRegistered && (
//               <>
//                 <button type="button" className="google-btn">Continue with Google</button>
//                 <span className="divider">--or--</span>
//               </>
//             )}
//             {isRegistered && (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Surname"
//                   value={surname}
//                   onChange={(e) => setSurname(e.target.value)}
//                   required
//                 />
//                 <input
//                   type="tel"
//                   placeholder="Phone Number"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   required
//                 />
//               </>
//             )}
//             <input
//               type="text"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {isRegistered && (
//               <input
//                 type="password"
//                 placeholder="Confirm Password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//             )}
//             <button type="submit" className="submit-btn">
//               {isRegistered ? 'Sign Up' : 'Sign In'}
//             </button>
//             <p>
//               {isRegistered ? 'Already have an account? ' : 'New User? '}
//               <span onClick={toggleForm} className="toggle-link">
//                 {isRegistered ? 'Sign In here!' : 'Sign Up here!'}
//               </span>
//             </p>
//           </form>
//           {authState.error && <p className="error">{authState.error}</p>}
//         </div>
//         <div className="auth-info">
//           {/* Additional content or imagery */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Auth;


import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpUser, signInUser, setUser } from "../../Features/slices/authSlice";
import { auth, googleProvider, signInWithPopup } from "../../Firebase/firebase";
import './auth.css';

// eslint-disable-next-line react/prop-types
const Auth = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector(state => state.auth);

  const authBoxRef = useRef(null);

  const memoizedOnClose = useCallback(() => {
    onClose();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistered) {
      if (password === confirmPassword) {
        dispatch(signUpUser({ email, password }));
      } else {
        alert('Passwords do not match');
      }
    } else {
      dispatch(signInUser({ email, password }));
    }
  };

  // const handleGoogleSignIn = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     dispatch(setUser(result.user));
  //     console.log(result)
  //     memoizedOnClose();
  //     navigate('/');
  //   } catch (error) {
  //     console.error("Google sign-in error:", error);
  //   }
  // };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      dispatch(setUser({
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
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
          {authState.error && <p className="error">{authState.error}</p>}
        </div>
        <div className="auth-info"></div>
      </div>
    </div>
  );
};

export default Auth;
