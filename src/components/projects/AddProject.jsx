import React, { useEffect, useRef, useState } from "react";

const AddProject = () => {
  const labels = useRef([]);
  const [inputValues, setInputValues] = useState({
    projectName: "",
    imageUrl: "",
    stack: "",
    githubUrl: "",
    liveDemoUrl: "",
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

    const projectData = {
      projectName: inputValues.projectName,
      imageUrl: inputValues.imageUrl,
      stack: inputValues.stack,
      githubUrl: inputValues.githubUrl,
      liveDemoUrl: inputValues.liveDemoUrl,
    };

    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });
      const data = await response.json();
      console.log(data);
      alert("Project added successfully!");
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <section className="min-h-screen">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-black bg-opacity-40 rounded-lg p-2 pt-10 pb-20 md:p-10 md:px-20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control relative">
              <input
                type="text"
                required
                placeholder=" "
                id="projectName"
                value={inputValues.projectName}
                onChange={handleInputChange}
                className="block w-full p-3 text-white bg-transparent border-b-2 border-white focus:border-lightblue outline-none"
              />
              <label
                htmlFor="projectName"
                ref={(el) => (labels.current[0] = el)}
                className={`absolute opacity-70 left-0 top-4 text-white transition-all duration-200 ${
                  inputValues.projectName ? "top-[-1rem] text-lightblue" : ""
                }`}
              >
                Project Name
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
                Project Image URL
              </label>
            </div>

            <div className="form-control relative">
              <input
                type="text"
                required
                placeholder=" "
                id="stack"
                value={inputValues.stack}
                onChange={handleInputChange}
                className="block w-full p-3 text-white bg-transparent border-b-2 border-white focus:border-lightblue outline-none"
              />
              <label
                htmlFor="stack"
                ref={(el) => (labels.current[2] = el)}
                className={`absolute opacity-70 left-0 top-4 text-white transition-all duration-200 ${
                  inputValues.stack ? "top-[-1rem] text-lightblue" : ""
                }`}
              >
                Stack Used
              </label>
            </div>

            <div className="form-control relative">
              <input
                type="text"
                required
                placeholder=" "
                id="githubUrl"
                value={inputValues.githubUrl}
                onChange={handleInputChange}
                className="block w-full p-3 text-white bg-transparent border-b-2 border-white focus:border-lightblue outline-none"
              />
              <label
                htmlFor="githubUrl"
                ref={(el) => (labels.current[3] = el)}
                className={`absolute opacity-70 left-0 top-4 text-white transition-all duration-200 ${
                  inputValues.githubUrl ? "top-[-1rem] text-lightblue" : ""
                }`}
              >
                GitHub URL
              </label>
            </div>

            <div className="form-control relative">
              <input
                type="text"
                required
                placeholder=" "
                id="liveDemoUrl"
                value={inputValues.liveDemoUrl}
                onChange={handleInputChange}
                className="block w-full p-3 text-white bg-transparent border-b-2 border-white focus:border-lightblue outline-none"
              />
              <label
                htmlFor="liveDemoUrl"
                ref={(el) => (labels.current[4] = el)}
                className={`absolute opacity-70 left-0 top-4 text-white transition-all duration-200 ${
                  inputValues.liveDemoUrl ? "top-[-1rem] text-lightblue" : ""
                }`}
              >
                Live Demo URL
              </label>
            </div>

            <button
              type="submit"
              className="relative w-full bg-lightblue bg-blue-700 text-white py-2 rounded transition duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-90 active:scale-95"
            >
              <span className="relative z-10">Add Project</span>
              <span className="absolute inset-0 bg-lightblue rounded transition duration-300 transform scale-0 hover:scale-110" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProject;
