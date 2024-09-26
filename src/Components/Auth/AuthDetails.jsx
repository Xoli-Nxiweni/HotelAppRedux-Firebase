import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase"; // Adjust the import path as necessary
import { CircularProgress, Button, Typography } from "@mui/material"; // Optional UI components

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(undefined); // Use undefined to detect initial loading
  const [isLoading, setIsLoading] = useState(true); // Loading state for Firebase check
  const [error, setError] = useState(null); // Error state for sign-out errors

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
      setIsLoading(false); // Stop loading when Firebase auth state is determined
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out successful");
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        console.error("Sign out error:", error);
        setError("Failed to sign out. Please try again."); // Display sign-out error
      });
  };

  if (isLoading) {
    return (
      <div>
        <CircularProgress /> {/* Loading spinner */}
      </div>
    );
  }

  return (
    <div>
      {authUser ? (
        <>
          <Typography variant="body1">{`Signed In as ${authUser.email}`}</Typography>
          <Button variant="contained" color="primary" onClick={userSignOut}>
            Sign Out
          </Button>
        </>
      ) : (
        <Typography variant="body1">Signed Out</Typography>
      )}
      {error && <Typography color="error">{error}</Typography>}
    </div>
  );
};

export default AuthDetails;
