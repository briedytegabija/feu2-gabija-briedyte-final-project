import React, {useState} from "react";
import Navbar from "../Components/Navbar";
import {createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import {auth} from "../index";
import {useHistory} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";

const Register = () => {
    const history = useHistory();
    const signup = async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password)
        await sendEmailVerification(auth.currentUser)
    }

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });

    const [validFields, setValidFields] = useState({
        email: true,
        password: true,
    });

    const handleInputChange = (event) => {
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value
        });
    }

    const validateAndSubmit = (event) => {
        // regex for email validation
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;
        // regex for password validation, >=6 chars
        const passwordRegex = /^.{6,}$/;

        setValidFields({
            email: emailRegex.test(userInfo.email),
            password: passwordRegex.test(userInfo.password),
        });

        if (emailRegex.test(userInfo.email) && passwordRegex.test(userInfo.password)) {
            signup(userInfo.email, userInfo.password).then(() => {
                toast("Registration successful!");
            }).catch((error) => {
                console.log(error);
            });
        }

        event.preventDefault();
    }
    
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
