import React, {useState} from 'react';
import Navbar from "../Components/Navbar";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../index";
import {useHistory} from "react-router-dom";


const Login = () => {

    const history = useHistory();

    const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password)

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (event) => {
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value
        });
    }

    const validateAndSubmit = (event) => {
        signIn(userInfo.email, userInfo.password).then(() => {
            setErrorMessage("");
            // add current user to local storage
            localStorage.setItem("user", JSON.stringify(auth.currentUser));
            history.push("/");
        }).catch((error) => {
            console.log(error);
            setErrorMessage("Invalid username or password");
        });

        event.preventDefault();
    }

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
