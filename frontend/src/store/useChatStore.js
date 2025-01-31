import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import useAuthStore from "./useAuthStore";

const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  groups: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isGroupsLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
      console.log(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getGroups: async () => {
    set({ isGroupsLoading: true });
    try {
      // const res = await axiosInstance.get("/messages/groups");
      const res = await axiosInstance.get("/groups");
      set({ groups: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isGroupsLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  deleteMessage: async (messageId) => {
    try {
      await axiosInstance.delete(`/messages/${messageId}`);
      set({
        messages: get().messages.filter((message) => message._id !== messageId),
      });
      toast.success("Message deleted successfully");

      //Emit the messageDeleted event 
      const socket = useAuthStore.getState().socket;
      socket.emit("messageDeleted", messageId);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  forwardMessage: async (message, recipientId) => {
    try {
      const newMessage = {
        ...message,
        receiverId: recipientId,
        senderId: get().authUser._id,
        _id: undefined, // Remove the existing ID to create a new message
      };
      const response = await axiosInstance.post('/messages', newMessage);
      set({
        messages: [...get().messages, response.data],
      });
      toast.success("Message forwarded successfully");
  
      // Emit the newMessage event
      const socket = useAuthStore.getState().socket;
      socket.emit("newMessage", response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  //realtime --->
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    // Listen for new messages:
    socket.on("newMessage", (newMessage) => {
      console.log("newMessage", newMessage);
      
      const isMsgSentToSelectedUser =
        newMessage.senderId === selectedUser._id ||
        newMessage.receiverId === selectedUser._id;
      if (!isMsgSentToSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });

      // Listen for deletion of messages on the basis of msgId
      socket.on("messageDeleted", (messageId) => {
        console.log("deleted message id: ", messageId);
        set({
          messages: get().messages.filter(
            (message) => message._id !== messageId
          ),
        });
      });

    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  //to-do:optimization required for the below function
  setSelectedUser: (user) => set({ selectedUser: user }),
}));

export default useChatStore;
