import React, { useEffect, useRef, useState } from "react";
import axios from "axios"; // Import axios for HTTP requests
import { useNavigate } from "react-router-dom"; // If using React Router for navigation

const Login = () => {
  const labels = useRef([]);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // To handle errors
  const navigate = useNavigate(); // For navigating after login (if you're using React Router)

  useEffect(() => {
    const delayUnit = 50;

    labels.current.forEach((label) => {
      label.innerHTML = label.innerText
        .split("")
        .map(
          (char, idx) =>
            `<span style="transition-delay: ${idx * delayUnit}ms">${char}</span>`
        )
        .join("");
    });
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email: inputValues.email,
        password: inputValues.password,
      });

      // If login is successful
      const { token } = response.data;
      localStorage.setItem("authToken", token); // Store the JWT token in localStorage

      // Redirect to a different page (like a dashboard)
      navigate("/admin");
    } catch (error) {
      // Handle error (like incorrect credentials)
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <section className="min-h-screen bg-blue-700 bg-opacity-40">
      <div className="flex items-center justify-center min-h-screen">
      
        <div className="bg-black bg-opacity-40 rounded-lg p-5 pt-10 pb-20 md:p-20 ">
          <form onSubmit={handleSubmit} className="space-y-8"> {/* Attach handleSubmit */}
            <div className="form-control relative">
              <input
                type="text"
                required
                placeholder=" "
                id="email"
                value={inputValues.email}
                onChange={handleInputChange}
                className="block w-full p-3 text-white bg-transparent border-b-2 border-white focus:border-lightblue outline-none"
                autoComplete="off"
              />
              <label
                htmlFor="email"
                ref={(el) => (labels.current[0] = el)}
                className={`absolute opacity-70 left-0 top-4 text-white transition-all duration-200 ${
                  inputValues.email ? "top-[-1rem] text-lightblue" : ""
                }`}
              >
                Email
              </label>
            </div>
            <div className="form-control relative">
              <input
                type="password"
                required
                placeholder=" "
                id="password"
                value={inputValues.password}
                onChange={handleInputChange}
                className="block w-full p-3 text-white bg-transparent border-b-2 border-white focus:border-lightblue outline-none"
              />
              <label
                htmlFor="password"
                ref={(el) => (labels.current[1] = el)}
                className={`absolute opacity-70 left-0 top-4 text-white transition-all duration-200 ${
                  inputValues.password ? "top-[-1rem] text-lightblue" : ""
                }`}
              >
                Password
              </label>
            </div>

            {/* Error message display */}
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="relative w-full bg-blue-700 text-white py-2 mt-6 rounded transition duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-90 active:scale-95"
            >
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 bg-lightblue rounded transition duration-300 transform scale-0 hover:scale-110" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
