// src/services/dataService.js
import { db } from './firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

// Fetch bookings for a user
export const fetchBookings = async (userId) => {
  try {
    const bookingsQuery = query(collection(db, 'bookings'), where('userID', '==', userId));
    const querySnapshot = await getDocs(bookingsQuery);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
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
    throw error;
  }
};
