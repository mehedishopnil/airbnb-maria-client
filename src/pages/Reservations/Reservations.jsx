import { useContext, useEffect, useState } from 'react';
import InfoCard from '../../components/InfoCard/InfoCard';
import { AuthContext } from '../../provider/AuthProvider';
import Loading from '../../components/Loading';

const Reservations = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const { hotelData, loading } = useContext(AuthContext);

  const filters = [
    { id: 'Upcoming', label: 'Upcoming' },
    { id: 'Complete', label: 'Complete' },
    { id: 'Canceled', label: 'Canceled' },
    { id: 'All', label: 'All' }
  ];

  useEffect(() => {
    filterData(selectedFilter);
  }, [hotelData, selectedFilter]);

  const filterData = (filter) => {
    if (!hotelData) return;

    let result;
    if (filter === 'All') {
      result = hotelData.filter(item => item.category === 'Farms');
    } else {
      result = hotelData.filter(item => item.status === filter);
    }
    setFilteredData(result);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      );
    }

    if (filteredData.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            {selectedFilter === 'Upcoming' 
              ? 'You have no upcoming reservations' 
              : 'No reservations found'}
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            {selectedFilter === 'Upcoming'
              ? 'When you make a reservation, it will appear here.'
              : 'Try adjusting your filter to find what you\'re looking for.'}
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full px-4 sm:px-0">
        {filteredData.map((item) => (
          <InfoCard key={item.id || item._id} data={item} />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Your Reservations</h1>
        <p className="text-gray-600 mt-2">Manage your upcoming and past stays</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
        <div className="flex space-x-4 mx-auto">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedFilter === filter.id
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-gray-200 mb-8"></div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default Reservations;