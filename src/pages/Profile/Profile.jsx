import { useContext } from "react";
import { TbGenderFemale } from "react-icons/tb";
import { SlGraduation } from "react-icons/sl";
import { MdWorkOutline } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { MdOutlinePets } from "react-icons/md";
import { MdOutlineLightbulbCircle } from "react-icons/md";
import { MdOutlineRoomService } from "react-icons/md";
import { FaStar } from 'react-icons/fa';
import { AuthContext } from "../../provider/AuthProvider";
import Loading from "../../components/Loading";

const Profile = () => {
  const { usersData } = useContext(AuthContext);

  if (!usersData || usersData.length === 0) {
    return <Loading />;
  }

  const user = usersData[0];

  if (!user) {
    return <p className="text-center p-8">Data is not available</p>;
  }

  const { name, img, title, reviewsCount, rating, hostingCount, gender, education, work, uniqueHomeFeature, funFact, pets, guestInteractions, about } = user;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              className="rounded-full w-20 h-20 sm:w-24 sm:h-24 object-cover border-4 border-white shadow-md"
              src={img}
              alt={name}
            />
          </div>

          {/* Profile Info */}
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
            <p className="text-gray-600 mb-4">{title}</p>
            
            {/* Stats */}
            <div className="flex justify-center sm:justify-start gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold">{reviewsCount}</p>
                <p className="text-sm text-gray-500">Reviews</p>
              </div>
              <div className="text-center">
                <p className="flex items-center justify-center text-2xl font-bold">
                  {rating} <FaStar className="text-yellow-400 ml-1" />
                </p>
                <p className="text-sm text-gray-500">Rating</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{hostingCount}</p>
                <p className="text-sm text-gray-500">Years Hosting</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">About</h2>
        
        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <TbGenderFemale className="text-xl mt-1 text-gray-500 flex-shrink-0" />
            <p className="text-gray-700">{gender}</p>
          </div>

          <div className="flex items-start gap-3">
            <SlGraduation className="text-xl mt-1 text-gray-500 flex-shrink-0" />
            <p className="text-gray-700">Where I went to school: {education}</p>
          </div>

          <div className="flex items-start gap-3">
            <MdWorkOutline className="text-xl mt-1 text-gray-500 flex-shrink-0" />
            <p className="text-gray-700">My work: {work}</p>
          </div>

          <div className="flex items-start gap-3">
            <BsStars className="text-xl mt-1 text-gray-500 flex-shrink-0" />
            <p className="text-gray-700">What makes my home unique: {uniqueHomeFeature}</p>
          </div>

          <div className="flex items-start gap-3">
            <MdOutlineLightbulbCircle className="text-xl mt-1 text-gray-500 flex-shrink-0" />
            <p className="text-gray-700">Fun fact: {funFact}</p>
          </div>

          <div className="flex items-start gap-3">
            <MdOutlinePets className="text-xl mt-1 text-gray-500 flex-shrink-0" />
            <p className="text-gray-700">Pets: {pets}</p>
          </div>

          <div className="flex items-start gap-3">
            <MdOutlineRoomService className="text-xl mt-1 text-gray-500 flex-shrink-0" />
            <p className="text-gray-700">For guests, I always: {guestInteractions}</p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">More about me</h3>
          <p className="text-gray-700 leading-relaxed">{about}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;