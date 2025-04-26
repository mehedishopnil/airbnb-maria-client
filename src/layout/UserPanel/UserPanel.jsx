import { Link, Outlet } from "react-router-dom";
import { Disclosure, Transition } from "@headlessui/react";
import { MdOutlineLuggage, MdMenu, MdClose, MdAddHome } from "react-icons/md";
import { LiaMoneyBillSolid } from "react-icons/lia";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { PiBookOpenText } from "react-icons/pi";
import { FaHome, FaUser } from "react-icons/fa";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Loading from "../../components/Loading";

const UserPanel = () => {
  const { loading } = useContext(AuthContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  const navItems = [
    { to: "listings", icon: <HiOutlineHomeModern size={20} />, text: "Listings" },
    { to: "reservation", icon: <MdOutlineLuggage size={20} />, text: "Reservations" },
    { to: "earnings", icon: <LiaMoneyBillSolid size={20} />, text: "Earnings" },
    { to: "insights", icon: <TbBrandGoogleAnalytics size={20} />, text: "Insights" },
    { to: "guide-books", icon: <PiBookOpenText size={20} />, text: "Guidebooks" },
    { to: "create-new-list", icon: <MdAddHome size={20} />, text: "Create a new list" },
    { divider: true },
    { to: "/", icon: <FaHome size={18} />, text: "Home" },
    { to: "/profile", icon: <FaUser size={18} />, text: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-20 flex items-center justify-between p-4 bg-white shadow-sm">
        <Link to="/">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1200px-Airbnb_Logo_B%C3%A9lo.svg.png" 
            className="w-28" 
            alt="Airbnb Logo" 
          />
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>

      {/* Main Layout */}
      <div className="lg:flex">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block lg:w-64 lg:flex-shrink-0 bg-white border-r border-gray-200">
          <div className="p-5">
            <Link to="/">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1200px-Airbnb_Logo_B%C3%A9lo.svg.png" 
                className="w-32" 
                alt="Airbnb Logo" 
              />
            </Link>
          </div>

          <nav className="mt-2 px-4">
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                item.divider ? (
                  <div key={`divider-${index}`} className="border-t border-gray-200 my-3"></div>
                ) : (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span className="font-medium">{item.text}</span>
                    </Link>
                  </li>
                )
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Menu */}
        <Transition
          show={isMobileMenuOpen}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 -translate-x-full"
          enterTo="opacity-100 translate-x-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 -translate-x-full"
          className="lg:hidden fixed inset-0 z-10 bg-white"
        >
          <div className="p-4">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900"
              >
                <MdClose size={24} />
              </button>
            </div>
            <nav>
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  item.divider ? (
                    <div key={`divider-${index}`} className="border-t border-gray-200 my-3"></div>
                  ) : (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="mr-3">{item.icon}</span>
                        <span className="font-medium">{item.text}</span>
                      </Link>
                    </li>
                  )
                ))}
              </ul>
            </nav>
          </div>
        </Transition>

        {/* Content area */}
        <div className="flex-1">
          <div className="p-4 sm:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;