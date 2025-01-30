import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await axiosInstance.get("messages/users");
            set({ users: response.data.users });
            // console.log(response.data);
        } catch (error) {
            toast.error("Failed to fetch users");
        }
        finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessageLoading: true });
        try {
            const response = await axiosInstance.get(`messages/${userId}`);
            set({ messages: response.data });
        } catch (error) {
            toast.error("Failed to fetch messages");
        }
        finally {
            set({ isMessageLoading: false });
        }
    },
    setSelectedUser: (selectedUser) => {
        set({ selectedUser: selectedUser });
    },
}));