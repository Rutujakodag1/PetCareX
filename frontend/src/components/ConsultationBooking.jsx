import React, { useState, useEffect } from 'react';

const ConsultationBooking = ({ theme }) => {
  // State to manage doctor list, selected doctor, booking data
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingData, setBookingData] = useState({
    doctorId: '',
    date: '',
    time: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch doctors from API (Simulated here)
  useEffect(() => {
    // Replace with actual API call
    const fetchDoctors = async () => {
      const response = await fetch('/api/doctors');
      const data = await response.json();
      setDoctors(data);
    };

    fetchDoctors();
  }, []);

  // Handle search filter
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle selecting a doctor
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setBookingData({ ...bookingData, doctorId: doctor.id });
  };

  // Handle form input changes (date, time)
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle booking submission
  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    // Simulate API call to book the consultation
    const response = await fetch('/api/book-consultation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      alert('Consultation booked successfully!');
    } else {
      alert('Failed to book consultation!');
    }
  };

  // Filter doctors based on the search term
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`p-6 max-w-4xl mx-auto rounded-lg shadow-lg ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Consultation Booking</h2>

      {/* Search for Doctors */}
      <div className="mb-4">
        <input
          type="text"
          className={`w-full p-2 border ${
            theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'
          } rounded-md`}
          placeholder="Search for Doctors by Name or Specialization"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Doctor List */}
      <div className="mb-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className={`p-4 rounded-lg shadow-lg mb-4 cursor-pointer hover:bg-gray-100 ${
                theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
              }`}
              onClick={() => handleDoctorSelect(doctor)}
            >
              <h3 className="text-xl font-semibold">{doctor.name}</h3>
              <p className="text-gray-500">{doctor.specialization}</p>
              <p className="text-gray-500">Experience: {doctor.experience} years</p>
              <p className="text-yellow-400">Rating: {doctor.rating}⭐</p>
            </div>
          ))
        ) : (
          <p>No doctors found.</p>
        )}
      </div>

      {/* Selected Doctor Info */}
      {selectedDoctor && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Selected Doctor</h3>
          <div
            className={`p-4 rounded-lg shadow-lg ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
            }`}
          >
            <h3 className="text-2xl">{selectedDoctor.name}</h3>
            <p className="text-gray-500">{selectedDoctor.specialization}</p>
            <p className="text-gray-500">Experience: {selectedDoctor.experience} years</p>
            <p className="text-yellow-400">Rating: {selectedDoctor.rating}⭐</p>
          </div>

          {/* Consultation Booking Form */}
          <h3 className="text-lg font-semibold mt-4 mb-2">Select a Date and Time</h3>
          <form onSubmit={handleSubmitBooking}>
            <div className="mb-4">
              <label className="block">Date</label>
              <input
                type="date"
                name="date"
                value={bookingData.date}
                onChange={handleBookingChange}
                className={`w-full p-2 border ${
                  theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'
                } rounded-md`}
              />
            </div>

            <div className="mb-4">
              <label className="block">Time</label>
              <input
                type="time"
                name="time"
                value={bookingData.time}
                onChange={handleBookingChange}
                className={`w-full p-2 border ${
                  theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'
                } rounded-md`}
              />
            </div>

            <button
              type="submit"
              className={`py-2 px-4 rounded-md ${
                theme === 'dark' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Book Consultation
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ConsultationBooking;
