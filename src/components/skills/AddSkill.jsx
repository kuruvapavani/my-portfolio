import React, { useEffect, useRef, useState } from "react";

const AddSkill = () => {
  const labels = useRef([]);
  const [inputValues, setInputValues] = useState({
    skill: "",
    imageUrl: "",
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
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const skillData = {
      skill: inputValues.skill,
      imageUrl: inputValues.imageUrl,
    };

    try {
      const response = await fetch("http://localhost:5000/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(skillData),
      });
      const data = await response.json();
      console.log(data);
      alert("Skill added successfully!");
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  return (
    <section className="min-h-screen">
      <div className="flex items-center justify-center h-screen">
        <div className="bg-black bg-opacity-40 rounded-lg p-5 pt-10 pb-20 md:p-20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control relative">
              <input
                type="text"
                required
                placeholder=" "
                id="skill"
                value={inputValues.skill}
                onChange={handleInputChange}
                className="block w-full p-3 text-white bg-transparent border-b-2 border-white focus:border-lightblue outline-none"
              />
              <label
                htmlFor="skill"
                ref={(el) => (labels.current[0] = el)}
                className={`absolute opacity-70 left-0 top-4 text-white transition-all duration-200 ${
                  inputValues.skill ? "top-[-1rem] text-lightblue" : ""
                }`}
              >
                Skill Name
              </label>
            </div>
            <div className="form-control relative">
              <input
                type="text"
                required
                placeholder=" "
                id="imageUrl"
                value={inputValues.imageUrl}
                onChange={handleInputChange}
                className="block w-full p-3 text-white bg-transparent border-b-2 border-white focus:border-lightblue outline-none"
              />
              <label
                htmlFor="imageUrl"
                ref={(el) => (labels.current[1] = el)}
                className={`absolute opacity-70 left-0 top-4 text-white transition-all duration-200 ${
                  inputValues.imageUrl ? "top-[-1rem] text-lightblue" : ""
                }`}
              >
                Skill Image URL
              </label>
            </div>
            <button
              type="submit"
              className="relative w-full bg-lightblue bg-blue-700 text-white py-2 rounded transition duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-90 active:scale-95"
            >
              <span className="relative z-10">Add Skill</span>
              <span className="absolute inset-0 bg-lightblue rounded transition duration-300 transform scale-0 hover:scale-110" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddSkill;
