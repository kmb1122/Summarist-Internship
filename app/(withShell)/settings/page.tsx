"use client";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Link from "next/link";
import Login from "../../components/login";
import styles from "./page.module.css";

export default function Settings() {
  const user = useSelector((state) => state.auth.user);
  const [showLogin, setShowLogin] = useState(false);
  const plan = useSelector((state) => state.auth.plan);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);
    
  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div style={{ width: "100%", padding: "20px", display: "flex", flexDirection: "column" }}>
            <div
              className="skeleton"
              style={{ width: "160px", height: "32px", marginBottom: "60px" }}
            ></div>
            <div
              className="skeleton"
              style={{ width: "240px", height: "100px", marginBottom: "30px" }}
            ></div>
            <div
              className="skeleton"
              style={{ width: "240px", height: "100px", marginBottom: "30px" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className={styles.settings}>
          <h1 className={styles.settings__title}>Settings</h1>

          {user ? (
            <>
              <div className={styles.subscription}>
                <h2 className={styles.settings__subtitle}>Your Subscription Plan</h2>
                <p className={styles.settings__p}>
                  {user?.subscriptionPlan}
                </p>
                {plan === "Basic" && (
                  <Link href="/choose-plan">
                    <button className={`btn ${styles.upgrade__btn}`}>
                      Upgrade to Premium
                    </button>
                  </Link>
                )}
              </div>
              <div className={styles.email}>
                <h2 className={styles.settings__subtitle}>Email</h2>
                <p className={styles.settings__p}>
                  {user?.email}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className={styles.logged__out}>
                <figure className={styles.login__imgWrapper}>
                  <img className={styles.login__img} src="/assets/login.png" alt="Login required" />
                </figure>
                <h2 className={styles.settings__login}>
                  Log in to your account to see your details.
                </h2>
                <button
                  className={`btn ${styles.login__btn}`}
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </button>
              </div>
              {showLogin && <Login onClose={() => setShowLogin(false)} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}