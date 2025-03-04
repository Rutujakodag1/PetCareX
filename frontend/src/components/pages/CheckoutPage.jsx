import React from 'react';

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-6 flex flex-col">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
        <p className="text-gray-600 mt-2">Complete your order below</p>
      </header>

      <main className="flex flex-col lg:flex-row lg:space-x-8 max-w-6xl mx-auto">
        {/* Order Summary */}
        <section className="flex-1 bg-white rounded-lg shadow-md p-6 mb-6 lg:mb-0">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
          <ul className="space-y-4">
            {/* Example item */}
            <li className="flex justify-between items-center">
              <div>
                <p className="text-gray-800">Premium Dog Food</p>
                <p className="text-sm text-gray-500">Qty: 1</p>
              </div>
              <p className="text-gray-800 font-semibold">$29.99</p>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <p className="text-gray-800">Pet Shampoo</p>
                <p className="text-sm text-gray-500">Qty: 2</p>
              </div>
              <p className="text-gray-800 font-semibold">$15.99</p>
            </li>
          </ul>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between">
              <p className="text-gray-800 font-semibold">Subtotal</p>
              <p className="text-gray-800 font-semibold">$45.98</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-gray-800">Shipping</p>
              <p className="text-gray-800">$5.00</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-gray-800 font-bold">Total</p>
              <p className="text-gray-800 font-bold">$50.98</p>
            </div>
          </div>
        </section>

        {/* Payment Details */}
        <section className="flex-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Billing Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700">Shipping Address</label>
              <textarea
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="Enter your address"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700">Card Details</label>
              <input
                type="text"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Card Number"
              />
              <div className="grid grid-cols-2 gap-4 mt-2">
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="MM/YY"
                />
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="CVC"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-md py-2 font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Complete Purchase
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default CheckoutPage;
