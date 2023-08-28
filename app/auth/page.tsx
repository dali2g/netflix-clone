"use client"
import Input from "@/components/Input";
import axios from "axios";
import { useCallback, useState } from "react";

const Page = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [variant, setVariant] = useState('login')


    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
        });

        } catch (error) {
            throw new Error("Error");

        }

    }, [email,name,password])

    const toggleVariant = useCallback(
        () => {
            setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
        },
        [],
    )
    return (
        <div className="relative sm:w-full sm:h-full mx-auto bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-cover">
            <div className="bg-black h-full w-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png"
                        alt="logo"
                        className="h-12" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-80 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-3xl w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">{variant === 'login' ? 'Sign in' : 'Register'}</h2>
                        <div className="flex flex-col gap-4">
                            {variant === 'register' && (
                                <Input
                                    label="Username"
                                    onChange={(e: any) => setName(e.target.value)}
                                    id="name"
                                    type="name"
                                    value={name}
                                />
                            )}
                            <Input
                                label="Email"
                                onChange={(e: any) => setEmail(e.target.value)}
                                id="email"
                                type="email"
                                value={email}
                            />
                            <Input
                                label="Password"
                                onChange={(e: any) => setPassword(e.target.value)}
                                id="password"
                                type="password"
                                value={password}
                            />
                        </div>
                        <button onClick={register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 
                        transition">{variant === "login" ? "Login" : "Sign up"}</button>
                        <p className="text-neutral-500 mt-12 text-sm text-center">
                            {variant === 'login' ? "First time using Netflix?" : "Already have an account?"} <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">{variant === 'login' ? 'Create an account' : 'Login'}</span>
                        </p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Page;