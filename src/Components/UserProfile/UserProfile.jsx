import { useState, useEffect } from 'react';
import { Button, Avatar, Typography, Box, Divider, Modal, TextField, List, ListItem, ListItemText, Paper, CircularProgress, Snackbar } from '@mui/material';
import { Alert } from '@mui/lab';
import { fetchBookings, fetchFavorites, updatePassword } from '../../Firebase/dataService';
import { useDispatch, useSelector } from 'react-redux';
import { setBookings, setFavorites, setLoading, setError, setSuccess } from '../../Features/slices/userProfileSlice';
import './UserProfile.css';

// eslint-disable-next-line react/prop-types
const UserProfile = ({ user, onSignOut, onClose }) => {
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const bookings = useSelector((state) => state.userProfile.bookings);
  const favorites = useSelector((state) => state.userProfile.favorites);
  const isLoading = useSelector((state) => state.userProfile.isLoading);
  const error = useSelector((state) => state.userProfile.error);
  const success = useSelector((state) => state.userProfile.success);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      if (user?.uid) { // Check if user and user.uid exist
        dispatch(setLoading(true));
        try {
          const [fetchedBookings, fetchedFavorites] = await Promise.all([
            fetchBookings(user.uid),
            fetchFavorites(user.uid),
          ]);
          dispatch(setBookings(fetchedBookings));
          dispatch(setFavorites(fetchedFavorites));
        } catch (err) {
          dispatch(setError('Failed to fetch data. Please try again later.'));
        } finally {
          dispatch(setLoading(false));
        }
      }
    };

    loadData();
  }, [user, dispatch]);

  const handlePasswordChange = async () => {
    if (newPassword.length < 6) {
      dispatch(setError('Password must be at least 6 characters long.'));
      return;
    }
    try {
      await updatePassword(user, newPassword);
      dispatch(setSuccess('Password changed successfully.'));
      setSnackbarMessage('Password changed successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      dispatch(setError('Failed to change password. Please try again.'));
    } finally {
      setOpenChangePassword(false);
      setNewPassword('');
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const renderList = (items, type) => {
    return items.length > 0 ? (
      items.map((item) => (
        <ListItem key={item.id}>
          <ListItemText 
            primary={type === 'favorites' ? item.name : `Booking #${item.id}`} 
            secondary={type === 'favorites' ? item.description : `Date: ${new Date(item.checkInDate).toLocaleDateString()} - ${new Date(item.checkOutDate).toLocaleDateString()}`} 
          />
        </ListItem>
      ))
    ) : (
      <Typography>No {type} found.</Typography>
    );
  };

  return (
    <Modal open={true} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 800,
          height: '80vh',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          overflow: 'auto',
          p: 3,
        }}
      >
        <Button variant="contained" color="error" onClick={onClose} sx={{ position: 'absolute', top: 16, right: 16 }}>
          Close
        </Button>

        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Avatar
            alt={user?.displayName || `${user?.name || ''} ${user?.surname || ''}`}
            src={user?.photoURL || '/path/to/default/avatar.png'}
            sx={{ width: 120, height: 120, border: '4px solid #fff', boxShadow: 2 }}
          />
        </Box>

        <Typography variant="h4" align="center" sx={{ fontWeight: '600', mb: 1, color: '#333' }}>
          {user?.displayName || `${user?.name || ''} ${user?.surname || ''}`}
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" sx={{ mb: 2 }}>
          {user?.email || 'user@example.com'}
        </Typography>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)', mb: 2 }} />

        <Typography variant="h6" align="left" sx={{ mb: 1, color: '#555' }}>Favorites:</Typography>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 150 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List dense sx={{ maxHeight: 150, overflowY: 'auto', mb: 2 }}>
            {renderList(favorites, 'favorites')}
          </List>
        )}

        <Divider sx={{ mb: 2 }} />

        <Typography variant="h6" align="left" sx={{ mb: 1, color: '#555' }}>Your Bookings:</Typography>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 150 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List dense sx={{ maxHeight: 150, overflowY: 'auto', mb: 2 }}>
            {renderList(bookings, 'bookings')}
          </List>
        )}

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
          <Button variant="contained" color="primary" sx={{ width: 120, fontSize: '14px' }} disabled={isLoading}>
            Edit Profile
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenChangePassword(true)}
            sx={{ width: 120, fontSize: '14px' }}
            disabled={isLoading}
          >
            Change Password
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onSignOut}
            sx={{ width: 120, fontSize: '14px', fontWeight: 'bold' }}
            disabled={isLoading}
          >
            Sign Out
          </Button>
        </Box>

        <Modal open={openChangePassword} onClose={() => setOpenChangePassword(false)} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ padding: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>Change Password</Typography>
            <TextField
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handlePasswordChange}>
              Update
            </Button>
          </Box>
        </Modal>

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
            {error || snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

export default UserProfile;
