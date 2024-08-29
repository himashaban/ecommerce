import React  from 'react'
import { Link } from 'react-router-dom'
export default function Footer() {





  return <>
     <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="mb-2">© 2024 made by Ibrahim Shaaban. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mb-2">
          <Link to="/about" className="hover:text-gray-400">About Us</Link>
          <Link to="/contact" className="hover:text-gray-400">Contact</Link>
          <Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-400">Terms of Service</Link>
        </div>
        <div className="flex justify-center space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Instagram</a>
        </div>
      </div>
    </footer>

  </>
}