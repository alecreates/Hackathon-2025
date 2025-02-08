"use client";

import { useState, useEffect} from "react";
import Link from "next/link";
import styles from "./Browsing.module.css";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  birthday: string;
}

const Browsing = () => {
  // used determine if compatibility displayed for all 5 users
  const [matched1, setMatched1] = useState(false); 
  const [matched2, setMatched2] = useState(false);
  const [matched3, setMatched3] = useState(false);
  const [matched4, setMatched4] = useState(false);
  const [matched5, setMatched5] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/user") // Calls the GET method for first 5 users
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);


  function calculateAge(birthday: string): number {
    const birthDate = new Date(birthday); // Convert the birthday string to a Date object
    const today = new Date(); // Get today's date
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

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
      {users.length > 0 ? (
        <h3>{users[0].name}, {calculateAge(users[0].birthday)} years old</h3>
      ) : (
        <p>Loading user data...</p> // Show loading message until data is fetched
      )}
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
      {users.length > 0 ? (
        <h3>{users[1].name}, {calculateAge(users[1].birthday)} years old</h3>
      ) : (
        <p>Loading user data...</p> // Show loading message until data is fetched
      )}
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
      {users.length > 0 ? (
        <h3>{users[2].name}, {calculateAge(users[2].birthday)} years old</h3>
      ) : (
        <p>Loading user data...</p> // Show loading message until data is fetched
      )}
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
      {users.length > 0 ? (
        <h3>{users[3].name}, {calculateAge(users[3].birthday)} years old</h3>
      ) : (
        <p>Loading user data...</p> // Show loading message until data is fetched
      )}
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
      {users.length > 0 ? (
        <h3>{users[4].name}, {calculateAge(users[4].birthday)} years old</h3>
      ) : (
        <p>Loading user data...</p> // Show loading message until data is fetched
      )}
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