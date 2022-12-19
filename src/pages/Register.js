import React, {useState} from "react";
import Navbar from "../Components/Navbar";
import {createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import {auth} from "../index";
import {useHistory} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";

const Register = () => {
    return (
        <>
            <Navbar loggedIn={false}/>
            <main>
                <h1 className={"title"}>Register</h1>
                <form className={"form"} onSubmit={validateAndSubmit}>
                    <label>Email</label>
                    <input type={"text"} name={"email"} onChange={handleInputChange}
                           autoComplete={"email"}
                           className={`${!validFields.email ? "invalid-input" : "field"}`}/>
                    <label>Password</label>
                    <input type={"password"} name={"password"} onChange={handleInputChange}
                           autoComplete={"current-password"}
                           className={`${!validFields.password ? "invalid-input" : "field"}`}/>
                    <input type={"submit"} value={"Register"} className={"button"}/>
                    <div
                        className={`error ${(!validFields.email || !validFields.password) && "visible"}`}>
                        {!validFields.email ? <p>Invalid email.</p> : <></>}
                        {!validFields.password ? <p>Invalid password, must have at least 6 characters.</p> : <></>}
                    </div>

                </form>
            </main>
            <Toaster/>
        </>);
};

export default Register;
