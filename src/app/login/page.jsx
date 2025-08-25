"use client"
import axios from "axios"
import React, { useState, useContext, useEffect } from "react";
import swal from "sweetalert2";
import {UserContext}  from "../context/UserContext.js";
import { useRouter } from "next/navigation.js";
import Link from "next/link.js";
import Navbar from "@/app/components/Common/Navbar.tsx"

const Login = () => {

    const navigate = useRouter();
   
    let [data, setData] = useState({
        username: "",
        password: "",
    })

    const [load , setload] = useState(false);
    const { setLoginStatus, setUser, isLoggedIn } = useContext(UserContext);

    useEffect(() => {
        if (isLoggedIn) {
            navigate.push("/drive");
        }
    }, [isLoggedIn]);

    const submitLogin = async (event) => {
        try{

            if (data.username === "" || data.password === "") {
                swal.fire({
                    title: "Error",
                    text: "Username and Password cannot be empty!",
                    icon: "error",
                });
                return;
            } 
                        
            event.preventDefault();

            let postData = {
                username: data.username,
                password: data.password,
            }

            setload(true);

            let res = await axios.post(`/auth/login/`, postData, {
                withCredentials: true,
            });

            const { accessToken, user } = res.data;
            console.log("Login response:", res.data.accessToken);
            if (res.data.success) {
                setLoginStatus(true, accessToken);
                setUser(user);
                swal.fire({
                    title: "Success",
                    text: res.data.message,
                    icon: "success",
                });
                console.log("Login response:", res.data);
                navigate.push("/drive");
            }
            setload(false);

        } catch (error) {
            console.error("Error during login:", error);
            swal.fire({
                title: "Error",
                text: error.response ? error.response.data.message : "Login failed. Please try again.",
                icon: "error",
            });
            setload(false);
            setLoginStatus(false);
        }
    }

    const updateLoginInfo = (event) => {
        const { name, value } = event.target;
        //setting the data
        setData((prevData) => { 
            return { ...prevData, [name]: value };
        });
    }

    return (
        <div>
            <Navbar />
            <div className="w-[100dvw] mt-12 h-[90dvh] flex items-center justify-center">
                <div className=" w-[30%] h-[55%] text-black flex flex-col items-center justify-start m-9 shadow-[27px_27px_69px_rgb(219,215,219)] inset-[-27px_-27px_69px_rgb(255,255,255)] rounded-2xl border-[var(--black)]">
                    <div className="w-[100%] mt-8 flex items-start justify-start">
                        <Link href="/" className="text-[var(--black)] text-md sm:ml-9">←Back</Link>
                    </div>
                    <div className="flex flex-col h-[100%] mt-8 gap-2 items-center justify-center" >
                        <label htmlFor="userName" >
                        Username:
                            <input type="text" name="username" placeholder="Username" required onChange={updateLoginInfo} className=" mt-2 w-[100%] h-[50%] p-3 border-solid border-2 border-[var(--black)] rounded-2xl" />
                        </label>
                        <br />
                        <label htmlFor="password">
                        Password:
                            <input type="password" name="password" autoComplete="current-password" placeholder="Password" required onChange={updateLoginInfo} className=" mt-2 w-[100%] h-[50%] p-3 border-solid border-2 border-[var(--black)] rounded-2xl" />
                        </label>

                    
                        <br />
                        <div className="flex justify-center items-center text-center h-full w-[70%]">
                            <button onClick={submitLogin} disabled={load} className={`w-[50%] h-[60%] mb-4 border-solid cursor-pointer hover:bg-blue-400 border-2 mt-4 border-[var(--black)] rounded-2xl ${load ? "bg-[var(--purple)] opacity-45 text-[var(--white)] cursor-not-allowed" : "hover:bg-[var(--purple)]"}`} type="submit"> {load? "Wait..": "Login"}</button>
                        </div>

                        <div className="w-[100%] pb-8 flex items-center justify-center">
                            <h1>Don't have an account? <Link href="/signup" className="text-[var(--purple)] underline">Sign up</Link></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default Login;
