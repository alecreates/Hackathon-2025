"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Browsing.module.css";


const Browsing = () => {
  // used determine if compatibility displayed for all 5 users
  const [matched1, setMatched1] = useState(false); 
  const [matched2, setMatched2] = useState(false);
  const [matched3, setMatched3] = useState(false);
  const [matched4, setMatched4] = useState(false);
  const [matched5, setMatched5] = useState(false);
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
        <div className={styles.songList}>
          <ul>
            <li className={styles.song}>Song 1</li>
            <li className={styles.song}>Song 2</li>
            <li className={styles.song}>Song 3</li>
            <li className={styles.song}>Song 4</li>
            <li className={styles.song}>Song 5</li>
          </ul>
        </div>
        <div className={styles.buttons}>
          <button onClick={() => setMatched1(true)}>Match Me</button>
          <button>Not Interested</button>
        </div>
        {matched1 && <p className={styles.compatibilityScore}>💖 Music Compatibility: 85%</p>}
      </div>

      <div className={styles.profileCard}> 
      <img src="/default-profile.jpg" alt="" className={styles.profilePic} />
      <h3>Tim, 22</h3>
        <p>🎵 Bio: Music lover & traveler</p>
        <h4>Top 5 Songs:</h4>
        <div className={styles.songList}>
          <ul>
            <li className={styles.song}>Song 1</li>
            <li className={styles.song}>Song 2</li>
            <li className={styles.song}>Song 3</li>
            <li className={styles.song}>Song 4</li>
            <li className={styles.song}>Song 5</li>
          </ul>
        </div>
        
        <div className={styles.buttons}>
          <button onClick={() => setMatched2(true)}>Match Me</button>
          <button>Not Interested</button>
        </div>
        {matched2 && <p className={styles.compatibilityScore}>💖 Music Compatibility: 85%</p>}
      </div>

      <div className={styles.profileCard}> 
      <img src="/default-profile.jpg" alt="" className={styles.profilePic} />
      <h3>Sarah, 27</h3>
        <p>🎵 Bio: Music lover & traveler</p>
        <h4>Top 5 Songs:</h4>
        <div className={styles.songList}>
          <ul>
            <li className={styles.song}>Song 1</li>
            <li className={styles.song}>Song 2</li>
            <li className={styles.song}>Song 3</li>
            <li className={styles.song}>Song 4</li>
            <li className={styles.song}>Song 5</li>
          </ul>
        </div>

        <div className={styles.buttons}>
          <button onClick={() => setMatched3(true)}>Match Me</button>
          <button>Not Interested</button>
        </div>
        {matched3 && <p className={styles.compatibilityScore}>💖 Music Compatibility: 85%</p>}
      </div>

      <div className={styles.profileCard}> 
      <img src="/default-profile.jpg" alt="" className={styles.profilePic} />
      <h3>Sarah, 27</h3>
        <p>🎵 Bio: Music lover & traveler</p>
        <h4>Top 5 Songs:</h4>
        <div className={styles.songList}>
          <ul>
            <li className={styles.song}>Song 1</li>
            <li className={styles.song}>Song 2</li>
            <li className={styles.song}>Song 3</li>
            <li className={styles.song}>Song 4</li>
            <li className={styles.song}>Song 5</li>
          </ul>
        </div>

        <div className={styles.buttons}>
          <button onClick={() => setMatched4(true)}>Match Me</button>
          <button>Not Interested</button>
        </div>
        {matched4 && <p className={styles.compatibilityScore}>💖 Music Compatibility: 85%</p>}
      </div>

      <div className={styles.profileCard}> 
      <img src="/default-profile.jpg" alt="" className={styles.profilePic} />
      <h3>Sarah, 27</h3>
        <p>🎵 Bio: Music lover & traveler</p>
        <h4>Top 5 Songs:</h4>
        <div className={styles.songList}>
          <ul>
            <li className={styles.song}>Song 1</li>
            <li className={styles.song}>Song 2</li>
            <li className={styles.song}>Song 3</li>
            <li className={styles.song}>Song 4</li>
            <li className={styles.song}>Song 5</li>
          </ul>
        </div>

        <div className={styles.buttons}>
          <button onClick={() => setMatched5(true)}>Match Me</button>
          <button>Not Interested</button>
        </div>
        {matched5 && <p className={styles.compatibilityScore}>💖 Music Compatibility: 85%</p>}
      </div>

    </div>
  );
};


export default Browsing;