import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContext/authContext";
import { FaSignInAlt, FaSignOutAlt, FaUser, FaCalendarAlt, FaClipboardList, FaCog } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary)",
      cancelButtonColor: "var(--color-error)",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            toast.success("User Logout Successfully!");
            navigate("/");
            setMobileMenuOpen(false);
            setDropdownOpen(false);
          })
          .catch(() => {
            toast.error("Logout failed. Please try again.");
          });
      }
    });
  };

  const commonLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold flex items-center gap-2"
              : "text-main hover:text-secondary transition-colors flex items-center gap-2"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          <span>🏠</span> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold flex items-center gap-2"
              : "text-main hover:text-secondary transition-colors flex items-center gap-2"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          <FaCalendarAlt /> Events
        </NavLink>
      </li>
    </>
  );

  const loggedInLinks = (
    <>
      <li>
        <NavLink
          to="/create-event"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold flex items-center gap-2"
              : "text-main hover:text-secondary transition-colors flex items-center gap-2"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          <span>📅</span> Book Event
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myBookings"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold flex items-center gap-2"
              : "text-main hover:text-secondary transition-colors flex items-center gap-2"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          <FaClipboardList /> My Bookings
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/manageEvents"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold flex items-center gap-2"
              : "text-main hover:text-secondary transition-colors flex items-center gap-2"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          <FaCog /> Manage Events
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold flex items-center gap-2"
              : "text-main hover:text-secondary transition-colors flex items-center gap-2"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          <FaUser /> Profile
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-card border-b border-border-card text-main shadow-md">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-2xl font-title select-none text-primary hover:text-primary-dark transition-colors"
          >
            Athletic<span className="text-secondary">Hub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex space-x-8 items-center">
              {commonLinks}
              {user ? loggedInLinks : (
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary font-semibold flex items-center gap-2"
                        : "text-main hover:text-secondary transition-colors flex items-center gap-2"
                    }
                  >
                    <span>ℹ️</span> About
                  </NavLink>
                </li>
              )}
            </ul>

            <div className="flex items-center space-x-4">
              <ThemeToggle />

              {!user ? (
                <div className="flex space-x-3">
                  <Link
                    to="/login"
                    className="btn-outline flex items-center space-x-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    <FaSignInAlt />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={user.photoURL || "https://i.ibb.co/2YjZgZ8/default-user.png"}
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full border-2 cursor-pointer border-primary hover:border-secondary transition-colors"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    title={user.displayName || ""}
                  />
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-lg bg-card border border-border-card text-main shadow-xl z-50 p-4 text-sm">
                      <div className="text-center">
                        <img
                          src={user.photoURL}
                          alt={user.displayName}
                          className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-primary"
                        />
                        <p className="font-semibold">{user.displayName}</p>
                        <p className="text-xs text-muted mb-2">{user.email}</p>
                        <Link
                          to="/profile"
                          className="btn-primary w-full mb-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          View Profile
                        </Link>
                      </div>
                      <hr className="border-border-card my-3" />
                      <NavLink
                        to="/create-event"
                        className="block px-3 py-2 rounded hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
                        onClick={() => setDropdownOpen(false)}
                      >
                        📌 Book Event
                      </NavLink>
                      <NavLink
                        to="/myBookings"
                        className="block px-3 py-2 rounded hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
                        onClick={() => setDropdownOpen(false)}
                      >
                        📄 My Bookings
                      </NavLink>
                      <NavLink
                        to="/manageEvents"
                        className="block px-3 py-2 rounded hover:bg-primary hover:text-white transition-colors flex items-center gap-2"
                        onClick={() => setDropdownOpen(false)}
                      >
                        ⚙️ Manage Events
                      </NavLink>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full text-left text-error hover:bg-error-light rounded px-3 py-2 mt-2 transition-colors flex items-center gap-2"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <ThemeToggle />
            <button
              className="ml-4 p-2 rounded-md hover:bg-primary hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border-card bg-card text-main px-5 py-4 space-y-4 shadow-md">
          <ul className="space-y-4">
            {commonLinks}
            {user ? loggedInLinks : (
              <>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary font-semibold flex items-center gap-2 py-2"
                        : "text-main hover:text-secondary transition-colors flex items-center gap-2 py-2"
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>ℹ️</span> About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary font-semibold flex items-center gap-2 py-2"
                        : "text-main hover:text-secondary transition-colors flex items-center gap-2 py-2"
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaSignInAlt /> Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary font-semibold flex items-center gap-2 py-2"
                        : "text-main hover:text-secondary transition-colors flex items-center gap-2 py-2"
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>📝</span> Register
                  </NavLink>
                </li>
              </>
            )}
            {user && (
              <li>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="btn-outline w-full flex items-center justify-center gap-2 py-2 border border-error text-error rounded-lg hover:bg-error hover:text-white transition-colors"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;