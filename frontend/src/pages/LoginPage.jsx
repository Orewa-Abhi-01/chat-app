import { Loader2, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggingIn, login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="bg-gradient-to-br from-blue-700 to-purple-800 flex items-center justify-center min-h-screen p-4 sm:p-8">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center gap-10 p-6 rounded-3xl shadow-xl backdrop-blur-md">
        {/* Left side */}
        <div className="flex flex-col items-center text-center lg:text-left p-6 rounded-3xl bg-white shadow-2xl w-full lg:w-1/2">
          <h1 className="text-4xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
            A Space for Genuine Connections
          </h1>
          <h3 className="text-xl mt-4">
            Connect with your friends and family, build your community, and deepen your interests.
          </h3>
          <div className="mt-4">
            <img
              src="https://scontent.fixc1-8.fna.fbcdn.net/v/t39.8562-6/464194964_918739083469786_5620917285767761514_n.png?_nc_cat=1&ccb=1-7&_nc_sid=f537c7&_nc_ohc=3gejMgLjI_EQ7kNvgF4BwST&_nc_zt=14&_nc_ht=scontent.fixc1-8.fna&_nc_gid=AHRs2jwVeBBFbsqV65S_3AV&oh=00_AYCHUS2qRaiatWpp9HZOyvbTAU_2X89ujwdRIU1GWTatPg&oe=679BF2FB"
              alt="login image"
              className="w-60 md:w-80"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col justify-center items-center p-6 w-full lg:w-1/2">
          <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
            <div className="text-center mb-6">
              <img
                src="https://scontent.fixc1-8.fna.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=1-7&_nc_sid=f537c7&_nc_ohc=fd_JDjKK0BkQ7kNvgEgMqxA&_nc_zt=14&_nc_ht=scontent.fixc1-8.fna&_nc_gid=AHRs2jwVeBBFbsqV65S_3AV&oh=00_AYDnyRWjec89EWjitzk2R-YW2C2B8engEqWXhTfR0bY84Q&oe=679BF8BD"
                alt="logo"
                className="w-12 h-12 mx-auto"
              />
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-lg text-gray-600">Sign in to your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="johndoe@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
                </button>
              </div>

              <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
                {isLoggingIn ? <Loader2 className="animate-spin" /> : "Sign in"}
              </button>
            </form>

            <p className="text-center mt-4 text-sm text-gray-600">
              Don&apos;t have an account? <Link to="/signup" className="text-blue-500">Create account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
