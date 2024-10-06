// src/features/contact/contactSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';

// Thunk to fetch contact messages from Firestore
export const fetchContacts = createAsyncThunk('contact/fetchContacts', async (_, { rejectWithValue }) => {
  try {
    const contactsRef = collection(db, 'contacts');
    const snapshot = await getDocs(contactsRef);
    const contacts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return rejectWithValue('Failed to fetch contacts.');
  }
});

// Thunk to add a contact message to Firestore
export const addContact = createAsyncThunk('contact/addContact', async (contactDetails, { rejectWithValue }) => {
  try {
    const contactsRef = collection(db, 'contacts');
    const docRef = await addDoc(contactsRef, contactDetails);
    return { id: docRef.id, ...contactDetails };
  } catch (error) {
    console.error('Error adding contact:', error);
    return rejectWithValue('Failed to add contact.');
  }
});

// Selector for accessing contacts from the state
export const selectContacts = (state) => state.contact.contacts;

// Initial state
const initialState = {
  contacts: [],
  loading: {
    fetch: false,
    add: false,
  },
  error: null,
  contactDetails: {
    name: '',
    email: '',
    surname: '',
    phone: '',
    message: '',
  },
};

// Slice
const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    updateContactDetails: (state, action) => {
      state.contactDetails = { ...state.contactDetails, ...action.payload };
    },
    resetContactDetails: (state) => {
      state.contactDetails = initialState.contactDetails;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading.fetch = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, (state) => {
        state.loading.add = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading.add = false;
        state.contacts.push(action.payload);
        state.contactDetails = initialState.contactDetails;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading.add = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { setContacts, updateContactDetails, resetContactDetails } = contactSlice.actions;
export default contactSlice.reducer;
