
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Browsing.module.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Browsing = () => {
  const [matched, setMatched] = useState(false); // used determine if compatibility displayed

  return (
    <div className={styles.browsingContainer}>
      <nav className={styles.navbar}>
        <Link href="/profile">Profile</Link>
        <Link href="/browsing">Browsing</Link>
        <Link href="/messaging">Messaging</Link>
        <Link href="/settings">Settings</Link>
      </nav>
      
      <div className={styles.profileCard}> 
      <img src="/default-profile.jpg" alt="" className={styles.profilePic} />
      <h3>Alex, 25</h3>
        <p>🎵 Bio: Music lover & traveler</p>
        <h4>Top 5 Songs:</h4>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
          <li>Song 4</li>
          <li>Song 5</li>
        </ul>
        <div className={styles.buttons}>
          <button onClick={() => setMatched(true)}>Match Me</button>
          <button>Not Interested</button>
        </div>
        {matched && <p className={styles.compatibilityScore}>💖 Music Compatibility: 85%</p>}
      </div>

      <div className={styles.profileCard}> 
      <img src="/default-profile.jpg" alt="" className={styles.profilePic} />
      <h3>Tim, 22</h3>
        <p>🎵 Bio: Music lover & traveler</p>
        <h4>Top 5 Songs:</h4>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
          <li>Song 4</li>
          <li>Song 5</li>
        </ul>
        
        <div className={styles.buttons}>
          <button onClick={() => setMatched(true)}>Match Me</button>
          <button>Not Interested</button>
        </div>
        {matched && <p className={styles.compatibilityScore}>💖 Music Compatibility: 85%</p>}
      </div>

      <div className={styles.profileCard}> 
      <img src="/default-profile.jpg" alt="" className={styles.profilePic} />
      <h3>Sarah, 27</h3>
        <p>🎵 Bio: Music lover & traveler</p>
        <h4>Top 5 Songs:</h4>
        <div className={styles.songList}>
          <ul>
            <li>Song 1</li>
            <li>Song 2</li>
            <li>Song 3</li>
            <li>Song 4</li>
            <li>Song 5</li>
          </ul>
        </div>

        <div className={styles.buttons}>
          <button onClick={() => setMatched(true)}>Match Me</button>
          <button>Not Interested</button>
        </div>
        {matched && <p className={styles.compatibilityScore}>💖 Music Compatibility: 85%</p>}
      </div>

    </div>
  );
};


export default Browsing;
