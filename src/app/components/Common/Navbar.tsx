"use client";
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../assets/Keep It.png'
import { UserContext } from '@/app/context/UserContext';
import { useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
export default function Navbar() {

  const {isLoggedIn, authToken, setAuthToken, setUser, setLoginStatus} = useContext(UserContext);
  const navigate = useRouter();

  const handleLogout = async (event) => {
    event.preventDefault();
    try{
      const res = await axios.post('/auth/logout/', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      if (res.data.success) {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setUser(null);
        setLoginStatus(false);
        navigate.push('/');
        Swal.fire({
          title: 'Logged Out',
          text: 'You have been logged out successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }

    }
    catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <div className="fixed left-[25dvw] mt-10 z-50 top-0 w-[50dvw] shadow-2xl h-[10dvh] backdrop-blur-[0.7rem] mix-blend-multiply backdrop-saturate-[105%] bg-[rgb(255,255,255)] rounded-[2rem] items-center flex justify-between ">
      <div className="flex justify-center ml-10 w-[30%] text-black  text-[2em] items-center">
        <Image src={Logo} alt="Logo" className="ml-2 w-20 h-20" />
        <span className="ml-2">Keep It</span>
      </div>
      <div className="flex  w-fit mr-8 gap-10 text-[1.2rem] text-black justify-center items-center p-4">
        {isLoggedIn ? (
          <>
            <Link href="/drive">My Drive</Link>
            <button onClick={handleLogout} className='cursor-pointer'>Log Out</button>
          </>
        ) : (
          <>
            <Link href="/">Home</Link>
            <Link href="/login" replace>Log In</Link>
            <Link href="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
}
