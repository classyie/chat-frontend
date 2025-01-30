import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/check");
            set({ authUser: response.data });
        } catch (error) {
            console.error("Error in checkAuth", error);
            set({ authUser: null });
            console.log("Fetched user data: ", response.data);
        }
        finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const response = await axiosInstance.post("/auth/signup", data);
            set({ authUser: response.data });
            toast.success("Signup Successful");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred during signup";
            toast.error(errorMessage);
        } finally {
            set({ isSigningUp: false });
        }
    },

    logout: async () =>{
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged Out");
        } catch (error) {
            console.error("Error in logout", error.response.data.message);
            toast.error("An error occurred during logout");
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosInstance.post("/auth/login", data);
            set({ authUser: response.data });
            toast.success("Login Successful");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred during login";
            toast.error(errorMessage);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    // Update Profile: Add your own logic here
    updateProfile: async (data) => {
        set({isUpdatingProfile: true});
        try {
            const response = await axiosInstance.put("/auth/update-profile", data);
            set({authUser: response.data});
            toast.success("Image uploaded successfully");

        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred during File upload";
            toast.error(errorMessage);
        }
        finally {
            set({isUpdatingProfile: false});
        }
    }

}))