import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Disclosure, Transition } from "@headlessui/react";
import { MdMenu, MdClose } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";

const Header = () => {
  const { usersData } = useContext(AuthContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = usersData[0];
  const isUserLoggedIn = usersData && usersData.length > 0;


  return (
    <header className="sticky top-0 z-50 bg-slate-300 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1200px-Airbnb_Logo_B%C3%A9lo.svg.png"
              className="w-20 md:w-32"
              alt="Airbnb Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Home</Link>
            <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Bookings</Link>
            <Link to="user-panel/listings" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">My Hosting</Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Contact</Link>
            
            {isUserLoggedIn ? (
              <div className="flex items-center space-x-4 ml-4">
                <Link to="/" className="px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                  Log Out
                </Link>
                <Link to="profile">
                  <img src={user.img} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-white hover:border-gray-200 transition-all" />
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4">
                <Link to="/login" className="px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                  Log In
                </Link>
                <Link to="/register" className="px-4 py-2 bg-rose-500 text-white rounded-full text-sm font-medium hover:bg-rose-600 transition-colors">
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {isUserLoggedIn && (
              <Link to="profile" className="flex-shrink-0">
                <img src={user.img} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
              </Link>
            )}
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    onClick={() => setMobileMenuOpen(!open)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
                    aria-label="Toggle menu"
                  >
                    {open ? <MdClose size={24} /> : <MdMenu size={24} />}
                  </Disclosure.Button>

                  {/* Mobile Menu Popup */}
                  <Transition
                    show={open}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Disclosure.Panel static className="absolute right-4 top-12 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-gray-400 ring-opacity-5 focus:outline-none z-50">
                      <div className="py-1 font-semibold text-gray-600">
                        <Link
                          to="/"
                          className="block px-4 py-2 text-sm  hover:bg-gray-100"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Home
                        </Link>
                        <Link
                          to="/"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Bookings
                        </Link>
                        <Link
                          to="user-panel/listings"
                          className="block px-4 py-2 text-sm  hover:bg-gray-100"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          My Hosting
                        </Link>
                        <Link
                          to="/contact"
                          className="block px-4 py-2 text-sm  hover:bg-gray-100"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Contact
                        </Link>
                        
                        <div className="border-t border-gray-200 my-1"></div>
                        
                        {isUserLoggedIn ? (
                          <>
                            <Link
                              to="profile"
                              className="block px-4 py-2 text-sm  hover:bg-gray-100"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              Profile
                            </Link>
                            <Link
                              to="/"
                              className="block px-4 py-2 text-sm  hover:bg-gray-100"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              Log Out
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              to="/login"
                              className="block px-4 py-2 text-sm  hover:bg-gray-100"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              Log In
                            </Link>
                            <Link
                              to="/register"
                              className="block px-4 py-2 text-sm  hover:bg-gray-100"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              Register
                            </Link>
                          </>
                        )}
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;