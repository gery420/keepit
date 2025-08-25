"use client";
import React, {useState, createContext, useEffect} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    
    const [isLoggedIn, setLogin] = useState(false);
    const [ user , setUser ] = useState(null);
    const [ loadingUser , setLoadingUser ] = useState(true);
    const [ authToken , setAuthToken ] = useState(null);
    
    const navigate = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setAuthToken(token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            getProfile();
        }   
        else {
            delete axios.defaults.headers.common['Authorization'];
            setLoadingUser(false);
        }
    }, [authToken]);

    const getProfile = async () => {
        try {
            if (!authToken) {
                console.log("No auth token found, user not logged in");
                return;
            }
            
            console.log("User Context is working fine");
            let resp = await axios.get(`/user/profile`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log("Profile response:", resp.data);
            const userData = resp.data.data.newUser;
            setUser(userData);
            setLogin(true);
            console.log("Profile set in UserContext:", userData);
                
        } catch (err) {
            console.log("User Context problem")
            if (err.response.data.name === "AuthenticationError") {
                setLoginStatus(false);
            }
            navigate.push("/login");
            localStorage.removeItem("authToken");
            setAuthToken(null);
            setLogin(false);
            setUser(null);
            return;
        } finally {
            setLoadingUser(false);
        }
        
    };
       const setLoginStatus = (status, tokenFromLogin = null) => {
        setLogin(status);
        if ( status && tokenFromLogin ) {
            setAuthToken(tokenFromLogin);
            localStorage.setItem("authToken", tokenFromLogin);
            console.log("Auth token set in localStorage:", tokenFromLogin);
        } else {
            localStorage.removeItem("authToken");
            setAuthToken(null);
        }
    }


    return (
        <UserContext.Provider value={{ isLoggedIn, setLoginStatus, user, setUser, authToken, setAuthToken, loadingUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
