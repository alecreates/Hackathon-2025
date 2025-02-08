
"use client";

import { useRouter } from "next/navigation";
import styles from "./Settings.module.css";
import Link from "next/link";

const Settings = () => {
  const router = useRouter();

  const handleLogOut = () => {
    // logout logic
    router.push("/"); 
  };

  const handleDeleteAccount = () => {
    // delete logic
    router.push("/"); 
  };

  return (
    <div className={styles.settingsContainer}>
        <nav className={styles.navbar}>
        <Link href="/profile">View Profile</Link>
        <Link href="/browsing">Browsing</Link>
        <Link href="/messaging">Your Favorite Matches</Link>
        <Link href="/settings">Settings</Link>
      </nav>
      <h2>Settings</h2>
      <button className={styles.logoutButton} onClick={handleLogOut}>
        Log Out
      </button>
      <button
        className={`${styles.deleteButton} ${styles.deleteBtn}`}
        onClick={handleDeleteAccount}
      >
        Delete Account
      </button>
    </div>
  );
};

export default Settings;

