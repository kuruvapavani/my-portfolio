import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; // Import FaPlus icon for adding new skills
import Swal from 'sweetalert2';

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [editingSkill, setEditingSkill] = useState(null);
  const [isAddingNewSkill, setIsAddingNewSkill] = useState(false); // New state for adding a new skill
  const [formValues, setFormValues] = useState({ name: '', src: '', alt: '' });

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/get-portfolio-data`);
        const data = await response.json();
        setSkills(data.skills);
      } catch (error) {
        console.error('Error fetching skills data:', error);
      }
    };
    fetchSkillsData();
  }, []);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormValues({
      name: skill.name,
      src: skill.src,
      alt: skill.alt,
    });
  };

  // Submit handler for both editing and adding new skills
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingSkill) {
      // Update existing skill
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/update-skill/${editingSkill._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });
        const data = await response.json();
        if (data.success) {
          setSkills((prevSkills) =>
            prevSkills.map((skill) => (skill._id === editingSkill._id ? data.data : skill))
          );
          setEditingSkill(null);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Skill updated successfully!',
          });
          setFormValues({ name: '', src: '', alt: '' }); // Clear form
        }
      } catch (error) {
        console.error('Error updating skill:', error);
      }
    } else if (isAddingNewSkill) {
      // Add new skill
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/add-skill`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });
        const data = await response.json();
        if (data.success) {
          setSkills([...skills, data.data]);
          setIsAddingNewSkill(false);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'New skill added successfully!',
          });
          setFormValues({ name: '', src: '', alt: '' }); // Clear form
        }
      } catch (error) {
        console.error('Error adding new skill:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the skill.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/delete-skill/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
          setSkills(skills.filter((skill) => skill._id !== id));
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Skill has been deleted.',
          });
        }
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Skills</h2>

      {/* Edit or Add New Form */}
      {(editingSkill || isAddingNewSkill) && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div>
            <label>Skill Name</label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              required
              className="border p-2"
            />
          </div>
          <div>
            <label>Image URL</label>
            <input
              type="text"
              name="src"
              value={formValues.src}
              onChange={handleInputChange}
              required
              className="border p-2"
            />
          </div>
          <div>
            <label>Alt Text</label>
            <input
              type="text"
              name="alt"
              value={formValues.alt}
              onChange={handleInputChange}
              required
              className="border p-2"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
            {editingSkill ? 'Save Changes' : 'Add Skill'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div
          onClick={() => {
            setIsAddingNewSkill(true);
            setEditingSkill(null);
          }}
          className="border p-4 rounded shadow cursor-pointer flex justify-center items-center"
        >
          <FaPlus className="text-3xl text-blue-500" />
        </div>
        {skills.map((skill) => (
          <div key={skill._id} className="border p-4 rounded shadow">
            <img src={skill.src} alt={skill.alt} className="w-full h-24 object-cover mb-2" />
            <h3 className="text-lg font-semibold">{skill.name}</h3>
            <div className="flex justify-between mt-4">
              <button onClick={() => handleEdit(skill)}>
                <FaEdit className="text-blue-500" />
              </button>
              <button onClick={() => handleDelete(skill._id)}>
                <FaTrash className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSkills;
