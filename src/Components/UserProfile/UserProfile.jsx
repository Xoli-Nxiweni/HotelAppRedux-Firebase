// src/Components/UserProfile/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { Button, Avatar, Typography, Box, Divider, Modal, TextField, List, ListItem, ListItemText, Paper, CircularProgress, Snackbar } from '@mui/material';
import { Alert } from '@mui/lab';
import { fetchBookings, fetchFavorites } from '../../Firebase/dataService'; // Adjust the import path
import './UserProfile.css';

const UserProfile = ({ user, onSignOut }) => {
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        if (user && user.uid) {
          const fetchedBookings = await fetchBookings(user.uid);
          setBookings(fetchedBookings);
          setLoadingBookings(false);

          const fetchedFavorites = await fetchFavorites(user.uid);
          setFavorites(fetchedFavorites);
          setLoadingFavorites(false);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('Failed to fetch data. Please try again later.');
        setLoadingBookings(false);
        setLoadingFavorites(false);
      }
    };

    if (user && user.uid) {
      loadData();
    }
  }, [user]);

  const handlePasswordChange = () => {
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    // Implement password change logic here
    console.log('New Password:', newPassword);
    setSuccess('Password changed successfully.');
    setOpenChangePassword(false);
    setNewPassword('');
  };

  return (
    <Box className="userProfileContainer" sx={{ padding: 3, maxWidth: 600 }}>
      {/* User Avatar */}
      <Box className="userProfileAvatar" sx={{ textAlign: 'center', mb: 3 }}>
        <Avatar 
          alt={user.displayName} 
          src={user.photoURL || 'https://via.placeholder.com/150'} 
          sx={{ width: 120, height: 120, border: '4px solid #fff', boxShadow: '0 0 15px rgba(0,0,0,0.2)' }}
        />
      </Box>

      {/* User Details */}
      <Typography variant="h4" align="center" sx={{ fontWeight: '600', mb: 1, color: '#333' }}>
        {user.displayName || 'Anonymous User'}
      </Typography>
      <Typography variant="body1" align="center" color="textSecondary" sx={{ mb: 2 }}>
        {user.email || 'user@example.com'}
      </Typography>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)', mb: 2 }} />

      {/* Favorites Section */}
      <Typography variant="h6" align="left" sx={{ mb: 1, color: '#555' }}>
        Favorites:
      </Typography>
      {loadingFavorites ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 150 }}>
          <CircularProgress />
        </Box>
      ) : (
        <List dense sx={{ maxHeight: 150, overflowY: 'auto', mb: 2 }}>
          {favorites.length > 0 ? (
            favorites.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.name} secondary={item.description} />
              </ListItem>
            ))
          ) : (
            <Typography>No favorites found.</Typography>
          )}
        </List>
      )}

      <Divider sx={{ mb: 2 }} />

      {/* Bookings Section */}
      <Typography variant="h6" align="left" sx={{ mb: 1, color: '#555' }}>
        Your Bookings:
      </Typography>
      {loadingBookings ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 150 }}>
          <CircularProgress />
        </Box>
      ) : (
        <List dense sx={{ maxHeight: 150, overflowY: 'auto', mb: 2 }}>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <ListItem key={index}>
                <ListItemText 
                  primary={`Booking #${booking.id}`} 
                  secondary={`Date: ${new Date(booking.date).toLocaleDateString()}`} 
                />
              </ListItem>
            ))
          ) : (
            <Typography>No bookings found.</Typography>
          )}
        </List>
      )}

      <Divider sx={{ mb: 2 }} />

      {/* Action Buttons */}
      <Box sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Button 
          variant="contained" 
          className="editProfileBtn"
          sx={{ mb: 1, width: '200px', fontSize: '14px' }} // Ensure consistent width
        >
          Edit Profile
        </Button>
        <Button 
          variant="contained" 
          className="changePasswordBtn" 
          onClick={() => setOpenChangePassword(true)}
          sx={{ mb: 1, width: '200px', fontSize: '14px' }} // Ensure consistent width
        >
          Change Password
        </Button>
        <Button 
          variant="contained" 
          className="signOutBtn" 
          onClick={onSignOut}
          sx={{ width: '200px', fontSize: '14px', fontWeight: 'bold' }} // Ensure consistent width
        >
          Sign Out
        </Button>
      </Box>

      {/* Change Password Modal */}
      <Modal
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
        aria-labelledby="change-password-modal"
        aria-describedby="change-password-description"
      >
        <Paper sx={{ padding: 3, width: 300, margin: 'auto', mt: 10 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Change Password</Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button 
            variant="contained" 
            onClick={handlePasswordChange}
            sx={{ width: '100%' }}
          >
            Submit
          </Button>
        </Paper>
      </Modal>

      {/* Snackbar for general messages */}
      <Snackbar open={Boolean(error || success)} autoHideDuration={6000} onClose={() => setError('') || setSuccess('')}>
        <Alert onClose={() => setError('') || setSuccess('')} severity={error ? 'error' : 'success'}>
          {error || success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserProfile;
