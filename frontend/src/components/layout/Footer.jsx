import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
  const { theme } = useContext(ThemeContext);

  // Set icon colors based on the theme
  const iconColorClass = theme === 'dark' ? 'text-white hover:text-gray-400' : 'text-gray-800 hover:text-gray-500';
  const linkHoverClass = theme === 'dark' ? 'bg-gray-800 text-white hover:text-gray-300' : 'bg-white text-gray-800 hover:text-gray-600';

  return (
    <footer className={`py-4 mt-1 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="container mx-auto text-center">
        <p>&copy; 2024 PetCareX. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          {/* Facebook Icon */}
          <a href="https://www.facebook.com" className={iconColorClass}>
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>

          {/* Instagram Icon */}
          <a href="https://www.instagram.com" className={iconColorClass}>
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>

          {/* Twitter Icon */}
          <a href="https://www.twitter.com" className={iconColorClass}>
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
        </div>
        <li className="flex space-x-4">
          <a
            href="/customer/logout"
            className={`block text-lg font-medium ${linkHoverClass}`}
          >
            logout
          </a>
          <a
            href="/pet-profile"
            className={`block text-lg font-medium ${linkHoverClass}`}
          >
            pet-profile
          </a>
          <a
            href="/product-detail"
            className={`block text-lg font-medium ${linkHoverClass}`}
          >
            product-detail
          </a>
          <a
            href="/checkout"
            className={`block text-lg font-medium ${linkHoverClass}`}
          >
            checkout
          </a>
          <a
            href="/categories"
            className={`block text-lg font-medium ${linkHoverClass}`}
          >
            category
          </a>
          <a
            href="/pet-adoption"
            className={`block text-lg font-medium ${linkHoverClass}`}
          >
            pet-adoption
          </a>
          <a
            href="/consultation-booking"
            className={`block text-lg font-medium ${linkHoverClass}`}
          >
            consultation-booking
          </a>
          <a
            href="/blogs"
            className={`block text-lg font-medium ${linkHoverClass}`}
          >
            blogs
          </a>
          <a
            href="/services"
            className={`block text-lg font-medium ${linkHoverClass}`}
          >
            services
          </a>
          <a
            href="/reviews-ratings"
            className={`block text-lg font-medium ${linkHoverClass}`}
          >
            reviews-ratings
          </a>
          <a
            href="/order/success"
            className={`block text-lg font-medium ${linkHoverClass}`}
          >
            order/success
          </a>
          <a
            href="/order/failure"
            className={`block text-lg font-medium ${linkHoverClass}`}
          >
            /order/failure
          </a>
          <a
            href="/customer/orders"
            className={`block text-lg font-medium ${linkHoverClass}`}
          >
            /customer/orders
          </a>
          <a
            href="/customer/dashboard"
            className={`block text-lg font-medium ${linkHoverClass}`}
          >
            /customer/dashboard
          </a>
          <a
            href="/wishlist"
            className={`block text-lg font-medium ${linkHoverClass}`}
          >
            /wishlist
          </a>
          <a
            href="/profile"
            className={`block text-lg font-medium ${linkHoverClass}`}
          >
            /profile
          </a>
          <a
            href="/seller/dashboard"
            className={`block text-lg font-medium ${linkHoverClass}`}
          >
            /seller/dashboard
          </a>
          <a
            href="/products"
            className={`block text-lg font-medium ${linkHoverClass}`}
          >
            /products
          </a>
          <a
            href="/latest"
            className={`block text-lg font-medium ${linkHoverClass}`}
          >
            /latest
          </a>
        </li>

      </div>
    </footer>
  );
};

export default Footer;
