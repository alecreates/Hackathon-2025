"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Browsing.module.css";


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
  const [matched1, setMatched1] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [userNumber, setUserIndex] = useState<number>(0);
  const [compatibilityScore, setCompatibilityScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from the API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again later.");
      }
    };

    fetchUsers();
  }, []);

  // Function to calculate user's age based on birthday
  function calculateAge(birthday: string): number {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  // Handle moving to the next user
  const handleNextUser = () => {
    if (users.length > 0) {
      setUserIndex((prevIndex) => (prevIndex + 1) % users.length);
      setMatched1(false);
      setCompatibilityScore(null);
    }
  };

  // Handle "Match Me" button click
  const handleMatch = async () => {
    if (users.length < 2) {
      setError("Not enough users to match.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const currentUser = users[userNumber];
    const nextUser = users[(userNumber + 1) % users.length];

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get_compatibility`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          song1_name: currentUser.song1,
          song2_name: currentUser.song2,
          song3_name: currentUser.song3,
          song4_name: currentUser.song4,
          song5_name: currentUser.song5,
          song1_name_next: nextUser.song1,
          song2_name_next: nextUser.song2,
          song3_name_next: nextUser.song3,
          song4_name_next: nextUser.song4,
          song5_name_next: nextUser.song5,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to calculate compatibility");
      }

      const data = await response.json();
      setCompatibilityScore(data.compatibility_score);
      setMatched1(true);
    } catch (err) {
      console.error("Error calculating compatibility:", err);
      setError(err.message || "Failed to calculate compatibility. Please try again.");
    } finally {
      setIsLoading(false);
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
        {error && <p className={styles.error}>{error}</p>}
        {users.length > 0 ? (
          <>
            <img src={users[userNumber].image} alt="" className={styles.profilePic} />
            <h3>
              {users[userNumber].name}, {calculateAge(users[userNumber].birthday)} years old
            </h3>
            <p>🎵 Bio: {users[userNumber].bio}</p>
            <h4>Top 5 Songs:</h4>
            <div className={styles.songList}>
              <ul>
                <li className={styles.song}>{users[userNumber].song1}</li>
                <li className={styles.song}>{users[userNumber].song2}</li>
                <li className={styles.song}>{users[userNumber].song3}</li>
                <li className={styles.song}>{users[userNumber].song4}</li>
                <li className={styles.song}>{users[userNumber].song5}</li>
              </ul>
            </div>
          </>
        ) : (
          <p>Loading user data...</p>
        )}

        <div className={styles.buttons}>
          <button onClick={handleMatch} disabled={isLoading}>
            {isLoading ? "Calculating..." : "Match Me"}
          </button>
          <button onClick={handleNextUser}>Not Interested</button>
        </div>

        {matched1 && compatibilityScore !== null && (
          <p className={styles.compatibilityScore}>
            💖 Music Compatibility: {compatibilityScore}%
          </p>
        )}
      </div>
    </div>
  );
};

export default Browsing;