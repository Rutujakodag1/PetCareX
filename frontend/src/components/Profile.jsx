import React, { useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Rutuja Kodag",
    email: "rutuja@example.com",
    phone: "123-456-7890",
    address: "123 Pet Street, Paw City, PC 56789",
    profileImg: "/assets/user-profile.png",
    pets: [
      { id: 1, name: "Buddy", type: "Dog", age: "2 years" },
      { id: 2, name: "Whiskers", type: "Cat", age: "3 years" },
    ],
  });

  const handleEditProfile = () => {
    alert("Edit Profile functionality will be implemented here.");
  };

  return (
    <div className="bg-gradient-to-b from-[#DEECE1] to-[#FFD5C5] min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto p-6">
        {/* User Information */}
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            src={user.profileImg}
            alt={user.name}
            className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-6"
          />
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
            <p className="text-gray-600">{user.address}</p>
            <button
              onClick={handleEditProfile}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Pets Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Your Pets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.pets.map((pet) => (
              <div
                key={pet.id}
                className="bg-[#FFD5C5] rounded-lg shadow p-4 flex flex-col items-center"
              >
                <img
                  src={`/assets/${pet.type.toLowerCase()}-icon.png`}
                  alt={pet.type}
                  className="w-16 h-16 mb-2"
                />
                <h3 className="text-lg font-bold">{pet.name}</h3>
                <p className="text-sm text-gray-600">{pet.type}</p>
                <p className="text-sm text-gray-600">Age: {pet.age}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
