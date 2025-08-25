"use client"

import Navbar from '@/app/components/Common/Navbar';
import axios from 'axios';
import swal from 'sweetalert2';
import { UserContext } from '@/app/context/UserContext';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Hero() {

  const { isLoggedIn } = useContext(UserContext);
  const nav = useRouter();
  
  useEffect(() => {
    if (isLoggedIn) {
      
    }
  }, [isLoggedIn]);

  return (
    <section className="">
      <Navbar />
      <Section1 />
      <Section2 />
    </section>
  );
}

const Section1 = () => {
  const test = async () => {
    try {
      const response = await axios.get("/server/test", {
        withCredentials: true
      });
      swal.fire({
        title: 'Success!',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error(error);
    }
  }

  const tes = async () => {
    try {
      const response = await axios.get("/auth/test", {
        withCredentials: true
      });
      swal.fire({
        title: 'Success!',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="container mt-[20%] text-center">
      <p className="text-lg text-gray-600">
        Store your important files in the cloud and access them from anywhere.
      </p>
      <button onClick={test} className="bg-blue-500 text-white px-4 py-2 rounded">
        Get Started
      </button>
      <button onClick={tes} className="bg-blue-500 text-white ml-20 px-4 py-2 rounded">
        Get Started Test
      </button>
    </div>
  );
};

const Section2 = () => {
  return (
    <div className="container mt-[20%] text-center">
      <p className="text-lg text-gray-600">
        Collaborate with your team in real-time and never miss a beat.
      </p>
      
    </div>
  );
};