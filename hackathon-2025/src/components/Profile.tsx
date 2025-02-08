
"use client";

import Link from "next/link";
import styles from "./Profile.module.css";

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <nav className={styles.navbar}>
        <Link href="/profile">Profile</Link>
        <Link href="/browsing">Browsing</Link>
        <Link href="/messaging">Messaging</Link>
        <Link href="/settings">Settings</Link>
      </nav>
      <h2>My Profile</h2>
      <input type="file" accept="image/*" className={styles.fileInput} />
      <textarea placeholder="Write your bio here..." className={styles.textarea}></textarea>
      <input type="text" placeholder="Search for favorite songs..." className={styles.textInput} />
      <button className={styles.saveButton}>Save Profile</button>
    </div>
  );
};

export default Profile;

