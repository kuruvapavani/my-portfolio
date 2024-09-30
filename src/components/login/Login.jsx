import React, { useEffect, useRef, useState } from "react";

const Login = () => {
  const labels = useRef([]);
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const delayUnit = 50;

    labels.current.forEach((label) => {
      label.innerHTML = label.innerText
        .split("")
        .map(
          (char, idx) =>
            `<span style="transition-delay: ${
              idx * delayUnit
            }ms">${char}</span>`
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

  return (
    <section className="min-h-screen login">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-black bg-opacity-40 rounded-lg p-5 pt-10 pb-20 md:p-20 ">
          <form action="#" className="space-y-8"> {/* Increased spacing */}
            <div className="form-control relative">
              <input
                type="text"
                required
                placeholder=" "
                id="name"
                value={inputValues.name}
                onChange={handleInputChange}
                className="block w-full p-3 text-white bg-transparent border-b-2 border-white focus:border-lightblue outline-none"
                autoComplete="off"
              />
              <label
                htmlFor="username"
                ref={(el) => (labels.current[0] = el)}
                className={`absolute opacity-70 left-0 top-4 text-white transition-all duration-200 ${
                  inputValues.name ? "top-[-1rem] text-lightblue" : ""
                }`}
              >
                Username
              </label>
            </div>
            <div className="form-control relative">
              <input
                type="password"
                required
                placeholder=" "
                id="email"
                value={inputValues.email}
                onChange={handleInputChange}
                className="block w-full p-3 text-white bg-transparent border-b-2 border-white focus:border-lightblue outline-none"
              />
              <label
                htmlFor="password"
                ref={(el) => (labels.current[1] = el)}
                className={`absolute opacity-70 left-0 top-4 text-white transition-all duration-200 ${
                  inputValues.email ? "top-[-1rem] text-lightblue" : ""
                }`}
              >
                Password
              </label>
            </div>
            <button
              type="submit"
              className="relative w-full bg-lightblue bg-blue-700 text-white py-2 mt-6 rounded transition duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-90 active:scale-95"
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
