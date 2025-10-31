import { useState, FormEvent, ChangeEvent, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import axios, { AxiosError } from "../utils/axios";
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
    
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%238B5CF6;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23EC4899;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='200' height='200' fill='url(%23grad)'/%3E%3Ctext x='100' y='100' font-family='Arial, sans-serif' font-size='80' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='central'%3E${initials}%3C/text%3E%3C/svg%3E`;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Header />
      
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl bottom-20 -right-20 animate-pulse delay-1000"></div>
      </div>

      <div className="profile-container mx-auto px-4 py-12 max-w-3xl relative z-10">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <h1 className="text-4xl font-bold text-white">My Profile</h1>
          </div>
          <p className="text-gray-400 ml-7">Manage your account settings and preferences</p>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-green-400"
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
                  <p className="text-sm font-medium text-green-400">{success}</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-red-400"
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
                  <p className="text-sm font-medium text-red-400">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Avatar Upload */}
            <div>
              <label className="block text-sm font-semibold text-white mb-6">
                Profile Picture
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="relative group">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  
                  {/* Avatar Image */}
                  <img
                    src={getAvatarSrc()}
                    alt="Profile"
                    className="relative w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                    onError={handleImageError}
                  />
                  
                  {/* Success Badge */}
                  {avatarFile && (
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-lg">
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
                    className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all mb-3"
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
                  <p className="text-xs text-gray-400 mb-2">
                    JPG, PNG or GIF (Max 5MB)
                  </p>
                  {avatarFile && (
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-xs text-green-400 font-medium">
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
                className="block text-sm font-semibold text-white mb-3"
              >
                Full Name
              </label>
              <div className="relative group">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                  required
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              </div>
            </div>

            {/* Email (Read-only) */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-white mb-3"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={user?.email || ""}
                disabled
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Email cannot be changed
              </p>
            </div>

            {/* Account Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Auth Provider */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Account Type
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
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
                      <span className="text-white font-medium">Google Account</span>
                    </>
                  ) : (
                    <>
                      <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <span className="text-white font-medium">Email & Password</span>
                    </>
                  )}
                </div>
              </div>

              {/* Role Badge */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Role
                </label>
                <div className="px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${
                      user?.role === "admin"
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30"
                        : "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-500/30"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${
                      user?.role === "admin" ? "bg-purple-400" : "bg-blue-400"
                    }`}></span>
                    {user?.role === "admin" ? "Administrator" : "Customer"}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative px-6 py-4 text-white font-semibold flex items-center justify-center gap-2">
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
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Save Changes</span>
                  </>
                )}
              </div>
              {!loading && (
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur-xl"></div>
              )}
            </button>
          </form>

          {/* Account Stats */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <h3 className="text-sm font-semibold text-white mb-4">Account Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <p className="text-xs text-gray-400 mb-1">Member Since</p>
                <p className="text-sm font-semibold text-white">
                  {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
              <div className="px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <p className="text-xs text-gray-400 mb-1">Account Status</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <p className="text-sm font-semibold text-green-400">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;