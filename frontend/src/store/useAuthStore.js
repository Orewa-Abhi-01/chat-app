import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";
// import { get } from "mongoose";
import io from "socket.io-client";

const BASE_URL = import .meta.env.MODE === "development" ? "http://localhost:5001/api" : "/";
const useAuthStore = create((set, get) => ({
  authUser: null,   //bcz we don't know user is auth or not yet
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,
  onlineUsers: [],

  socket: null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
      get().connectSocket();
    } catch (error) {
      console.log("error in checkAuth", error);
      set({ authUser: null });

    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
      toast.success("User registered successfully"); 
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data });
      toast.success("User logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("User logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: response.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      const errorMsg = error.response? error.response.data.message : "Something went wrong";
      toast.error(errorMsg);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {

    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL,{
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    // socket.on("connect", () => {
    //   console.log("Socket connected", socket.id);
    // });

    socket.on("onlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    set({ socket:socket });
  },
  disconnectSocket: () => {
    // const { socket } = get();
    // if (socket) {
    //   socket.disconnect();
    //   set({ socket: null });
    // }
    if(get().socket?.connected){
      get().socket.disconnect();
    }
  },
}));

export default useAuthStore;
