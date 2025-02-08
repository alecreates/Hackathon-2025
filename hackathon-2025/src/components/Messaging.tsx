
"use client";

import Link from "next/link";
import styles from "./Messaging.module.css";
import { useEffect, useState } from "react";

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


const Messaging = () => {
  const [matches, setMatches] = useState<User[]>([]);

  useEffect(() => {
    // Retrieve the matched users from localStorage
    const storedMatches = localStorage.getItem("matches");
    if (storedMatches) {
      setMatches(JSON.parse(storedMatches)); // Parse and set the matches array
    }
  }, []);
  

  // Function to remove a user from the matches
  const handleRemoveMatch = (userId: string) => {
    const updatedMatches = matches.filter((user) => user._id !== userId); // Remove the user with the given userId
    setMatches(updatedMatches); // Update state with the new matches list
    localStorage.setItem("matches", JSON.stringify(updatedMatches)); // Update localStorage with the new matches
  };


  return (
    <div className={styles.messagingContainer}>
      <nav className={styles.navbar}>
        <Link href="/profile">View Profile</Link>
        <Link href="/browsing">Browsing</Link>
        <Link href="/messaging">Your Favorite Matches</Link>
        <Link href="/settings">Settings</Link>
      </nav>
      <div className={styles.matchesContainer}>
      <h2 className={styles.title}>Matched Users</h2>
      {matches.length > 0 ? (
        <div className={styles.cardContainer}>
          {matches.map((user, index) => (
            <div className={styles.card} key={user._id}>
              <img
                className={styles.profilePic}
                src={user.image}
                alt={`${user.name}'s profile`}
              />
              <h3 className={styles.name}>{user.name}</h3>
              <a href={`mailto:${user.email}?subject=Hello&body=Hi ${user.name},%0A%0A`} >
                {user.email}
              </a>
              <p className={styles.birthday}>Birthday: {new Date(user.birthday).toLocaleDateString()}</p>

              {/* Remove button */}
              <button
                className={styles.removeButton}
                onClick={() => handleRemoveMatch(user._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No matches yet.</p>
      )}
    </div>
    </div>
  );
};

export default Messaging;
