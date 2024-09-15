import { useState, useEffect } from 'react';
import { Button, Avatar, Typography, Box, Divider, Modal, TextField, List, ListItem, ListItemText, Paper, CircularProgress, Snackbar } from '@mui/material';
import { Alert } from '@mui/lab';
import { fetchBookings, fetchFavorites } from '../../Firebase/dataService';
import { useDispatch, useSelector } from 'react-redux';
import { setBookings, setFavorites, setLoading, setError, setSuccess } from '../../Features/slices/userProfileSlice';
import './UserProfile.css';

// eslint-disable-next-line react/prop-types
const UserProfile = ({ user, onSignOut, onClose }) => {
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const bookings = useSelector((state) => state.userProfile.bookings);
  const favorites = useSelector((state) => state.userProfile.favorites);
  const isLoading = useSelector((state) => state.userProfile.isLoading);
  const error = useSelector((state) => state.userProfile.error);
  const success = useSelector((state) => state.userProfile.success);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      try {
        if (user && user.uid) {
          dispatch(setLoading(true));

          const [fetchedBookings, fetchedFavorites] = await Promise.all([
            fetchBookings(user.uid),
            fetchFavorites(user.uid),
          ]);

          dispatch(setBookings(fetchedBookings));
          dispatch(setFavorites(fetchedFavorites));
          
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        dispatch(setError('Failed to fetch data. Please try again later.'));
        dispatch(setLoading(false));
      }
    };

    if (user && user.uid) {
      loadData();
    }
  }, [user, dispatch]);

  const handlePasswordChange = () => {
    if (newPassword.length < 6) {
      dispatch(setError('Password must be at least 6 characters long.'));
      return;
    }
    console.log('New Password:', newPassword); // Replace with actual password change logic
    dispatch(setSuccess('Password changed successfully.'));
    setOpenChangePassword(false);
    setNewPassword('');
  };

  return (
    <Modal
      open={true} // Ensure this is controlled by a parent state or prop
      onClose={onClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
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
          p: 3 
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={onClose}
          sx={{ position: 'absolute', top: 16, right: 16 }}
        >
          Close
        </Button>

        {/* User Avatar */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Avatar
            alt={user.displayName}
            src={user.photoURL || 'public/vecteezy_user-icon-on-transparent-background_19879186.png'}
            sx={{ width: 120, height: 120, border: '4px solid #fff', boxShadow: 2 }}
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
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 150 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List dense sx={{ maxHeight: 150, overflowY: 'auto', mb: 2 }}>
            {favorites.length > 0 ? (
              favorites.map((item) => (
                <ListItem key={item.id}>
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
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 150 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List dense sx={{ maxHeight: 150, overflowY: 'auto', mb: 2 }}>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <ListItem key={booking.id}>
                  <ListItemText
                    primary={`Booking #${booking.id}`}
                    secondary={`Date: ${new Date(booking.checkInDate).toLocaleDateString()} - ${new Date(booking.checkOutDate).toLocaleDateString()}`}
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
        <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Button variant="contained" color="primary" sx={{ width: 200, fontSize: '14px' }}>
            Edit Profile
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenChangePassword(true)}
            sx={{ width: 200, fontSize: '14px' }}
          >
            Change Password
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onSignOut}
            sx={{ width: 200, fontSize: '14px', fontWeight: 'bold' }}
          >
            Sign Out
          </Button>
        </Box>

        {/* Change Password Modal */}
        <Modal
          open={openChangePassword}
          onClose={() => setOpenChangePassword(false)}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Paper sx={{ padding: 3, width: 300, borderRadius: 2 }}>
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
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handlePasswordChange}
              sx={{ width: '100%' }}
            >
              Submit
            </Button>
          </Paper>
        </Modal>
      </Box>
    </Modal>
  );
};

export default UserProfile;
