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

      <input type="file" id="image" name="image" accept="image/*" className={styles.fileInput} />
      
      <input type="text" placeholder="Type your name here" className={styles.textInput} />
      <input type="text" placeholder="Type your age here" className={styles.textInput} />
      <textarea placeholder="Write your bio here..." className={styles.textarea}></textarea>
      <input type="text" placeholder="Add your top song" className={styles.textInput} />
      <input type="text" placeholder="Song #2" className={styles.textInput} />
      <input type="text" placeholder="Song #3" className={styles.textInput} />
      <input type="text" placeholder="Song #4" className={styles.textInput} />
      <input type="text" placeholder="Song #5" className={styles.textInput} />
      <button className={styles.saveButton}>Save Profile</button>
    </div>
  );
};

export default Profile;