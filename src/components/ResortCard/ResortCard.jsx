import { Link } from "react-router-dom";

const ResortCard = ({ data }) => {
  const { id, title, price, date, location, image } = data;

  return (
    <div className="w-full">
      <Link to={`/resort/${id}`} className="block group">
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* Image with hover effect */}
          <div className="relative overflow-hidden aspect-[4/3]">
            <img 
              src={image} 
              alt={`${location} resort`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Price badge */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
              <span className="font-bold text-blue-600">{price}</span>
              
            </div>
          </div>

          {/* Card content */}
          <div className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{title}</h3>
              {/* Rating would go here */}
            </div>

            <div className="flex justify-between items-start">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{location}</h3>
              {/* Rating would go here */}
            </div>
            
            <p className="text-gray-500 text-sm mt-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {date}
            </p>

            <div className="mt-3 flex justify-between items-center">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                View details
              </button>
              {/* Save/favorite button */}
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ResortCard;