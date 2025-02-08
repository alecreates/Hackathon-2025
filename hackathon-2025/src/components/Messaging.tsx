
"use client";

import Link from "next/link";
import styles from "./Messaging.module.css";

const Messaging = () => {
  return (
    <div className={styles.messagingContainer}>
      <nav className={styles.navbar}>
        <Link href="/profile">Profile</Link>
        <Link href="/browsing">Browsing</Link>
        <Link href="/messaging">Messaging</Link>
        <Link href="/settings">Settings</Link>
      </nav>
      <h2>Messages</h2>
      <div className={styles.matchesRow}>
        <img src="/user1.jpg" alt="User" />
        <img src="/user2.jpg" alt="User" />
      </div>
      <div className={styles.chatWindow}>
        <p><strong>Alex:</strong> Hey! 😊</p>
      </div>
    </div>
  );
};

export default Messaging;
