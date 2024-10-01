import React, { useEffect, useRef, useState } from 'react';
import Layout from '../Layout';
import ImageReveal from '../ImageReveal';

const ContactForm = () => {
  const labels = useRef([]);
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    message: ''
  });

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

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: value
    }));
  };

  return (
    <section className='min-h-screen cms' id='contact'>
      <div className="flex justify-center items-center">
        <ImageReveal src='/contact.png' alt='about' cls={"cmi"}/>
      </div> 
      <Layout>
        <div className="flex items-center justify-center h-screen bg-steelblue">
          <div className="bg-black bg-opacity-40 rounded-lg p-5 pt-10 pb-20 md:p-20 ">
            <form action="#" className="space-y-6">
              <div className="form-control relative">
                <input
                  type="text"
                  required
                  placeholder=" "
                  id="name"
                  value={inputValues.name}
                  onChange={handleInputChange}
                  className="block w-full p-3 text-white bg-transparent border-b-2 border-white focus:border-lightblue outline-none"
                />
                <label
                  htmlFor="name"
                  ref={(el) => (labels.current[0] = el)}
                  className={`absolute opacity-70 left-0 top-4 text-white transition-all duration-200 ${
                    inputValues.name ? 'top-[-1rem] text-lightblue' : ''
                  }`}
                >
                  Name
                </label>
              </div>
              <div className="form-control relative">
                <input
                  type="email"
                  required
                  placeholder=" "
                  id="email"
                  value={inputValues.email}
                  onChange={handleInputChange}
                  className="block w-full p-3 text-white bg-transparent border-b-2 border-white focus:border-lightblue outline-none"
                />
                <label
                  htmlFor="email"
                  ref={(el) => (labels.current[1] = el)}
                  className={`absolute opacity-70 left-0 top-4 text-white transition-all duration-200 ${
                    inputValues.email ? 'top-[-1rem] text-lightblue' : ''
                  }`}
                >
                  Email
                </label>
              </div>
              <div className="form-control relative">
                <textarea
                  required
                  placeholder=" "
                  id="message"
                  value={inputValues.message}
                  onChange={handleInputChange}
                  className="block w-full p-3 text-white bg-transparent border-b-2 border-white focus:border-lightblue outline-none"
                  rows="4"
                />
                <label
                  htmlFor="message"
                  ref={(el) => (labels.current[2] = el)}
                  className={`opacity-70 absolute left-0 top-4 text-white transition-all duration-200 ${
                    inputValues.message ? 'top-[-1rem] text-lightblue' : ''
                  }`}
                >
                  Message
                </label>
              </div>
              <button
                type="submit"
                className="relative w-full bg-lightblue bg-blue-700 text-white py-2 rounded transition duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-90 active:scale-95"
              >
                <span className="relative z-10">Send Message</span>
                <span className="absolute inset-0 bg-lightblue rounded transition duration-300 transform scale-0 hover:scale-110" />
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </section>
  );
};

export default ContactForm;
