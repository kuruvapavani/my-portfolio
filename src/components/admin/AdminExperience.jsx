import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; // Import icons
import Swal from 'sweetalert2';

const AdminExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [editingExperience, setEditingExperience] = useState(null);
  const [isAddingNewExperience, setIsAddingNewExperience] = useState(false);
  const [formValues, setFormValues] = useState({
    position: '',
    company: '',
    image: '',
    blogLink: '',
  });

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/get-experiences`);
        const data = await response.json();
        setExperiences(data.experiences);
      } catch (error) {
        console.error('Error fetching experiences data:', error);
      }
    };
    fetchExperienceData();
  }, []);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (experience) => {
    setEditingExperience(experience);
    setFormValues({
      position: experience.position,
      company: experience.company,
      image: experience.image,
      blogLink: experience.blogLink,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let message = '';
    try {
      if (editingExperience) {
        // Update existing experience
        const response = await fetch(`http://localhost:5000/api/update-experience/${editingExperience._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });
        const data = await response.json();
        if (data.success) {
          setExperiences((prevExperiences) =>
            prevExperiences.map((experience) => (experience._id === editingExperience._id ? data.data : experience))
          );
          message = 'Experience updated successfully!';
        }
      } else if (isAddingNewExperience) {
        // Add new experience
        const response = await fetch('http://localhost:5000/api/add-experience', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });
        const data = await response.json();
        if (data.success) {
          setExperiences([...experiences, data.data]);
          message = 'New experience added successfully!';
        }
      }
      // Show success message
      Swal.fire('Success', message, 'success');
      setEditingExperience(null);
      setIsAddingNewExperience(false);
      setFormValues({ position: '', company: '', image: '', blogLink: '' });
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'An error occurred. Please try again.', 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/delete-experience/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
          setExperiences(experiences.filter((experience) => experience._id !== id));
          Swal.fire('Deleted!', 'Experience has been deleted.', 'success');
        }
      } catch (error) {
        console.error('Error deleting experience:', error);
        Swal.fire('Error', 'Failed to delete experience. Please try again.', 'error');
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Experience</h2>

      {/* Edit or Add New Form */}
      {(editingExperience || isAddingNewExperience) && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div>
            <label>Position</label>
            <input
              type="text"
              name="position"
              value={formValues.position}
              onChange={handleInputChange}
              required
              className="border p-2"
            />
          </div>
          <div>
            <label>Company</label>
            <input
              type="text"
              name="company"
              value={formValues.company}
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
            <label>Blog Link</label>
            <input
              type="text"
              name="blogLink"
              value={formValues.blogLink}
              onChange={handleInputChange}
              required
              className="border p-2"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
            {editingExperience ? 'Save Changes' : 'Add Experience'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div
          onClick={() => {
            setIsAddingNewExperience(true);
            setEditingExperience(null);
          }}
          className="border p-4 rounded shadow cursor-pointer flex justify-center items-center"
        >
          <FaPlus className="text-3xl text-blue-500" />
        </div>
        {experiences.map((experience) => (
          <div key={experience._id} className="border p-4 rounded shadow">
            <img src={experience.image} alt={experience.position} className="w-full h-24 object-cover mb-2" />
            <h3 className="text-lg font-semibold">{experience.position}</h3>
            <p>{experience.company}</p>
            <div className="flex justify-between mt-4">
              <button onClick={() => handleEdit(experience)}>
                <FaEdit className="text-blue-500" />
              </button>
              <button onClick={() => handleDelete(experience._id)}>
                <FaTrash className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminExperience;
