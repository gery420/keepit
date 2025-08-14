"use client"

import Navbar from '@/app/components/Common/Navbar';
import axios from 'axios';
import swal from 'sweetalert2';

export default function Hero() {

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
    <section className="bg-gray-100">
      <Navbar />
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Keep Your Files Safe</h1>
        <p className="text-lg text-gray-600">
          Store your important files in the cloud and access them from anywhere.
        </p>
        <button onClick={test} className="bg-blue-500 text-white px-4 py-2 rounded">
          Get Started
        </button>
        <button onClick={tes} className="bg-blue-500 text-white px-4 py-2 rounded">
          Get Started Test
        </button>
      </div>
    </section>
  );
}
