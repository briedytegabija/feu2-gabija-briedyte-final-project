import React, {useState} from 'react';
import Navbar from "../Components/Navbar";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../index";
import {useHistory} from "react-router-dom";

const Login = () => {
    return (
        <>
            <Navbar/>
            <main>
                <h1 className={"title"}>Login</h1>
                <form className={"form"} onSubmit={validateAndSubmit}>
                    <label>Email</label>
                    <input type={"text"} name={"email"} onChange={handleInputChange}
                        autoComplete={"email"}
                        className={"field"}/>
                    <label>Password</label>
                    <input type={"password"} name={"password"} onChange={handleInputChange}
                        autoComplete={"current-password"}
                        className={"field"}/>
                    <input type={"submit"} value={"Log in"} className={"button"}/>
                    <div className={`error ${errorMessage.length > 0 && "visible"}`}>
                        <p>{errorMessage}</p>
                    </div>

                </form>
            </main>
        </>
    );
};

export default Login;
