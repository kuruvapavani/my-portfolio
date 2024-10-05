import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert

const AddTestimonial = () => {
  const labels = useRef([]);
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    company: "",
    text: "",
  });
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonialsData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URI}/api/get-testimonials`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTestimonials(data.testimonials);
      } catch (error) {
        console.error("Error fetching testimonials data:", error);
      }
    };

    fetchTestimonialsData();
  }, []);

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

  // Handle input change
  // const handleInputChange = (e) => {
  //   const { id, value } = e.target;
  //   setInputValues((prevValues) => ({
  //     ...prevValues,
  //     [id]: value,
  //   }));
  // };

  const handleInputChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };
  // Handle form submission
  // In your AddTestimonial component

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    let message = "";
    console.log("Input Values:", inputValues); // Log input values

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/add-testimonial`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inputValues),
        }
      );
      const data = await response.json();
      if (data.success) {
        setTestimonials([...testimonials, data.data]);
        message = "New testimonial added successfully!";
      }
      Swal.fire("Success", message, "success");
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "An error occurred. Please try again.", "error");
    }
    // Clear the form after submission
    setInputValues({
      name: "",
      email: "",
      company: "",
      text: "",
    });
  };

  return (
    <section className="min-h-screen">
      <div className="flex items-center justify-center h-screen">
        <div className="bg-black bg-opacity-40 rounded-lg p-5 pt-10 pb-20 md:p-20">
          <h2 className="text-white text-2xl mb-6">Add Testimonial</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name input */}
            <div className="form-control relative">
              <input
                type="text"
                required
                placeholder=" "
                id="name"
                name="name" // Add name attribute
                value={inputValues.name}
                onChange={handleInputChange}
                autoComplete="off"
                className="block w-full p-3 text-white bg-transparent border-b-2 border-white focus:border-lightblue outline-none"
              />
              <label
                htmlFor="name"
                ref={(el) => (labels.current[0] = el)}
                className={`absolute opacity-70 left-0 top-4 text-white transition-all duration-200 ${
                  inputValues.name ? "top-[-1rem] text-lightblue" : ""
                }`}
              >
                Name
              </label>
            </div>

            {/* Email input */}
            <div className="form-control relative">
              <input
                type="email"
                required
                placeholder=" "
                id="email"
                name="email" // Add name attribute
                value={inputValues.email}
                onChange={handleInputChange}
                autoComplete="off"
                className="block w-full p-3 text-white bg-transparent border-b-2 border-white focus:border-lightblue outline-none"
              />
              <label
                htmlFor="email"
                ref={(el) => (labels.current[1] = el)}
                className={`absolute opacity-70 left-0 top-4 text-white transition-all duration-200 ${
                  inputValues.email ? "top-[-1rem] text-lightblue" : ""
                }`}
              >
                Email
              </label>
            </div>

            {/* Company input */}
            <div className="form-control relative">
              <input
                type="text"
                required
                placeholder=" "
                id="company"
                name="company" // Add name attribute
                value={inputValues.company}
                onChange={handleInputChange}
                autoComplete="off"
                className="block w-full p-3 text-white bg-transparent border-b-2 border-white focus:border-lightblue outline-none"
              />
              <label
                htmlFor="company"
                ref={(el) => (labels.current[2] = el)}
                className={`absolute opacity-70 left-0 top-4 text-white transition-all duration-200 ${
                  inputValues.company ? "top-[-1rem] text-lightblue" : ""
                }`}
              >
                Company
              </label>
            </div>

            {/* Testimonial textarea */}
            <div className="form-control relative">
              <textarea
                required
                placeholder=" "
                id="text"
                name="text" // Add name attribute
                value={inputValues.text}
                onChange={handleInputChange}
                autoComplete="off"
                maxLength={250} // Limit the text length
                className="block w-full p-3 text-white bg-transparent border-b-2 border-white focus:border-lightblue outline-none"
              />
              <label
                htmlFor="text"
                ref={(el) => (labels.current[3] = el)}
                className={`absolute opacity-70 left-0 top-4 text-white transition-all duration-200 ${
                  inputValues.text ? "top-[-1rem] text-lightblue" : ""
                }`}
              >
                Testimonial (max 250 characters)
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="relative w-full bg-lightblue bg-blue-700 text-white py-2 rounded transition duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-90 active:scale-95"
            >
              <span className="relative z-10">Submit Testimonial</span>
              <span className="absolute inset-0 bg-lightblue rounded transition duration-300 transform scale-0 hover:scale-110" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddTestimonial;
