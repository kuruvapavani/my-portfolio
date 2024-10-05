import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; // Import icons
import Swal from 'sweetalert2';

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [isAddingNewTestimonial, setIsAddingNewTestimonial] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    company: '',
    text: '',
  });

  useEffect(() => {
    const fetchTestimonialsData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/get-testimonials`);
        const data = await response.json();
        setTestimonials(data.testimonials);
      } catch (error) {
        console.error('Error fetching testimonials data:', error);
      }
    };
    fetchTestimonialsData();
  }, []);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormValues({
      name: testimonial.name,
      email: testimonial.email,
      company: testimonial.company,
      text: testimonial.text,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let message = '';
    try {
      if (editingTestimonial) {
        // Update existing testimonial
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/update-testimonial/${editingTestimonial._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });
        const data = await response.json();
        if (data.success) {
          setTestimonials((prevTestimonials) =>
            prevTestimonials.map((testimonial) => (testimonial._id === editingTestimonial._id ? data.data : testimonial))
          );
          message = 'Testimonial updated successfully!';
        }
      } else if (isAddingNewTestimonial) {
        // Add new testimonial
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/add-testimonial`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });
        const data = await response.json();
        if (data.success) {
          setTestimonials([...testimonials, data.data]);
          message = 'New testimonial added successfully!';
        }
      }
      // Show success message
      Swal.fire('Success', message, 'success');
      setEditingTestimonial(null);
      setIsAddingNewTestimonial(false);
      setFormValues({ name: '', email: '', company: '', text: '' });
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'An error occurred. Please try again.', 'error');
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
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/delete-testimonial/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        setTestimonials(testimonials.filter((testimonial) => testimonial._id !== id));
        Swal.fire('Deleted!', 'Testimonial has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      Swal.fire('Error', 'Failed to delete testimonial. Please try again.', 'error');
    }
  }
    
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Testimonials</h2>

      {/* Edit or Add New Form */}
      {(editingTestimonial || isAddingNewTestimonial) && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div>
            <label>Name</label>
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
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
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
            <label>Testimonial</label>
            <textarea
              name="text"
              value={formValues.text}
              onChange={handleInputChange}
              required
              className="border p-2"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
            {editingTestimonial ? 'Save Changes' : 'Add Testimonial'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div
          onClick={() => {
            setIsAddingNewTestimonial(true);
            setEditingTestimonial(null);
          }}
          className="border p-4 rounded shadow cursor-pointer flex justify-center items-center"
        >
          <FaPlus className="text-3xl text-blue-500" />
        </div>
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{testimonial.name}</h3>
            <p>{testimonial.company}</p>
            <p>{testimonial.email}</p>
            <p>{testimonial.text}</p>
            <div className="flex justify-end mt-2">
              <FaEdit
                onClick={() => handleEdit(testimonial)}
                className="text-blue-500 cursor-pointer mr-2"
              />
              <FaTrash
                onClick={() => handleDelete(testimonial._id)}
                className="text-red-500 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonials;
