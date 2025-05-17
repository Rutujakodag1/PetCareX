import React, { useState, useEffect } from 'react';
import logo from '../../assets/react.svg';

const PetProfile = ({ theme }) => {
  // State to hold pet details
  const [pet, setPet] = useState({
    name: '',
    breed: '',
    age: '',
    description: '',
    image: ''
  });

  // State for handling form input changes
  const [formData, setFormData] = useState({
    name: pet.name,
    breed: pet.breed,
    age: pet.age,
    description: pet.description,
    image: logo
  });

  // State to handle form submission status
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch pet details from the API (e.g., when the page loads)
  useEffect(() => {
    const fetchPetDetails = async () => {
      // Simulate fetching data from an API
      const response = await fetch('/api/pet-profile');
      const data = await response.json();
      setPet(data);
      setFormData({
        name: data.name,
        breed: data.breed,
        age: data.age,
        description: data.description,
        image:logo
      });
    };
    fetchPetDetails();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file upload (image)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        image: imageUrl,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate API call to update pet profile
    const response = await fetch('/api/pet-profile/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setIsSubmitted(true); // Set form as submitted
      setPet(formData); // Update pet state with new data
      alert('Pet profile updated successfully!');
    } else {
      alert('Failed to update pet profile!');
    }
  };

  return (
    <div className={`p-6 max-w-xl mx-auto rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      {isSubmitted ? (
        // If form is submitted, show pet profile info
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Pet Profile</h2>
          <img
            src={logo}
            alt={formData.name}
            className="w-32 h-32 rounded-full mx-auto mt-4 object-cover"
          />
          <h3 className="text-lg mt-2">{formData.name}</h3>
          <p className="text-gray-500">{formData.breed} | {formData.age} years old</p>
          <p className="mt-2">{formData.description}</p>
        </div>
      ) : (
        // If form is not submitted, show form
        <div>
          <h2 className="text-2xl font-bold text-center mb-4">Pet Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className={`block ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Pet Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} rounded-md`}
                placeholder="Enter Pet's Name"
              />
            </div>

            <div className="mb-4">
              <label className={`block ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Breed</label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleInputChange}
                className={`w-full p-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} rounded-md`}
                placeholder="Enter Pet's Breed"
              />
            </div>

            <div className="mb-4">
              <label className={`block ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className={`w-full p-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} rounded-md`}
                placeholder="Enter Pet's Age"
              />
            </div>

            <div className="mb-4">
              <label className={`block ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`w-full p-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} rounded-md`}
                rows="4"
                placeholder="Enter a brief description of the pet"
              />
            </div>

            <div className="mb-4">
              <label className={`block ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Upload Pet Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageUpload}
                className={`w-full p-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} rounded-md`}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className={`py-2 px-4 rounded-md hover:bg-blue-600 ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-blue-500 text-white'}`}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PetProfile;
