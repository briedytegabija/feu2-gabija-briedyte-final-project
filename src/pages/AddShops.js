import React, {useCallback, useState} from 'react';
import {useAuth} from "../App";
import {Redirect} from "react-router-dom";
import Navbar from "../Components/Navbar";
import styles from "../Styles/Shops.module.css";
import toast, {Toaster} from 'react-hot-toast';
import {collection, addDoc} from "firebase/firestore";
import {db} from "../index";

const AddShops = () => {

    
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