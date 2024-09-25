import React, { useState } from "react";
import Layout from "../Layout";

const TestimonialForm = ({ addTestimonial }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length > 200) {
      setError("Testimonial should be less than 200 characters.");
      return;
    }
    addTestimonial({ name, email, company, text });
    setName("");
    setEmail("");
    setCompany("");
    setText("");
    setError("");
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">Add Your Testimonial</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full mb-4 p-2 rounded-lg bg-white bg-opacity-70 focus:outline-none"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          className="w-full mb-4 p-2 rounded-lg bg-white bg-opacity-70 focus:outline-none"
          required
        />
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Your Company"
          className="w-full mb-4 p-2 rounded-lg bg-white bg-opacity-70 focus:outline-none"
          required
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your Testimonial (max 200 characters)"
          className="w-full mb-4 p-2 rounded-lg bg-white bg-opacity-70 focus:outline-none"
          maxLength={200}
          required
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default TestimonialForm;
