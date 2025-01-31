import useChatStore from "../store/useChatStore";
import { useEffect, useRef } from "react";
// import axiosInstance from "../lib/axios";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import useAuthStore from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
// import toast from "react-hot-toast";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    deleteMessage,
    // forwardMessage: forwardMessageFromStore,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  // const getUserIdByFullName = async (fullName) => {
  //   try {
  //     const response = await axiosInstance.get(`/users?fullName=${fullName}`);
  //     return response.data._id;
  //   } catch (error) {
  //     console.log("Error fetching user ID:", error);
  //     toast.error("Failed to fetch user ID");
  //     return null;
  //   }
  // };

  // const forwardMessage = async (message) => {
  //   const recipientFullName = prompt("Enter the recipient's full name:");
  //   if (recipientFullName) {
  //     const recipientId = await getUserIdByFullName(recipientFullName);
  //     if (recipientId) {
  //       forwardMessageFromStore(message, recipientId);
  //     } else {
  //       toast.error("User not found");
  //     }
  //   }
  // };

  // Scroll to the bottom of the chat container when a new message is added
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto rounded-3xl shadow-2xl">
      {/* Chat Header */}
      <ChatHeader />

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-300">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            {/* User Avatar */}
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser && selectedUser._id === message.senderId
                      ? selectedUser.profilePic || "/avatar.png"
                      : "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>

            {/* Message Header */}
            <div className="chat-header">
              {message.senderId === authUser._id
                ? "You"
                : selectedUser.fullName}
              <time className="text-sm text-black opacity-50 ml-2">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>

            {/* Message Content */}
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="max-w-full sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              <div>{message.text && <p>{message.text}</p>}</div>
            </div>

            {/* Message Actions (Delete and Forward) */}
            {message.senderId === authUser._id && (
              <div className="flex gap-2">
                <button
                  className="text-red-500 mt-2 pr-2 text-xs border-r border-black"
                  onClick={() => deleteMessage(message._id)}
                >
                  Delete
                </button>
                {/* <button
                  className="text-blue-500 mt-2 text-xs"
                  onClick={() => forwardMessage(message)}
                >
                  Forward
                </button> */}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;