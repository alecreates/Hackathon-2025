"use client";

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
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // make sure all fields filled
    if (!formData.name || !formData.email || !formData.password || !formData.birthday) {
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
        setFormData({ name: "", email: "", password: "", birthday: "" });
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
      <h2>Sign Up</h2>
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
          value={formData.birthday}
          onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
          required
        />
        <button type="submit" className={styles.signupButton}>Sign Up</button>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </form>
      <div>
        <span>
          Already have an account?{" "}
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
