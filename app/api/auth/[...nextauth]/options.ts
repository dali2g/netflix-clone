import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'

export const options: NextAuthOptions = {
        providers: [
                GithubProvider({
                        clientId: process.env.GITHUB_ID as string,
                        clientSecret: process.env.GITHUB_SECRET as string,
                }),
                Credentials({
                        id: 'credentials',
                        name: 'Credentials',
                        credentials: {
                                email: {
                                        label: 'Email',
                                        type: 'text',
                                },
                                password: {
                                        label: 'Password',
                                        type: 'password',
                                }
                        },
                        async authorize(credentials) {
                                if (!credentials?.email || !credentials?.password) {
                                        throw new Error("Email and Password Fields Are Required");
                                }
                                const user = await prismadb.user.findUnique({
                                        where: {
                                                email: credentials.email
                                        }
                                });
                                if (!user || !user.hashedPassword) {
                                        throw new Error("Email does not exist");
                                }
                                const isCorrectPassword = await compare(user.hashedPassword, credentials.password)
                                if (!isCorrectPassword) {
                                        throw new Error("Incorrect Password");

                                }                       
                                return user;
                        }
                })
        ],
}