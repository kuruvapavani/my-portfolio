import React, { useState } from "react";
import AddExperience from "../experience/AddExperience";
import AddProject from "../projects/AddProject";
import AddSkill from "../skills/AddSkill";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  // Mock login status - replace with actual login logic
  const isLoggedIn = true; // Change this based on your authentication logic

  const renderComponent = () => {
    switch (activeComponent) {
      case "skill":
        return <AddSkill />;
      case "project":
        return <AddProject />;
      case "experience":
        return <AddExperience />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 p-5">
      {isLoggedIn ? (
        <>
          <h1 className="text-white text-3xl mb-6">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
            <div
              className="bg-blue-700 p-5 rounded-lg shadow-lg cursor-pointer transition-transform duration-300 transform hover:scale-105"
              onClick={() => setActiveComponent("skill")}
            >
              <h2 className="text-white text-xl">Add Skill</h2>
            </div>
            <div
              className="bg-green-700 p-5 rounded-lg shadow-lg cursor-pointer transition-transform duration-300 transform hover:scale-105"
              onClick={() => setActiveComponent("project")}
            >
              <h2 className="text-white text-xl">Add Project</h2>
            </div>
            <div
              className="bg-red-700 p-5 rounded-lg shadow-lg cursor-pointer transition-transform duration-300 transform hover:scale-105"
              onClick={() => setActiveComponent("experience")}
            >
              <h2 className="text-white text-xl">Add Experience</h2>
            </div>
          </div>
          <div className="mt-10 w-full">{renderComponent()}</div>
        </>
      ) : (
        <h2 className="text-white text-2xl">Please log in to access this section.</h2>
      )}
    </div>
  );
};

export default AdminDashboard;
