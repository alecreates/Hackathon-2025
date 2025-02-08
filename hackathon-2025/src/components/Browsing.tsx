"use client";

import { useState, useEffect} from "react";
import Link from "next/link";
import styles from "./Browsing.module.css";
import { StringExpressionOperatorReturningBoolean } from "mongoose";


interface User {
  _id: string;
  name: string;
  email: string;
  birthday: string;
  bio: string;
  image: string;
  song1: string;
  song2: string;
  song3: string;
  song4: string;
  song5: string;
}





const Browsing = () => {
  // used determine if compatibility displayed for all 5 users
  const [matched1, setMatched1] = useState(false); 
  const [users, setUsers] = useState<User[]>([]);
  const [userNumber, setUserIndex] = useState<number>(0); // Track which user's data to display
  

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

  // Save the matched user's index to localStorage
  const handleMatch = () => {
    if (users.length > 0) {
      setMatched1(true)
      const matchedUser = users[userNumber]; // Get the matched user
      const existingMatches = JSON.parse(localStorage.getItem("matches") || "[]");
      // Add the new match to the existing matches array
      
      // avoids adding duplicate

      const isAlreadyMatched = existingMatches.some((user: any) => user._id === matchedUser._id);

      if (isAlreadyMatched) {
        console.log("This user is already in your matches.");
      return; // Exit early if the user is already matched
      }
      
      existingMatches.push(matchedUser);
      // Save the updated matches array to localStorage
      localStorage.setItem("matches", JSON.stringify(existingMatches));
      console.log("User matched:", matchedUser);
      
    }
  };

  const handleNextUser = () => {
    if (users.length > 0) {
      setUserIndex((prevIndex) => (prevIndex + 1) % users.length); // Wrap around to the first user if the last user is reached
      setMatched1(false)
    }
  };
  

  return (

    <div className={styles.browsingContainer}>
      <nav className={styles.navbar}>
        <Link href="/profile">View Profile</Link>
        <Link href="/browsing">Browsing</Link>
        <Link href="/messaging">Your Favorite Matches</Link>
        <Link href="/settings">Settings</Link>
      </nav>
    
      <div className={styles.profileCard}> 
      {users.length > 0 ? (
        <img src={users[userNumber].image} alt="" className={styles.profilePic} />
      ) : (
        <p>Loading user data...</p> // Show loading message until data is fetched
      )}
      {users.length > 0 ? (
        <h3>{users[userNumber].name}, {calculateAge(users[userNumber].birthday)} years old</h3>
      ) : (
        <p>Loading user data...</p> // Show loading message until data is fetched
      )}
      {users.length > 0 ? (
        <p>🎵 Bio: {users[userNumber].bio}</p>
      ) : (
        <p>Loading user data...</p> // Show loading message until data is fetched
      )}
        
        <strong>Top 5 Songs:</strong>

      {users.length > 0 ? (
        <div className={styles.songList}>
          <ul>
            <li className={styles.song}>{users[userNumber].song1}</li>
            <li className={styles.song}>{users[userNumber].song2}</li>
            <li className={styles.song}>{users[userNumber].song3}</li>
            <li className={styles.song}>{users[userNumber].song4}</li>
            <li className={styles.song}>{users[userNumber].song5}</li>
          </ul>
        </div>
      ) : (
        <p>Loading user data...</p> // Show loading message until data is fetched
      )}
        
        <div className={styles.buttons}>
          <button onClick={handleMatch}>Match Me</button>
          <button onClick={handleNextUser}>Not Interested</button>
        </div>
        {matched1 && <p className={styles.compatibilityScore}>💖 Music Compatibility: 85%</p>}
      </div>

    </div>

  );
};


export default Browsing;