import React, { useState } from 'react';

const Navbar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
    setCity('');
  };

  return (
    <div>
      <nav className="flex justify-evenly pt-10">
        <h1 className="text-white text-lg mr-32">Wheather App</h1>
        <div className="mt-4 absolute top-20">
          <form onSearch={handleSubmit}>
            <input
              className="py-2 px-2 rounded"
              type="text"
              placeholder="Enter city or town"
              value={city}
              onChange={handleCity}
            />
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Search
            </button>
          </form>
        </div>
        <button>
          <img className="h-5" src="/btn.png" alt="" />
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
