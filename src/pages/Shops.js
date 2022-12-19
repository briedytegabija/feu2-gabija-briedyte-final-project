import React, {useCallback, useEffect, useState} from 'react';
import Navbar from "../Components/Navbar";
import {useAuth} from "../App";
import {collection, getDocs} from "firebase/firestore";
import {Redirect} from "react-router-dom";
import styles from "../Styles/Shops.module.css"
import {db} from "../index";

const Shops = () => {
    return (<>
        {!isAuth && <Redirect to={'/login'}/>}
        <div>
            <Navbar/>
            {!loaded ? <p className={"center"}>Loading ...</p> : <main>
                <h1 className={"title"}>Shops:</h1>
                {shops.length > 0 ? <div className={styles.list}>
                    {shops.map(s => <div className={styles.item} key={s.shopName}>
                            <span className={styles.hero}>
                            <img src={s.imageUrl} alt={""} width={100}/>
                            <div className={styles.title}>
                                <h2>{s.shopName}</h2>
                                <h3>{s.town}</h3>
                            </div>
                            </span>
                        <p>{s.description}</p>
                        <p>Est. {s.startYear}</p>
                    </div>)}
                </div> : <h2 className={"center"}>No shops found!</h2>}
            </main>}
        </div>
    </>);
};

export default Shops;
