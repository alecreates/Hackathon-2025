"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Browsing.module.css";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();

  const [users, setUsers] = useState<User[]>([]);
  const [userNumber, setUserIndex] = useState<number>(0);
  const [outOfUsers, setOutOfUsers] = useState(false);
  const [compatibilityScore, setCompatibilityScore] = useState<number | null>(null);
  const [isMatchMode, setIsMatchMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from the API on component mount
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if (session?.user?.id) {
          const filteredUsers = data.filter((user: User) => user._id !== session.user.id);
          setUsers(filteredUsers);
        } else {
          setUsers(data);
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, [session]);

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

  const handleCheckCompatibility = () => {
    if (users.length > 0) {
      const currentUser = users[userNumber];
      const nextUser = users[(userNumber + 1) % users.length]; // Get the next user (or wrap around)

      setIsLoading(true);
      setError(null);

      // Make the API call to get the compatibility score
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get_compatibility`, {
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
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.compatibility_score) {
            setCompatibilityScore(data.compatibility_score); // Set compatibility score from API response
            setIsMatchMode(true); // Show "Match Me" button after compatibility score is displayed
          } else {
            setError("Failed to calculate compatibility. Please try again.");
          }
        })
        .catch((err) => {
          console.error("Error fetching compatibility score:", err);
          setError(err.message || "Failed to calculate compatibility. Please try again.");
          setCompatibilityScore(null); 
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleMatch = () => {
    if (users.length > 0) {
      const matchedUser = users[userNumber];
      const existingMatches = JSON.parse(localStorage.getItem("matches") || "[]");

      const isAlreadyMatched = existingMatches.some((user: any) => user._id === matchedUser._id);

      if (isAlreadyMatched) {
        console.log("This user is already in your matches.");
        return;
      }

      existingMatches.push(matchedUser);
      localStorage.setItem("matches", JSON.stringify(existingMatches));
      console.log("User matched:", matchedUser);

      // Remove the matched user from the array
      const updatedUsers = users.filter((_, index) => index !== userNumber);
      setUsers(updatedUsers);

      // If there are no more users left, display the "out of users" message
      if (updatedUsers.length > 0) {
        setUserIndex((prevIndex) => (prevIndex + 1) % updatedUsers.length);
      } else {
        setOutOfUsers(true);
      }

      // Reset compatibility score and buttons when matching
      setCompatibilityScore(null);
      setIsMatchMode(false);
    }
  };

  const handleNextUser = () => {
    if (users.length > 0) {
      // Remove the current user from the array
      const updatedUsers = users.filter((_, index) => index !== userNumber);

      // Update the users state with the new array
      setUsers(updatedUsers);

      // Check if there are any users left
      if (updatedUsers.length > 0) {
        // Move to the next user
        setUserIndex((prevIndex) => (prevIndex + 1) % updatedUsers.length);
      } else {
        // If no users are left, show the "You've run out of people" message
        setOutOfUsers(true);
      }

      // Reset compatibility score and buttons when skipping a user
      setCompatibilityScore(null);
      setIsMatchMode(false);
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
        {outOfUsers ? (
          <p className={styles.outOfUsersMessage}>You've run out of people!</p>
        ) : (
          <>
            {users.length > 0 ? (
              <img src={users[userNumber].image} alt="" className={styles.profilePic} />
            ) : (
              <p>Loading user data...</p>
            )}
            {users.length > 0 ? (
              <h3>
                {users[userNumber].name}, {calculateAge(users[userNumber].birthday)} years old
              </h3>
            ) : (
              <p>Loading user data...</p>
            )}
            {users.length > 0 ? (
              <p>🎵 Bio: {users[userNumber].bio}</p>
            ) : (
              <p>Loading user data...</p>
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
              <p>Loading user data...</p>
            )}

            <div className={styles.buttons}>
              {!compatibilityScore ? (
                <button onClick={handleCheckCompatibility} disabled={isLoading}>
                  {isLoading ? "Calculating..." : "Check Compatibility"}
                </button>
              ) : (
                <>
                  <p className={styles.compatibilityScore}>💖 Music Compatibility: {compatibilityScore}%</p>
                </>
              )}
              <button onClick={handleNextUser}>Not Interested</button>
            </div>
          </>
        )}

        {isMatchMode && compatibilityScore !== null && !outOfUsers && (
          <div className={styles.buttons}>
            <button onClick={handleMatch}>Match Me!</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browsing;
