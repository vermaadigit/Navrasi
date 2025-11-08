import { useState, FormEvent, ChangeEvent, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import axios, { AxiosError } from "../utils/axios";
import { motion } from "framer-motion";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface ErrorResponse {
  message: string;
}

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState<string>(user?.name || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(
    user?.avatar || ""
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState<boolean>(false);

  // Generate default avatar SVG with gradient
  const getDefaultAvatar = () => {
    const userName = user?.name || "User";
    const initials = userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
    
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23d97706;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23b45309;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='200' height='200' fill='url(%23grad)'/%3E%3Ctext x='100' y='100' font-family='Arial, sans-serif' font-size='80' font-weight='300' fill='white' text-anchor='middle' dominant-baseline='central'%3E${initials}%3C/text%3E%3C/svg%3E`;
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      setAvatarFile(file);
      setImageError(false);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      await updateProfile(formData);
      setSuccess("Profile updated successfully!");
      setAvatarFile(null);
      setImageError(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ErrorResponse>;
        setError(
          axiosError.response?.data?.message || "Failed to update profile"
        );
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getAvatarSrc = () => {
    if (avatarPreview && avatarFile) {
      return avatarPreview;
    }
    if (imageError || !user?.avatar) {
      return getDefaultAvatar();
    }
    return user.avatar;
  };

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <Header />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-28 max-w-3xl">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-widest text-amber-700 mb-3 font-medium">
            Account Settings
          </p>
          <h1 className="text-4xl sm:text-5xl font-light text-stone-900 tracking-tight">
            My Profile
          </h1>
          <p className="text-stone-600 font-light mt-2">
            Manage your account information and preferences
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white border border-stone-200 rounded-sm p-8 md:p-12"
        >
          {/* Success Message */}
          {success && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-sm"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-sm flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-light text-green-800">{success}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-sm flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-light text-red-800">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Avatar Upload */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-700 mb-6 font-medium">
                Profile Picture
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="relative group">
                  {/* Avatar Image */}
                  <img
                    src={getAvatarSrc()}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-2 border-stone-200 shadow-lg"
                    onError={handleImageError}
                  />
                  
                  {/* Success Badge */}
                  {avatarFile && (
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                  
                  {/* Edit Overlay */}
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="absolute inset-0 bg-stone-900/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="px-6 py-3 bg-stone-900 text-white rounded-sm font-light tracking-wide hover:bg-stone-800 transition-all mb-3"
                  >
                    Change Picture
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <p className="text-xs text-stone-500 mb-2 font-light">
                    JPG, PNG or GIF (Max 5MB)
                  </p>
                  {avatarFile && (
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <p className="text-xs text-green-700 font-light">
                        New image selected
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs uppercase tracking-wider text-stone-700 mb-3 font-medium"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-300 focus:bg-white transition-all font-light"
                required
              />
            </div>

            {/* Email (Read-only) */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs uppercase tracking-wider text-stone-700 mb-3 font-medium"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={user?.email || ""}
                disabled
                className="w-full px-4 py-3 bg-stone-100 border border-stone-200 rounded-sm text-stone-500 cursor-not-allowed font-light"
              />
              <p className="text-xs text-stone-500 mt-2 flex items-center gap-2 font-light">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Email cannot be changed
              </p>
            </div>

            {/* Account Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Auth Provider */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-700 mb-3 font-medium">
                  Account Type
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-stone-50 border border-stone-200 rounded-sm">
                  {user?.authProvider === "google" ? (
                    <>
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span className="text-stone-900 font-light">Google Account</span>
                    </>
                  ) : (
                    <>
                      <div className="w-6 h-6 bg-stone-200 rounded-sm flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-stone-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                          />
                        </svg>
                      </div>
                      <span className="text-stone-900 font-light">Email & Password</span>
                    </>
                  )}
                </div>
              </div>

              {/* Role Badge */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-700 mb-3 font-medium">
                  Role
                </label>
                <div className="px-4 py-3 bg-stone-50 border border-stone-200 rounded-sm">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-light ${
                      user?.role === "admin"
                        ? "bg-amber-100 text-amber-900"
                        : "bg-stone-200 text-stone-900"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${
                      user?.role === "admin" ? "bg-amber-600" : "bg-stone-600"
                    }`}></span>
                    {user?.role === "admin" ? "Administrator" : "Member"}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-stone-900 text-white rounded-sm font-light tracking-wide hover:bg-stone-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Updating Profile...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </form>

          {/* Account Stats */}
          <div className="mt-8 pt-8 border-t border-stone-200">
            <h3 className="text-xs uppercase tracking-wider text-stone-700 mb-4 font-medium">
              Account Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="px-4 py-3 bg-stone-50 border border-stone-200 rounded-sm">
                <p className="text-xs text-stone-500 mb-1 font-light">Member Since</p>
                <p className="text-sm font-light text-stone-900">
                  {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
              <div className="px-4 py-3 bg-stone-50 border border-stone-200 rounded-sm">
                <p className="text-xs text-stone-500 mb-1 font-light">Account Status</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <p className="text-sm font-light text-green-700">Active</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;