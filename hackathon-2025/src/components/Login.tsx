
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
// login logic
    router.push("/browsing");
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit" className={styles.loginButton}>Log In</button>
      </form>
    </div>
  );
}
