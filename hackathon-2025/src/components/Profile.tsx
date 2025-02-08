import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link"; 
import styles from "./Profile.module.css";

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

const Profile = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/user/${session.user.id}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [session]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session?.user) return <p>User not logged in</p>;
  if (!user) return <p>Fetching user data...</p>;

  return (
    <div> {/* Fixed the typo here */}
      <nav className={styles.navbar}>
        <Link href="/profile">View Profile</Link>
        <Link href="/browsing">Browsing</Link>
        <Link href="/messaging">Your Favorite Matches</Link>
        <Link href="/settings">Settings</Link>
      </nav>

      <div className={styles.profileCard}>
        <img src={user.image || "/default-profile.jpg"} alt="Profile Picture" className={styles.profilePic} />
        <h3>{user.name}, {calculateAge(user.birthday)} years old</h3>
        {user.bio ? <p>🎵 {user.bio}</p> : <p>🎵 Bio: Music lover & traveler</p>}
        <h4 style={{ fontWeight: "bold" }}>Top 5 Songs:</h4>
        <div className={styles.songList}>
          <ul>
            {user.song1 && <li className={styles.song}>{user.song1}</li>}
            {user.song2 && <li className={styles.song}>{user.song2}</li>}
            {user.song3 && <li className={styles.song}>{user.song3}</li>}
            {user.song4 && <li className={styles.song}>{user.song4}</li>}
            {user.song5 && <li className={styles.song}>{user.song5}</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
