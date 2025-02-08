import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/app/libs/mongodb";
import bcrypt from "bcryptjs";
import { SessionStrategy } from "next-auth";
import User from "@/app/models/User";

const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const { email, password } = credentials as { email: string; password: string };

        try {
          await connectMongoDB(); // connect to database
          const user = await User.findOne({ email });

          if (!user) {
            console.log("User not found");
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            console.log("Password mismatch");
            return null;
          }

          return { id: user._id, name: user.name, email: user.email, birthday: user.birthday, bio: user.bio, image: user.image };

        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error("Failed to authorize");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.birthday = user.birthday;
        token.bio = user.bio;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.birthday = token.birthday;
        session.user.bio = token.bio;
        session.user.image = token.image;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};


const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests to handle authentication
export { handler as GET, handler as POST };
