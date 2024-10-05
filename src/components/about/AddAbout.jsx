import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddAbout = () => {
  const [inputValues, setInputValues] = useState({
    title: '',
    mainContent: '',
  });

  const labels = useRef([]);
  const [id, setID] = useState(); // to hold the fetched about section ID

  // Fetch the "About" section data on component load
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/get-portfolio-data`);
        const data = response.data.about[0];  // Adjust this according to your backend response
        console.log(data);
        
        setID(data._id); // Set the fetched ID
        setInputValues({
          title: data.headingText1 || '',
          mainContent: data.mainText1 || '',
        });
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    };

    fetchAboutData();
  }, []);

  // Add animation for labels
  useEffect(() => {
    const delayUnit = 50;
    labels.current.forEach((label) => {
      label.innerHTML = label.innerText
        .split('')
        .map(
          (char, idx) =>
            `<span style="transition-delay: ${idx * delayUnit}ms">${char}</span>`
        )
        .join('');
    });
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputValues({ ...inputValues, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to update the "About" section
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URI}/api/update-about`, {
        ...inputValues,
        id, // Send the ID for updating the correct document
      });

      // Handle success response
      if (response.data.success) {
        // Fetch the updated data to reflect the changes
        const updatedResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/get-about-data`);
        const updatedData = updatedResponse.data.about[0]; // Update according to your response structure
        
        // Update the state with the new data
        setInputValues({
          title: updatedData.name || '',
          subtitle: updatedData.subtitle || '',
          mainContent: updatedData.mainContent || '',
        });

        // Show success message
        Swal.fire({
          title: 'Updated Successfully',
          text: 'Click OK to continue',
          icon: 'success',
        });
      }
    } catch (error) {
      console.error('Error updating about content:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-black bg-opacity-40 rounded-lg p-5 pt-10 pb-20 md:p-20">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control relative">
            <input
              type="text"
              required
              placeholder=" "
              id="title"
              value={inputValues.title}
              onChange={handleInputChange}
              className="block w-full p-3 text-white bg-transparent border-b-2 border-white focus:border-lightblue outline-none"
            />
            <label
              htmlFor="title"
              ref={(el) => (labels.current[0] = el)}
              className={`absolute opacity-70 left-0 top-4 text-white transition-all duration-200 ${
                inputValues.title ? 'top-[-1rem] text-lightblue' : ''
              }`}
            >
              Name
            </label>
          </div>
          <div className="form-control relative">
            <textarea
              required
              placeholder=" "
              id="mainContent"
              value={inputValues.mainContent}
              onChange={handleInputChange}
              className="block w-full p-3 text-white bg-transparent border-b-2 border-white focus:border-lightblue outline-none"
              rows="4"
            />
            <label
              htmlFor="mainContent"
              ref={(el) => (labels.current[2] = el)}
              className={`absolute opacity-70 left-0 top-4 text-white transition-all duration-200 ${
                inputValues.mainContent ? 'top-[-1rem] text-lightblue' : ''
              }`}
            >
              Main Content
            </label>
          </div>
          <button
            type="submit"
            className="relative w-full bg-lightblue bg-blue-700 text-white py-2 rounded transition duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-90 active:scale-95"
          >
            <span className="relative z-10">Update About Content</span>
            <span className="absolute inset-0 bg-lightblue rounded transition duration-300 transform scale-0 hover:scale-110" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAbout;
