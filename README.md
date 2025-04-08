# HotelAppRedux-Firebase

This is a hotel management application built using React, Redux, Firebase, and Vite for rapid development. The application allows users to manage hotel bookings, view available rooms, and interact with a Firebase backend for real-time data handling.

## Features

- **React**: Front-end UI and user interactions.
- **Redux**: Global state management.
- **Firebase**: Authentication and data persistence.
- **Vite**: Fast development build tool.
- **CSS**: Strictly CSS for styling the application.

## Tech Stack

- React
- Redux
- Firebase
- Vite
- CSS

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (version 14 or above).
- A Firebase account for setting up the backend.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Xoli-Nxiweni/HotelAppRedux-Firebase.git
   cd HotelAppRedux-Firebase
   ```

2. Install dependencies:

   ```bash
   npm install --legacy-peer-deps
   ```

3. Configure Firebase:
   - Go to Firebase Console.
   - Create a new Firebase project.
   - Enable Authentication and set up your preferred sign-in method.
   - Enable Firestore Database for storing user and booking data.
   - Replace the Firebase configuration in `src/firebase.js` with your own Firebase credentials.

4. Run the development server:

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the project for production.
- `npm run preview`: Previews the production build locally.

## Project Structure

```
├── public            # Static files
├── src
│   ├── components    # React components
│   ├── redux         # Redux store and slices
│   ├── styles        # CSS styles
│   ├── App.jsx       # Main app component
│   ├── main.jsx      # App entry point
│   └── firebase.js   # Firebase configuration
├── .gitignore        # Git ignore rules
├── package.json      # Node.js dependencies and scripts
└── vite.config.js    # Vite configuration
```
## Quick link

https://hotelappredux-firebase.onrender.com

## CSS Styling

The project uses strictly CSS for styling. All styles are located in the `src/styles` directory and adhere to standard CSS conventions. No CSS frameworks or preprocessors are used.

## Firebase Configuration

To connect the app to Firebase, replace the content of `src/firebase.js` with your Firebase configuration:

```javascript
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export default app;
```
## Usage

to use this application, users are advised to create credentials for a smooth performance of the system and validate you as the user.


## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please contact Xoli Nxiweni, xolinxiiweni@gmail.com
