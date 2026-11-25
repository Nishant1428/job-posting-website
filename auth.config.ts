
import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

const authConfig = {
    session: {
        strategy: "jwt",
    },
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as typeof session.user & { id: string }).id =
                    token.id as string;
                session.user.name = token.name;
            }
            return session;
        },
    },
} satisfies NextAuthConfig;

export default authConfig;
