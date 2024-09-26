// src/services/dataService.js
import { db } from './firebase'; // Your Firebase initialization file
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth as firebaseUpdatePassword } from 'firebase/auth'; // Ensure you have these imports

// Fetch bookings for a user
export const fetchBookings = async (userId) => {
  try {
    const bookingsQuery = query(collection(db, 'bookings'), where('userID', '==', userId));
    const querySnapshot = await getDocs(bookingsQuery);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw new Error('Could not fetch bookings. Please try again later.');
  }
};

// Fetch favorites for a user
export const fetchFavorites = async (userId) => {
  try {
    const favoritesQuery = query(collection(db, 'favorites'), where('userID', '==', userId));
    const querySnapshot = await getDocs(favoritesQuery);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw new Error('Could not fetch favorites. Please try again later.');
  }
};

// Update the user's password
export const updatePassword = async (user, newPassword) => {
  try {
    const auth = getAuth(); // Ensure you have initialized auth properly
    await firebaseUpdatePassword(user, newPassword);
  } catch (error) {
    console.error('Error updating password:', error);
    throw new Error('Could not update password. Please try again later.');
  }
};