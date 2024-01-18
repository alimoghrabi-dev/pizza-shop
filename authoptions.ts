import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcryptjs from "bcryptjs";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongo-connect";
import { getUserById } from "./lib/actions/user.actions";
import Account from "./models/user.model";

export const authOptions: AuthOptions = {
  //@ts-ignore
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {
          email: "",
          password: "",
        };

        const user = await Account.findOne({ email });

        if (!user) {
          return null;
        }

        const isPasswordCorrect = await bcryptjs.compare(
          password,
          user.password
        );

        if (!isPasswordCorrect) {
          return null;
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, session }) {
      const user = await getUserById(token.sub);

      token.id = user._id;
      token.name = user.name;
      token.picture = user.image;
      token.email = user.email;
      token.isAdmin = user.isAdmin;

      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
};
