"use client";

import { useRouter } from "next/navigation";
import styles from "./Settings.module.css";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Settings = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogOut = async () => {
    // Call NextAuth's signOut function to end the session
    await signOut({ redirect: false }); // prevent automatic redirect
    router.push("/"); // Redirect to the homepage or login page
  };

  return (
    <div className={styles.settingsContainer}>
      <nav className={styles.navbar}>
        <Link href="/profile">View Profile</Link>
        <Link href="/browsing">Browsing</Link>
        <Link href="/messaging">Your Favorite Matches</Link>
        <Link href="/settings">Settings</Link>
      </nav>
      <button className={styles.logoutButton} onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default Settings;
