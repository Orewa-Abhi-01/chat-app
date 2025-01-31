import { LogOut, Settings, User } from "react-feather";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <div id="header" className="shadow-md bg-white sticky top-0 z-50 "> 
      <header className="mx-auto w-[90%] max-w-7xl py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all">
            <div className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center">
              <img
                src="https://scontent.fixc1-8.fna.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=1-7&_nc_sid=f537c7&_nc_ohc=fd_JDjKK0BkQ7kNvgEgMqxA&_nc_zt=14&_nc_ht=scontent.fixc1-8.fna&_nc_gid=AHRs2jwVeBBFbsqV65S_3AV&oh=00_AYDnyRWjec89EWjitzk2R-YW2C2B8engEqWXhTfR0bY84Q&oe=679BF8BD"
                alt="logo"
                className="w-8 h-8"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Messenger</h1>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/settings" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
              <Settings className="w-5 h-5" />
              <span className="hidden md:inline text-sm">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline text-sm">Profile</span>
                </Link>

                <button
                  className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors"
                  onClick={logout}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden md:inline text-sm">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
