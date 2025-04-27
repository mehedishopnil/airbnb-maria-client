import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import PropTypes from 'prop-types';

const ListingCard = ({ item }) => {
  const navigate = useNavigate();
  const { earningList } = React.useContext(AuthContext);

  const handleNavigation = (e) => {
    e.preventDefault(); // Prevent default Link behavior
    
    if (!item?.id) {
      console.error("Item ID is missing");
      return;
    }

    const selectedEarning = earningList?.find(earning => earning.id === item.id);
    
    if (selectedEarning) {
      navigate(`/individual-earnings/${item.id}`, {
        state: { listingData: item, earningData: selectedEarning }
      });
    } else {
      console.error("No matching earning data found for this listing");
      // Optionally show user feedback here
    }
  };

  return (
    <div 
      onClick={handleNavigation}
      className="border rounded-lg border-gray-200 mb-4 p-4 flex items-center justify-between cursor-pointer
                 hover:shadow-md transition-shadow duration-200 bg-white"
    >
      <div className="flex items-center gap-4 md:gap-6 w-full">
        {/* Image with better responsive sizing */}
        <div className="flex-shrink-0">
          <img 
            src={item.image || '/placeholder-listing.jpg'} 
            alt={item.title || 'Listing'}
            className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover"
            onError={(e) => {
              e.target.src = '/placeholder-listing.jpg';
            }}
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 truncate">
            {item.title || 'Untitled Listing'}
          </h3>
          {item.location && (
            <p className="text-sm text-gray-500 truncate">
              {item.location}
            </p>
          )}
        </div>
        
        {/* Optional earning indicator */}
        {earningList?.some(earning => earning.id === item.id) && (
          <div className="flex-shrink-0">
            <span className="text-green-500 text-sm font-medium">● Earnings</span>
          </div>
        )}
      </div>
    </div>
  );
};

ListingCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string,
    title: PropTypes.string,
    location: PropTypes.string
  }).isRequired
};

export default ListingCard;