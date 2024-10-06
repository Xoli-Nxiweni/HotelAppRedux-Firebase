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
// Enhanced fetchFavorites function
export const fetchFavorites = async (userId) => {
  try {
    // Ensure userId is passed correctly
    if (!userId) throw new Error('User ID is required to fetch favorites');

    // Query the favorites collection where userID matches the provided userId
    const favoritesQuery = query(collection(db, 'favorites'), where('userID', '==', userId));
    const querySnapshot = await getDocs(favoritesQuery);

    // Check if query returns any data
    if (querySnapshot.empty) {
      console.warn('No favorites found for user:', userId);
      return [];
    }

    // Map over the documents and return them
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