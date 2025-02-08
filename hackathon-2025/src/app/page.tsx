"use client";

import { useRouter } from "next/navigation";
import styles from "../components/MainPage.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>💘 Music Cupid 💘</h1>
      <button className={styles.signupBtn} onClick={() => router.push("/signup")}>
        Create a Profile!
      </button>
    </div>
  );
};

