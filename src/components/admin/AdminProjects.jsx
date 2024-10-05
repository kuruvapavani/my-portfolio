import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; // Import FaPlus icon for adding new projects
import Swal from 'sweetalert2';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [isAddingNewProject, setIsAddingNewProject] = useState(false);
  const [formValues, setFormValues] = useState({ title: '', image: '', stack: '', demoLink: '', codeLink: '' });

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/get-portfolio-data`);
        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error('Error fetching projects data:', error);
      }
    };
    fetchProjectsData();
  }, []);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormValues({
      title: project.title,
      image: project.image,
      stack: project.stack,
      demoLink: project.demoLink,
      codeLink: project.codeLink,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      let data;
  
      if (editingProject) {
        // Update existing project
        response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/update-project/${editingProject._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });
        data = await response.json();
  
        if (data.success) {
          setProjects((prevProjects) =>
            prevProjects.map((project) => (project._id === editingProject._id ? data.data : project))
          );
          Swal.fire('Success', 'Project updated successfully!', 'success'); // Show success alert
          setEditingProject(null);
        }
      } else if (isAddingNewProject) {
        // Add new project
        response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/add-project`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });
        data = await response.json();
  
        if (data.success) {
          setProjects([...projects, data.data]);
          Swal.fire('Success', 'Project added successfully!', 'success'); // Show success alert
          setIsAddingNewProject(false);
        }
      }
  
      // Reset form values
      setFormValues({ title: '', image: '', stack: '', demoLink: '', codeLink: '' });
    } catch (error) {
      console.error('Error submitting project:', error);
      Swal.fire('Error', 'An error occurred while submitting the project.', 'error'); // Show error alert
    }
  };
  

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will permanently delete the project.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
    });

    if (confirmDelete.isConfirmed) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/delete-project/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.success) {
                setProjects(projects.filter((project) => project._id !== id));
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Project has been deleted.',
                });
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    }
};

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Projects</h2>

      {/* Edit or Add New Form */}
      {(editingProject || isAddingNewProject) && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div>
            <label>Project Title</label>
            <input
              type="text"
              name="title"
              value={formValues.title}
              onChange={handleInputChange}
              required
              className="border p-2"
            />
          </div>
          <div>
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              value={formValues.image}
              onChange={handleInputChange}
              required
              className="border p-2"
            />
          </div>
          <div>
            <label>Stack</label>
            <input
              type="text"
              name="stack"
              value={formValues.stack}
              onChange={handleInputChange}
              required
              className="border p-2"
            />
          </div>
          <div>
            <label>Demo Link</label>
            <input
              type="text"
              name="demoLink"
              value={formValues.demoLink}
              onChange={handleInputChange}
              required
              className="border p-2"
            />
          </div>
          <div>
            <label>Code Link</label>
            <input
              type="text"
              name="codeLink"
              value={formValues.codeLink}
              onChange={handleInputChange}
              required
              className="border p-2"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
            {editingProject ? 'Save Changes' : 'Add Project'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div
          onClick={() => {
            setIsAddingNewProject(true);
            setEditingProject(null);
          }}
          className="border p-4 rounded shadow cursor-pointer flex justify-center items-center"
        >
          <FaPlus className="text-3xl text-blue-500" />
        </div>
        {projects.map((project) => (
          <div key={project._id} className="border p-4 rounded shadow">
            <img src={project.image} alt={project.title} className="w-full h-24 object-cover mb-2" />
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p>{project.stack}</p>
            <div className="flex justify-between mt-4">
              <button onClick={() => handleEdit(project)}>
                <FaEdit className="text-blue-500" />
              </button>
              <button onClick={() => handleDelete(project._id)}>
                <FaTrash className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;
