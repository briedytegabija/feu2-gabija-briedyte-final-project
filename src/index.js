import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {initializeApp} from 'firebase/app';
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth";
import './Styles/index.css';
import App from './App';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  projectId: process.env.REACT_APP_PROJECT_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    // </React.StrictMode>
);
