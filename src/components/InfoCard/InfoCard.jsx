import { Link } from "react-router-dom";

const InfoCard = ({ data, showLocation = true, showDate = true, showPrice = true }) => {
  const { _id, id, price, date, location, image, title, description } = data;

  // Function to truncate description to 4 lines
  const truncateDescription = (text) => {
    if (!text) return '';
    const lines = text.split('\n');
    const firstFourLines = lines.slice(0, 4).join('\n');
    return firstFourLines;
  };

  return (
    <div className="w-full max-w-xs md:max-w-md lg:max-w-md p-4">
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
        <Link to={`/reservation/${_id || id}`}>
          <img
            src={image}
            alt={`Image for ${title || "Reservation"}`}
            className="w-full h-48 md:h-64 object-cover rounded-md mb-4"
          />
        </Link>

        {showLocation && (
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Location:</span> {location}
          </p>
        )}
        {showDate && (
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Date:</span> {date}
          </p>
        )}
        {showPrice && (
          <p className="text-gray-800 font-semibold text-lg mb-2">
            Price: ${price}
          </p>
        )}
        {title && (
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        )}
        {description && (
          <div className="text-gray-600 whitespace-pre-line line-clamp-4">
            {truncateDescription(description)}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard;