import React, { useState } from "react";
import logo from '../assets/react.svg';

const PetService = ({ theme }) => {
  const services = [
    {
      id: 1,
      title: "Pet Grooming",
      description: "Professional grooming services to keep your pet clean and stylish.",
      image: "/images/grooming.jpg",
      price: "$50/session",
      details: "Includes bath, haircut, nail trimming, and ear cleaning.",
    },
    {
      id: 2,
      title: "Pet Training",
      description: "Behavioral training to ensure your pet is well-mannered and obedient.",
      image: "/images/training.jpg",
      price: "$100/session",
      details: "Covers basic commands, leash walking, and socialization skills.",
    },
    {
      id: 3,
      title: "Pet Boarding",
      description: "Safe and comfortable boarding for your pet while you’re away.",
      image: "/images/boarding.jpg",
      price: "$30/day",
      details: "Includes meals, playtime, and round-the-clock care.",
    },
    {
      id: 4,
      title: "Veterinary Services",
      description: "Comprehensive checkups and medical care for your pet’s health.",
      image: "/images/veterinary.jpg",
      price: "Varies",
      details: "Routine exams, vaccinations, and emergency care available.",
    },
  ];

  const [selectedService, setSelectedService] = useState(null);

  const handleViewDetails = (service) => {
    setSelectedService(service);
  };

  const handleCloseDetails = () => {
    setSelectedService(null);
  };

  return (
    <div className={`p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <h1 className="text-3xl font-bold text-center mb-6">Pet Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className={`shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
            }`}
          >
            <img
              src={logo}
              alt={service.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
            <p className="text-sm mt-2">{service.description}</p>
            <p className="mt-2 font-bold">{service.price}</p>
            <button
              onClick={() => handleViewDetails(service)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`w-11/12 md:w-2/3 lg:w-1/2 rounded-lg shadow-lg p-6 relative ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <button
              onClick={handleCloseDetails}
              className="absolute top-4 right-4 text-lg font-bold"
            >
              ×
            </button>
            <img
              src={logo}
              alt={selectedService.title}
              className="w-full h-64 object-cover rounded-md"
            />
            <h2 className="text-2xl font-bold mt-4">{selectedService.title}</h2>
            <p className="mt-2">{selectedService.details}</p>
            <p className="mt-4 font-bold">{selectedService.price}</p>
            <button
              onClick={handleCloseDetails}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetService;
