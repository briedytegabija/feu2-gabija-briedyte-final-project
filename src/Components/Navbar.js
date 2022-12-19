import React from 'react';
import logo from '../logo.svg'
import styles from "../Styles/Navbar.module.css"
import {useAuth} from "../App";
import {auth} from "../index";
import {signOut} from "firebase/auth";
import {useHistory} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";


const Navbar = () => {
    const history = useHistory();
    const logout = () => {
        signOut(auth).then(() => {
            history.push('/');
            localStorage.removeItem("user");
        }).catch(() => toast("Could not sign out"));
    }

    const isAuth = useAuth();
    return (<nav className={styles.navbar}>
        <img onClick={() => history.push('/')} className={styles.logo} src={logo} width={100} alt={"Logo"}/>
        <div className={styles.container}>
            {isAuth ? <>
                <a href={"/shops"}>Shops</a>
                <a href={"/add-shops"}>Add Shops</a>
                <p onClick={logout} style={{cursor: "pointer"}}>Logout</p>
            </> : <>
                <a href={"/login"}>Login</a>
                <a href={"/register"}>Register</a>
            </>}
        </div>
        <Toaster/>
    </nav>);
};

export default Navbar;
