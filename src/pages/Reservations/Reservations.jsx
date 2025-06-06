import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import InfoCard from '../../components/InfoCard/InfoCard';

const Reservations = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const { hotelData = [], loading } = useContext(AuthContext);

  useEffect(() => {
    // Initial rendering with 'All' filter
    filterData('All');
  }, [hotelData]);

  const filterData = (filter) => {
    let filteredData;

    if (filter === 'All') {
      // Show resorts with id between 1 to 8
      filteredData = hotelData.filter((item) => item.id >= 1 && item.id <= 8);
    } else if (filter === 'Complete') {
      // Pick random resorts (you can limit the number if needed)
      filteredData = [...hotelData].sort(() => 0.5 - Math.random()).slice(0, 5); // showing 5 random resorts
    } else {
      // Filter data based on other filters (Upcoming, Canceled)
      filteredData = hotelData.filter((item) => item.category === filter);
    }

    setFilteredData(filteredData);
    setSelectedFilter(filter);
  };

  const renderFilteredData = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (filteredData.length === 0) {
      if (selectedFilter === 'Upcoming') {
        return (
          <div className='flex justify-center md:justify-center mt-10'>
            <p className='text-lg font-semibold text-center'>
              You have no upcoming reservations.
            </p>
          </div>
        );
      } else {
        return (
          <div className='flex justify-center mt-10'>
            <p className='text-lg font-semibold text-center'>
              No results found.<br />
              <span className='font-normal text-gray-600'>Please try a different filter.</span>
            </p>
          </div>
        );
      }
    }

    return filteredData.map((item, index) => (
      <InfoCard key={index} data={item} />
    ));
  };

  return (
    <div className="container mx-auto flex flex-col justify-center items-center md:ml-10 mt-5">
      <h2 className="text-xl md:text-3xl font-bold mb-4">Reservations</h2>

      {/* Filter Section */}
      <div className="flex items-center justify-center gap-10 mb-4">
        <button
          className={`cursor-pointer ${selectedFilter === 'Upcoming' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => filterData('Upcoming')}
        >
          Upcoming
        </button>

        {/* For the Complete button */}
        <button
          className={`cursor-pointer ${selectedFilter === 'Complete' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => filterData('Complete')}
        >
          Complete
        </button>

        <button
          className={`cursor-pointer ${selectedFilter === 'Canceled' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => filterData('Canceled')}
        >
          Canceled
        </button>

        <button
          className={`cursor-pointer ${selectedFilter === 'All' ? 'text-blue-500 font-bold' : ''}`}
          onClick={() => filterData('All')}
        >
          All
        </button>
      </div>

      <div className='flex justify-center'>
        <span className='w-[400px] border border-gray-300'></span>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 justify-center items-center gap-5">
        {renderFilteredData()}
      </div>
    </div>
  );
};

export default Reservations;
