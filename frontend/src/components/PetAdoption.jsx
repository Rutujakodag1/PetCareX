import React, { useState, useEffect } from "react";
import logo from '../assets/react.svg';

const PetAdoption = ({ theme }) => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);

  // Fetch pets available for adoption
  useEffect(() => {
    const fetchPets = async () => {
      // Replace with your API endpoint
      const response = await fetch("/api/adoption-pets");
      const data = await response.json();
      setPets(data);
    };
    fetchPets();
  }, []);

  const handleAdopt = (pet) => {
    setSelectedPet(pet);
  };

  const handleCloseModal = () => {
    setSelectedPet(null);
  };

  const handleSubmitAdoptionRequest = (e) => {
    e.preventDefault();
    alert(`Adoption request for ${selectedPet.name} submitted!`);
    handleCloseModal();
  };

  return (
    <div className={`p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <h1 className="text-3xl font-bold text-center mb-6">Find Your Furry Friend</h1>
      <p className="text-center mb-8">
        Explore pets available for adoption and give them a loving home!
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className={`shadow-lg rounded-lg p-4 transform transition-transform hover:scale-105 ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
            }`}
          >
            <img
              src={logo}
              alt={pet.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="mt-4 text-xl font-semibold">{pet.name}</h3>
            <p className="text-sm">{pet.breed}</p>
            <p className="text-sm">Age: {pet.age} years</p>
            <button
              onClick={() => handleAdopt(pet)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Adopt Me
            </button>
          </div>
        ))}
      </div>

      {selectedPet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`w-11/12 md:w-2/3 lg:w-1/2 rounded-lg shadow-lg p-6 relative ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-lg font-bold"
            >
              ×
            </button>
            <img
              src={logo}
              alt={selectedPet.name}
              className="w-1/2 mx-auto rounded-lg"
            />
            <h2 className="text-2xl font-bold text-center mt-4">{selectedPet.name}</h2>
            <p className="text-center mt-2">{selectedPet.breed}</p>
            <p className="text-center mt-2">Age: {selectedPet.age} years</p>
            <p className="mt-4">{selectedPet.description}</p>
            <form onSubmit={handleSubmitAdoptionRequest} className="mt-6">
              <h3 className="text-xl font-bold">Adoption Request</h3>
              <div className="mt-4">
                <label className="block mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mt-4">
                <label className="block mb-2">Your Contact Information</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetAdoption;
