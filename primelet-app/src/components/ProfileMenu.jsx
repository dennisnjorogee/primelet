import { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Avatar = ({ user, size = "md" }) => {
  const sizes = { sm: "w-7 h-7 text-xs", md: "w-9 h-9 text-sm", lg: "w-14 h-14 text-xl" };
  const cls = sizes[size] ?? sizes.md;
  const initials = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase() || "U";

  return user?.profileImage ? (
    <img
      src={user.profileImage}
      alt="Profile"
      className={`${cls} rounded-full object-cover ring-2 ring-blue-400`}
    />
  ) : (
    <div className={`${cls} rounded-full bg-blue-500 ring-2 ring-blue-300 flex items-center justify-center text-white font-bold`}>
      {initials}
    </div>
  );
};

const ProfileMenu = ({ open, onToggle, onClose }) => {
  const { authUser, logout_user } = useAppContext();
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const handleLogout = async () => {
    onClose();
    await logout_user();
    navigate("/login");
  };

  if (!authUser) {
    return (
      <div className="w-9 h-9 rounded-full bg-gray-300 animate-pulse" aria-label="Loading profile..." />
    );
  }

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        onClick={onToggle}
        className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full"
        aria-label="Open profile menu"
        aria-expanded={open}
      >
        <Avatar user={authUser} />
        <svg
          className={`w-4 h-4 text-white transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">

          {/* User card */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100">
            <Avatar user={authUser} size="lg" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {authUser?.firstName} {authUser?.lastName}
              </p>
              <p className="text-xs text-gray-400 truncate">{authUser?.emailAddress}</p>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-1">
            <Link
              to="/profile"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My Profile
            </Link>

            <Link
              to="/dashboard"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>
          </div>

          <div className="border-t border-gray-100 py-1">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export { Avatar };
export default ProfileMenu;