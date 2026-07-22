"use client";

import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../redux/authSlice";
import styles from "./sidebar.module.css";
import Link from "next/link";
import { PiHouseLine, PiBookmarkSimple, PiGear, PiQuestion } from "react-icons/pi";
import { RiBallPenLine } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAudio } from "../context/audioContext";
import { PiTextAa } from "react-icons/pi";

export default function Sidebar({ onLoginClick }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const isGuest = useSelector((state) => state.auth.isGuest);
    const isLoggedIn = Boolean(user) || isGuest;
    const pathname = usePathname();
    const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
    const audio = useAudio();
    const summaryFontSize = audio?.summaryFontSize;
    const setSummaryFontSize = audio?.setSummaryFontSize;

    const handleLogout = async () => {
        if (isGuest) {
            dispatch(clearUser());
            return;
        }

        await signOut(auth);
        dispatch(clearUser());
        };
    
    return (
        <>
            <div className={sidebarOpen ? `${styles.sidebar} ${styles.open}` : styles.sidebar}>
                <div className={styles.side__wrapper}>
                    <figure className={styles.side__imgMask}>
                        <Link href="/">
                            <img className={styles.side__img} src="/assets/logo.png" alt="logo" />
                        </Link>
                    </figure>
                    <ul className={`${styles["side__list"]} ${styles["side__listTop"]}`}>
                        <Link href="/for-you">
                            <li className={`${styles["side__item"]} ${styles["clickable"]}`}>
                                <div className={`${styles.active__line} ${
                                pathname === "/for-you" ? styles.active : ""
                                }`}></div>
                                <PiHouseLine className={styles.side__icon}/>
                                <p className={styles.item__name}>For you</p>
                            </li>
                        </Link>
                        <Link href="/library">
                            <li className={`${styles["side__item"]} ${styles["clickable"]}`}>
                                <div className={`${styles.active__line} ${
                                pathname === "/library" ? styles.active : ""
                                }`}></div>
                                <PiBookmarkSimple className={styles.side__icon}/>
                                <p className={styles.item__name}>My Library</p>
                            </li>
                        </Link>
                        <li className={`${styles["side__item"]} ${styles["not__clickable"]}`}>
                            <div className={styles.active__line}></div>
                            <RiBallPenLine className={styles.side__icon}/>
                            <p className={styles.item__name}>Highlights</p>
                        </li>
                        <li className={`${styles["side__item"]} ${styles["not__clickable"]}`}>
                            <div className={styles.active__line}></div>
                            <AiOutlineSearch className={styles.side__icon}/>
                            <p className={styles.item__name}>Search</p>
                        </li>
                        {audio && (
                            <li className={styles.fontSizeController}>
                                <div className={styles.fontSizeOptions}>
                                    <button
                                    className={`${styles.size__button} ${summaryFontSize === "14px" ? styles.selected : ""}`}
                                    onClick={() => setSummaryFontSize("14px")}
                                    >
                                        <PiTextAa className={styles.size__s}/>
                                    </button>

                                    <button
                                    className={`${styles.size__button} ${summaryFontSize === "16px" ? styles.selected : ""}`}
                                    onClick={() => setSummaryFontSize("16px")}
                                    >
                                        <PiTextAa className={styles.size__m}/>
                                    </button>

                                    <button
                                    className={`${styles.size__button} ${summaryFontSize === "20px" ? styles.selected : ""}`}
                                    onClick={() => setSummaryFontSize("20px")}
                                    >
                                        <PiTextAa className={styles.size__l}/>
                                    </button>

                                    <button
                                    className={`${styles.size__button} ${summaryFontSize === "24px" ? styles.selected : ""}`}
                                    onClick={() => setSummaryFontSize("24px")}
                                    >
                                        <PiTextAa className={styles.size__xl}/>
                                    </button>
                                </div>
                            </li>
                        )}
                    </ul>
                    <ul className={`${styles["side__list"]} ${styles["side__listBottom"]}`}>
                    <Link href="/settings">
                            <li className={`${styles["side__item"]} ${styles["clickable"]}`}>
                                <div className={`${styles.active__line} ${
                                pathname === "/settings" ? styles.active : ""
                                }`}></div>
                                <PiGear className={styles.side__icon}/>
                                <p className={styles.item__name}>Settings</p>
                            </li>
                        </Link>
                        <li className={`${styles["side__item"]} ${styles["not__clickable"]}`}>
                            <div className={styles.active__line}></div>
                            <PiQuestion className={styles.side__icon}/>
                            <p className={styles.item__name}>Help & Support</p>
                        </li>
                        
                        {isLoggedIn ? (
                        <li 
                        className={`${styles["side__item"]} ${styles["clickable"]}`}
                        onClick={handleLogout}
                        >
                            <div className={styles.active__line}></div>
                            <MdLogout className={styles.side__icon}/>
                            <p className={styles.item__name}>Logout</p>
                        </li>
                        ) : (
                        <li 
                        className={`${styles["side__item"]} ${styles["clickable"]}`}
                        onClick={() => onLoginClick(pathname)}
                        >
                            <div className={styles.active__line}></div>
                            <MdLogout className={styles.side__icon}/>
                            <p className={styles.item__name}>Login</p>
                        </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}