import { useState, useEffect } from 'react';
import { fetchBookings, fetchFavorites, updatePassword } from '../../Firebase/dataService';
import { useDispatch, useSelector } from 'react-redux';
import { setBookings, setFavorites, setLoading, setError, setSuccess } from '../../Features/slices/userProfileSlice';
import './UserProfile.css';

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
      if (user?.uid) {
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
        <li key={item.id}>
          {type === 'favorites' ? item.name : `Booking #${item.id}`} - 
          {type === 'favorites'
            ? item.description
            : `Date: ${new Date(item.checkInDate).toLocaleDateString()} - ${new Date(item.checkOutDate).toLocaleDateString()}`}
        </li>
      ))
    ) : (
      <p>No {type} found.</p>
    );
  };

  return (
    <div className="modal" open={true}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>X</span>
        <div className="profile-header">
          <img
            alt={user?.displayName || `${user?.name || ''} ${user?.surname || ''}`}
            src={user?.photoURL || '/path/to/default/avatar.png'}
            className="profile-avatar"
          />
          <h2>{user?.displayName || `${user?.name || ''} ${user?.surname || ''}`}</h2>
          <p>{user?.email || 'user@example.com'}</p>
        </div>

        <hr />

        <h3>Favorites</h3>
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <ul className="list">
            {renderList(favorites, 'favorites')}
          </ul>
        )}

        <hr />

        <h3>Your Bookings</h3>
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <ul className="list">
            {renderList(bookings, 'bookings')}
          </ul>
        )}

        <div className="actions">
          <button disabled={isLoading}>Edit Profile</button>
          <button onClick={() => setOpenChangePassword(true)} disabled={isLoading}>
            Change Password
          </button>
          <button onClick={onSignOut} disabled={isLoading}>
            Sign Out
          </button>
        </div>

        {openChangePassword && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setOpenChangePassword(false)}>&times;</span>
              <h3>Change Password</h3>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button onClick={handlePasswordChange}>Update Password</button>
            </div>
          </div>
        )}

        {snackbarOpen && (
          <div className={`snackbar ${error ? 'error' : 'success'}`}>
            {error || snackbarMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
