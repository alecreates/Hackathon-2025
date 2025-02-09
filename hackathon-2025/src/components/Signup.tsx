"use client";

import AutocompleteSearch from "./AutocompleteSearch";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import styles from "./Signup.module.css";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    birthday: "",
    bio:"",
    image:"",
    song1: "",
    song2: "",
    song3: "",
    song4: "",
    song5: ""
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // make sure all fields filled
    if (!formData.name || !formData.email || !formData.password || !formData.birthday || !formData.bio || !formData.image) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // clear form and move to next page
        setFormData({ name: "", email: "", password: "", birthday: "", bio:"", image: "", song1: "", song2: "", song3: "", song4: "", song5: ""});
        router.push("/browsing");
      } else {
        setError("Failed to register. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h2>Create Your Profile!</h2>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <AutocompleteSearch></AutocompleteSearch>
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <input
          type="date"
          name="birthday"
          placeholder="MM/DD/YYYY"
          value={formData.birthday}
          onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
          required
        />
        <input
          type="text"
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          required
        />
        <input
          type="url"
          name="image"
          placeholder="Profile Picture"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
        />

        <input
          type="text"
          name="song1"
          placeholder="Song 1"
          
          value={formData.song1}
          onChange={(e) => setFormData({ ...formData, song1: e.target.value })}
          required
        />

           <input
          type="text"
          name="song2"
          placeholder="Song 2"
          value={formData.song2}
          onChange={(e) => setFormData({ ...formData, song2: e.target.value })}
          required
        />
           <input
          type="text"
          name="song3"
          placeholder="Song 3"
          value={formData.song3}
          onChange={(e) => setFormData({ ...formData, song3: e.target.value })}
          required
        />
           <input
          type="text"
          name="song4"
          placeholder="Song 4"
          value={formData.song4}
          onChange={(e) => setFormData({ ...formData, song4: e.target.value })}
          required
        />
           <input
          type="text"
          name="song5"
          placeholder="Song 5"
          value={formData.song5}
          onChange={(e) => setFormData({ ...formData, song5: e.target.value })}
          required
        />
        <button type="submit" className={styles.signupButton}>Sign Up</button>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </form>
      <div>
        <span>
          Already have a profile?{" "}
          <span
            className={styles.loginLink}
            onClick={() => router.push("/login")}
          >
            Log in
          </span>
        </span>
      </div>
    </div>
  );
};

export default SignUp;
