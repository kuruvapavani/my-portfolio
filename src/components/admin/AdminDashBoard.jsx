import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminProjects from "./AdminProjects";
import AddAbout from "../about/AddAbout";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import AddHero from "../hero/AddHero";
import AdminSkills from "./AdminSkills";
import AdminExperience from "./AdminExperience";
import AdminTestimonials from "./AdminTestimonials";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);
  

  // Optionally, render null or a loading state until the check is complete
  const token = localStorage.getItem("authToken");
  if (!token) {
    return null; // Or you can return a loading spinner
  }

  const onChange = (key) => {
    console.log(`Selected tab: ${key}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 text-white">
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Intro" key="1">
          <AddHero />
        </TabPane>
        <TabPane tab="About" key="2">
          <AddAbout />
        </TabPane>
        <TabPane tab="Skills" key="3">
          <AdminSkills />
        </TabPane>
        <TabPane tab="Projects" key="4">
          <AdminProjects />
        </TabPane>
        <TabPane tab="Experience" key="5">
          <AdminExperience />
        </TabPane>
        <TabPane tab="Testimonials" key="6">
          <AdminTestimonials />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
