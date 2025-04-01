/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { fetchBookings, fetchFavorites, updatePassword } from '../../Firebase/dataService';
import { useDispatch, useSelector } from 'react-redux';
import { setBookings, setFavorites, setLoading, setError, setSuccess } from '../../Features/slices/userProfileSlice';
import './UserProfile.css';

const UserProfile = ({ user, onSignOut, onClose }) => {
  // Profile state
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || `${user?.name || ''} ${user?.surname || ''}`,
    photoURL: user?.photoURL || 'https://www.v0.app/api/image/tabler-user-icon.png?id=eyJmbiI6ImdldEljb25IZXJvSW1hZ2UiLCJhcmdzIjp7Imljb25TZXRTbHVnIjoidGFibGVyIiwiaWNvblNsdWciOiJ1c2VyIn19',
  });

  // Password state
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Notification state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('');

  // Redux state
  const bookings = useSelector((state) => state.userProfile.bookings);
  const favorites = useSelector((state) => state.userProfile.favorites);
  const isLoading = useSelector((state) => state.userProfile.isLoading);
  const error = useSelector((state) => state.userProfile.error);
  const success = useSelector((state) => state.userProfile.success);

  const dispatch = useDispatch();

  // Effect to load user data
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
          showSnackbar('Failed to fetch data. Please try again later.', 'error');
          dispatch(setError('Failed to fetch data. Please try again later.'));
          console.error(err)
        } finally {
          dispatch(setLoading(false));
        }
      }
    };

    loadData();
  }, [user, dispatch]);

  // Effect to handle Redux state changes for notifications
  useEffect(() => {
    if (error) {
      showSnackbar(error, 'error');
      dispatch(setError(null));
    }
    if (success) {
      showSnackbar(success, 'success');
      dispatch(setSuccess(null));
    }
  }, [error, success, dispatch]);

  const handleProfileEdit = () => {
    setEditMode(true);
  };

  const handleProfileSave = async () => {
    // Here you would add logic to update the user profile in Firebase
    // For example: await updateProfile(user, profileData);
    setEditMode(false);
    showSnackbar('Profile updated successfully!', 'success');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handlePasswordChange = async () => {
    if (newPassword.length < 6) {
      showSnackbar('Password must be at least 6 characters long.', 'error');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      showSnackbar('Passwords do not match.', 'error');
      return;
    }
    
    try {
      await updatePassword(user, newPassword);
      showSnackbar('Password changed successfully!', 'success');
      setOpenChangePassword(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      showSnackbar('Failed to change password. Please try again.', 'error');
      console.error(error)
    }
  };

  const showSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarOpen(true);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setSnackbarOpen(false);
    }, 3000);
  };

  const renderList = (items, type) => {
    return items.length > 0 ? (
      items.map((item) => (
        <li key={item.id} className={`list-item ${type}`}>
          <div className="item-header">
            {type === 'favorites' ? item.name : `Booking #${item.id}`}
          </div>
          <div className="item-details">
            {type === 'favorites'
              ? item.description
              : `Date: ${new Date(item.checkInDate).toLocaleDateString()} - ${new Date(item.checkOutDate).toLocaleDateString()}`}
          </div>
        </li>
      ))
    ) : (
      <p className="empty-list">No {type} found.</p>
    );
  };

  return (
    <div className="user-profile-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        
        <div className="profile-header">
          {editMode ? (
            <>
              <div className="avatar-container">
                <img
                  alt="Profile"
                  src={profileData.photoURL}
                  className="profile-avatar"
                />
                <button className="change-avatar-btn">Change</button>
              </div>
              <input
                type="text"
                name="displayName"
                value={profileData.displayName}
                onChange={handleInputChange}
                className="edit-name-input"
              />
            </>
          ) : (
            <>
              <img
                alt={profileData.displayName}
                src={profileData.photoURL}
                className="profile-avatar"
              />
              <h2>{profileData.displayName}</h2>
            </>
          )}
          <p className="user-email">{user?.email || 'user@example.com'}</p>
        </div>

        <div className="profile-section">
          <h3 className="section-title">Favorites</h3>
          {isLoading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <ul className="items-list favorites-list">
              {renderList(favorites, 'favorites')}
            </ul>
          )}
        </div>

        <div className="profile-section">
          <h3 className="section-title">Your Bookings</h3>
          {isLoading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <ul className="items-list bookings-list">
              {renderList(bookings, 'bookings')}
            </ul>
          )}
        </div>

        <div className="action-buttons">
          {editMode ? (
            <>
              <button className="save-btn" onClick={handleProfileSave} disabled={isLoading}>
                Save Changes
              </button>
              <button className="cancel-btn" onClick={() => setEditMode(false)} disabled={isLoading}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="edit-btn" onClick={handleProfileEdit} disabled={isLoading}>
                Edit Profile
              </button>
              <button className="password-btn" onClick={() => setOpenChangePassword(true)} disabled={isLoading}>
                Change Password
              </button>
              <button className="signout-btn" onClick={onSignOut} disabled={isLoading}>
                Sign Out
              </button>
            </>
          )}
        </div>

        {/* Password Change Modal */}
        {openChangePassword && (
          <div className="password-modal">
            <div className="password-modal-content">
              <span className="close-password-modal" onClick={() => setOpenChangePassword(false)}>&times;</span>
              <h3>Change Password</h3>
              <div className="password-form">
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="password-input"
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="password-input"
                  />
                </div>
                <button className="update-password-btn" onClick={handlePasswordChange}>
                  Update Password
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Snackbar Notification */}
        {snackbarOpen && (
          <div className={`snackbar ${snackbarType}`}>
            {snackbarMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;