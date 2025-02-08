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

          const passwordsMatch = await bcrypt.compare(password, user.password); // compare passwords

          if (!passwordsMatch) {
            console.log("Password mismatch");
            return null;
          }

          // return user object if authentication successful
          return { id: user._id, name: user.name, email: user.email };

        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error("Failed to authorize");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy, // use JWT for session management
  },
  callbacks: {
    // JWT callback to add user information to token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Session callback to include token information in session
    async session({ session, token }) {
      if (token) {
        session.userId = token.id; // Attach user ID to the token
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests to handle authentication
export { handler as GET, handler as POST };
