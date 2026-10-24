import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import LinkedIn from "next-auth/providers/linkedin"; // LinkedIn disabled

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Reads AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET / AUTH_LINKEDIN_ID / AUTH_LINKEDIN_SECRET automatically
  providers: [Google /* , LinkedIn */],
  session: { strategy: "jwt" },
  pages: { signIn: "/login", error: "/login" },
  trustHost: true,
});