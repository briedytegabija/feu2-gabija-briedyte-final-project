import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {initializeApp} from 'firebase/app';
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth";
import './Styles/index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    // </React.StrictMode>
);
