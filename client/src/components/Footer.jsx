'use client';

import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { assets } from '../../public/assets/assets';
export function Footer1() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img src={assets.logo} alt="Logo" className="h-20 mr-3" />
          
        </div>
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-white hover:text-blue-500" />
          </a>
         
          <a
            href="https://www.instagram.com/puppets.eg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-white hover:text-pink-500" />
          </a>
          <a
            href="https://web.whatsapp.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="text-white hover:text-blue-700" />
          </a>
        </div>
        <Link to="/admin/login" className="text-white hover:text-gray-400">
          Admin Login
        </Link>
      </div>
    </footer>
  );
}
