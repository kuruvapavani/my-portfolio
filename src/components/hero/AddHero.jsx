import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddHero = ({ introId }) => {
  const [inputValues, setInputValues] = useState({
    title: '',
    subtitle: '',
    mainContent: '',
  });

  const labels = useRef([]);
  const [id,setID]=useState();
  // Fetch the data on component load
  useEffect(() => {
    const fetchIntroData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/get-portfolio-data`);
        const data = await response.json();
        setID(data.intro[0]._id);
        setInputValues({
          title: data.intro[0].headingText || '',
          subtitle: data.intro[0].subText || '',
          mainContent: data.intro[0].mainText || '',
        });
      } catch (error) {
        console.error('Error fetching intro data:', error);
      }
    };

    fetchIntroData();
  }, [introId]);

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
      console.log("introId being sent:", id);  // Log the ID you're sending
      const response = await axios.put(`http://localhost:5000/api/update-intro`, {
        ...inputValues,
        id: id,  // Make sure this matches the ID in your database
      });
      
      // Handle success response
      if (response.data.success) {
        // Show SweetAlert popup for success
        Swal.fire({
          title: "Updated Successfully",
          text: "Click OK to go back",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            // Optionally, you can redirect or refresh the page here
            // window.location.href = '/some-page'; // Example: Redirect to another page
            window.location.href = '/'
          }
        });
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error updating intro content:', error);
    }
  };
  
  
  

  return (
    <div className="flex items-center justify-center ">
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
              Title
            </label>
          </div>
          <div className="form-control relative">
            <input
              type="text"
              required
              placeholder=" "
              id="subtitle"
              value={inputValues.subtitle}
              onChange={handleInputChange}
              className="block w-full p-3 text-white bg-transparent border-b-2 border-white focus:border-lightblue outline-none"
            />
            <label
              htmlFor="subtitle"
              ref={(el) => (labels.current[1] = el)}
              className={`absolute opacity-70 left-0 top-4 text-white transition-all duration-200 ${
                inputValues.subtitle ? 'top-[-1rem] text-lightblue' : ''
              }`}
            >
              Subtitle
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
            <span className="relative z-10">Update Hero Content</span>
            <span className="absolute inset-0 bg-lightblue rounded transition duration-300 transform scale-0 hover:scale-110" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHero;
