import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { AiOutlineApi } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold text-white">Art Story Bot</h2>
            <p className="mt-2 text-sm text-gray-400 max-w-xs">
              Generate unique and imaginative backstories for pieces of art using the power of Gemini.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">Resources</h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#how-to-use" className="hover:underline">How to Use</a>
                </li>
                <li className="mb-4">
                  <a href="https://vitejs.dev/" className="hover:underline" target="_blank" rel="noopener noreferrer">Vite</a>
                </li>
                <li>
                  <a href="https://tailwindcss.com/" className="hover:underline" target="_blank" rel="noopener noreferrer">Tailwind CSS</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">API</h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4 ">
                  <a href="https://ai.google.dev/gemini-api/docs/api-key" className="hover:underline" target="_blank" rel="noopener noreferrer">Gemini API</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
        <div className="text-center">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {new Date().getFullYear()} <a href="#" className="hover:underline">Art Story Bot</a>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;