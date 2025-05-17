import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactUs = () => {
  const [statusMessage, setStatusMessage] = useState('');

  // Function to send email using emailjs
  function sendEmail(e) {
    e.preventDefault(); // Prevent the default form submission

    emailjs.sendForm('service_uvz0vvk', 'template_l4zmtph', e.target, '6grf2-XKC5Z5HunXZ')
      .then((result) => {
          // Display success message and reset the form
          setStatusMessage('Your message has been sent successfully!');
          e.target.reset();  // Reset the form fields after successful submission
      }, (error) => {
          // Display error message
          setStatusMessage('There was an error sending your message. Please try again later.');
          console.log(error.text); // Logs any errors to the console
      });
  }

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            We'd love to hear from you! Feel free to reach out with any questions or feedback.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Contact Form */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>
            <form className="bg-white shadow-md rounded-lg p-6 space-y-4"
            onSubmit={sendEmail}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name='from_name'
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name='from_email'
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  name='html_message'
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
              >
                Send Message
              </button>
            </form>
            {/* Display success or error message */}
            {statusMessage && (
              <div
                className={`mt-4 p-4 text-center rounded-md ${
                  statusMessage.includes("successfully") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {statusMessage}
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600 mb-6">
              We're here to help! Reach out to us via phone or email, or visit us at our office.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="material-icons text-blue-500">phone</span>
                <p className="text-gray-700">+1 (234) 567-890</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-icons text-blue-500">email</span>
                <p className="text-gray-700">support@example.com</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="material-icons text-blue-500">place</span>
                <p className="text-gray-700">
                  123 Main Street, <br />
                  City, State, Country
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Location</h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Google Map"
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62224.27540147989!2d75.2755444912173!3d17.679880099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc4181b8db52943%3A0x1ab147f5432da578!2sPandharpur%2C%20Maharashtra%20413304!5e0!3m2!1sen!2sin!4v1679504051558!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
