import React, {useCallback, useState} from 'react';
import {useAuth} from "../App";
import {Redirect} from "react-router-dom";
import Navbar from "../Components/Navbar";
import styles from "../Styles/Shops.module.css";
import toast, {Toaster} from 'react-hot-toast';
import {collection, addDoc} from "firebase/firestore";
import {db} from "../index";

const AddShops = () => {

    const isAuth = useAuth();
    const notify = (message) => toast(message);

    const [data, setData] = useState({});
    const [fieldErrors, setFieldErrors] = useState({
        shopName: "", town: "", startYear: "", imageUrl: "", description: ""
    });


    const handleFormChange = (event) => {
        setData({
            ...data, [event.target.name]: event.target.value,
        });
    }

    const addShop = useCallback(async (name, location, est, desc, img) => {
        await addDoc(collection(db, "shops"), {
            shopName: name, town: location, startYear: est, description: desc, imageUrl: img
        })
    }, []);

    const validateAndSubmit = (event) => {
        setFieldErrors({
            shopName: data.shopName.length >= 4 ? "" : "Shop name must be at least 4 characters long",
            town: data.town.length >= 4 ? "" : "Town must be at least 4 characters long",
            startYear: data.startYear >= 1970 && data.startYear <= 2022 ? "" : "Establishment must be between 1970 and 2022",
            imageUrl: data.imageUrl.length >= 5 ? "" : "Image url must be at least 5 characters long",
            description: data.description.length >= 6 ? "" : "Description must be at least 5 characters long",
        });
        const isValid = data.shopName.length >= 4 &&
            data.town.length >= 4 &&
            (data.startYear >= 1970 && data.startYear <= 2022) &&
            data.imageUrl.length >= 5 &&
            data.description.length >= 6;

        if (isValid) {
            addShop(data.shopName, data.town, data.startYear, data.description, data.imageUrl).then(() => {
                notify("Shop added successfully!")
            }).catch((error) => {
                console.log(error);
                notify("Could not add shop!")
            });
        }
        event.preventDefault();
    }


    
    return (<>
        {!isAuth && <Redirect to={'/login'}/>}
        <Navbar/>
        <main>
            <h1 className={"title"}>Add Shops:</h1>
            <form className={"form"} onSubmit={validateAndSubmit}>
                <label>Shop name:</label>
                <input type={"text"} name={"shopName"} onChange={handleFormChange}
                       className={`field ${fieldErrors.shopName.length > 0 && "invalid-input"}`}/>
                <p className={`error ${fieldErrors.shopName.length > 0 && "visible"}`}>{fieldErrors.shopName}</p>
                <label>Town:</label>
                <input type={"text"} name={"town"} onChange={handleFormChange}
                       className={`field ${fieldErrors.town.length > 0 && "invalid-input"}`}/>
                <p className={`error ${fieldErrors.town.length > 0 && "visible"}`}>{fieldErrors.town}</p>
                <label>Established:</label>
                <input type={"number"} name={"startYear"} onChange={handleFormChange}
                       className={`field ${fieldErrors.startYear.length > 0 && "invalid-input"}`}/>
                <p className={`error ${fieldErrors.startYear.length > 0 && "visible"}`}>{fieldErrors.startYear}</p>
                <label>Description:</label>
                <textarea name={"description"} onChange={handleFormChange}
                          className={`field text-area ${fieldErrors.description.length > 0 && "invalid-input"}`}/>
                <p className={`error ${fieldErrors.description.length > 0 && "visible"}`}>{fieldErrors.description}</p>
                <label>Image URL:</label>
                <input type={"text"} name={"imageUrl"} onChange={handleFormChange}
                       className={`field ${fieldErrors.imageUrl.length > 0 && "invalid-input"}`}/>
                <p className={`error ${fieldErrors.imageUrl.length > 0 && "visible"}`}>{fieldErrors.imageUrl}</p>
                <input type={"submit"} value={"Add Shop"} className={"button"}/>
            </form>
            <Toaster/>
        </main>
    </>);
};

export default AddShops;