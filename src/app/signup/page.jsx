"use client"

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Navbar from '@/app/components/Common/Navbar';
import { UserContext } from "../context/UserContext";

const SignUp = () => {

    const navigate = useRouter();
    const [data, setData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
    })

    const [load, setload] = useState(false);
    const { isLoggedIn } = useContext(UserContext);

    useEffect(() => {
        if (isLoggedIn) {
            navigate.push("/");
        }
    }, [isLoggedIn]);

    const submit = async (event) => {
        try {

            if (data.password !== data.confirmPassword) {
                swal.fire({
                    title: "Error",
                    text: "Your passwords do not match!",
                    icon: "error",
                });
                setData((prevState) => {
                    return { ...prevState, password: "", confirmPassword: "" };
                });
                return;
            }

            if (data.password.length < 8) {
                swal.fire({
                    title: "Error",
                    text: "Password must be at least 8 characters long!",
                    icon: "error",
                });
                setData((prevState) => {
                    return { ...prevState, password: "", confirmPassword: "" };
                });
                return;
            }

            if (data.username === "" || data.password === "" || data.email === "") {
                swal.fire({
                    title: "Incomplete Form",
                    text: "Complete all fields!",
                    icon: "error",
                });
                return;
            }

            

            if (data.username.length < 6 || data.username.length > 25) {
                swal.fire({ 
                    title: "Error",
                    text: "Username must be between 6 and 25 characters long!",
                    icon: "error",
                });
                setData((prevState) => {
                    return { ...prevState, username: "" };
                });
                return;
            }

            event.preventDefault();
            
            const postData = {
                username: data.username,
                password: data.password,
                email: data.email
            }
            setload(true);

            const res = await axios.post(`/user/register`, postData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.data.success) {
                swal.fire({
                    title: "Registration Successful",
                    text: res.data.message,
                    icon: "success",
                })
                navigate.push("/login");
                setload(false);
                setData({
                    username: "",
                    password: "",
                    confirmPassword: "",
                    email: "",
                    
                });
                
                console.log("Response from server:", res);
            }

        } catch (error) {
            setload(false);
            console.error("Error during registration:", error);
            swal.fire({
                title: "Registration Failed",
                text: error.response ? error.response.data.message : "An error occurred during registration.",
                icon: "error",
            });
        }
    }
    const updateInfo = (event) => {
        const { name, value, files, type } = event.target;
        //setting the data
        if (type === "file") {
            setData((prevData) => {
                return { ...prevData,
                    profilePicture: files[0] };
            });
        } else {
            setData((prevData) => {
                return { ...prevData, [name]: value };
            });
        }
    };

    return (
        <div className="bg-white">
            <Navbar/>
            <div className="w-[100dvw] mt-52 h-fit flex items-center justify-center">
                <div className="w-[40%] h-[100%] p-10 flex flex-col items-center sm:mt-2 justify-start sm:m-2 m-4 shadow-[27px_27px_69px_rgb(219,215,219)] inset-[-27px_-27px_69px_rgb(255,255,255)] rounded-2xl border-[var(--black)]">
                   
                    <div className="flex flex-col mt-2 gap-10 items-center w-[50%] text-black justify-center" >
                        
                        <div className="gap-4 flex flex-col">
                            <label htmlFor="userName" className="w-[100%] ">
                            Username:
                                <input type="text" value={data.username} name="username" placeholder="Username" required onChange={updateInfo} className=" mt-1 w-[100%] h-[50%] p-2 border-solid border-2 border-[var(--black)] rounded-2xl" />
                            </label>
                            
                            <label htmlFor="email" className="w-[100%]">
                            Email:
                                <input type="email" name="email" value={data.email} placeholder="Email" required onChange={updateInfo} className=" mt-1 w-[100%] h-[50%] p-2 border-solid border-2 border-[var(--black)] rounded-2xl"/>
                            </label>
                        
                            <label htmlFor="password" className="w-[100%]">
                            Password:
                                <input type="password" value={data.password} name="password" placeholder="Password" autoComplete="current-password" onChange={updateInfo} required className=" mt-1 w-[100%] h-[50%] p-2 border-solid border-2 border-[var(--black)] rounded-2xl" />
                            </label>
                            <label htmlFor="password" className="w-[100%]">
                            Confirm Password:
                                <input type="password" value={data.confirmPassword} name="confirmPassword" placeholder="Password" autoComplete="current-password" onChange={updateInfo} required className=" mt-1 w-[100%] h-[50%] p-2 border-solid border-2 border-[var(--black)] rounded-2xl" />
                            </label>
                        </div>
                        
                        <div className="flex justify-center items-center mb-4 mt-4 w-[100%]">
                            <button onClick={submit} disabled={load} className={`w-[30%] h-[110%] p-1 relative border-solid hover:bg-blue-400 cursor-pointer border-2 border-[var(--black)] rounded-2xl ${load ? "bg-[var(--purple)] opacity-45 text-[var(--white)] cursor-not-allowed" : "hover:bg-[var(--purple)]"}`} type="submit">{load? "Wait..": "Sign Up" }</button>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
