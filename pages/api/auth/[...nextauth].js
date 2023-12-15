import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";

export const authOptions = {
    pages: {
        signIn: '/signin',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials){
                return await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
                .then((userCredential) => {
                    // Signed in 
                    if(userCredential.user){
                        return userCredential.user;
                    }
                    return null;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log({success: false, code: errorCode, message: errorMessage});
                });
            }
        })
    ],
}

export default NextAuth(authOptions)