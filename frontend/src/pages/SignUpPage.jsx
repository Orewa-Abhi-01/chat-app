import {  User, Lock, Mail, Eye, EyeOff } from "react-feather";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useAuthStore from "../store/useAuthStore.js";

import { useState } from "react";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isSigningUp } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) {
      signUp(formData);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-purple-800 p-4 sm:p-8">
    <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 bg-white/10 p-6 rounded-3xl shadow-xl backdrop-blur-md">
      {/* Left Side */}
      <div className="flex flex-col items-center text-center p-6 text-white">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">Join the Community</h1>
        <h3 className="text-base mt-4">
          Create your account to connect with friends, explore communities, <br /> and share your moments.
        </h3>
        <div className="flex justify-center mt-6">
        <img
                src="https://scontent.fixc1-8.fna.fbcdn.net/v/t39.8562-6/464194964_918739083469786_5620917285767761514_n.png?_nc_cat=1&ccb=1-7&_nc_sid=f537c7&_nc_ohc=3gejMgLjI_EQ7kNvgF4BwST&_nc_zt=14&_nc_ht=scontent.fixc1-8.fna&_nc_gid=AHRs2jwVeBBFbsqV65S_3AV&oh=00_AYCHUS2qRaiatWpp9HZOyvbTAU_2X89ujwdRIU1GWTatPg&oe=679BF2FB"
                alt="signup image"
                width={300}
                height={300}
              />
        </div>
      </div>
      {/* Right Side */}
      <div className="w-full flex flex-col justify-center items-center p-6 sm:p-12 bg-cover bg-center bg-white rounded-3xl">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <img
                    src="https://scontent.fixc1-8.fna.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=1-7&_nc_sid=f537c7&_nc_ohc=fd_JDjKK0BkQ7kNvgEgMqxA&_nc_zt=14&_nc_ht=scontent.fixc1-8.fna&_nc_gid=AHRs2jwVeBBFbsqV65S_3AV&oh=00_AYDnyRWjec89EWjitzk2R-YW2C2B8engEqWXhTfR0bY84Q&oe=679BF8BD"
                    alt="logo"
                    width={34}
                    height={34}
                  />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base ">
                Get started with your free account
              </p>
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 p-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-medium">Email</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="johndoe@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-10 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/70">
              Already have an account?{" "}
              <Link to="/login" className="link text-blue-600 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>


      {/* Right side (optional) */}
      
      {/* <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      /> */}
    </div>
    </div>
  );
};

export default SignUpPage;
