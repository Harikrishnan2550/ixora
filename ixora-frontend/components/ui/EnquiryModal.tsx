"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function EnquiryModal({
  isOpen,
  onClose,
  plan,
}: {
  isOpen: boolean;

  onClose: () => void;

  plan: string;
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(form);

    // later connect backend

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-8 relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-500 hover:text-black"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold">Enquiry Form</h2>

        <p className="text-gray-600 mt-2">
          Plan: <span className="font-semibold">{plan}</span>
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <input
            name="name"
            placeholder="Full Name"
            required
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            required
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder="Address"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Message"
            className="w-full border p-3 rounded h-28"
            onChange={handleChange}
          />

          <button className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
            Submit Enquiry
          </button>
        </form>
      </div>
    </div>
  );
}
