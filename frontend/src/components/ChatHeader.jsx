import { X } from "lucide-react";
import  useAuthStore  from "../store/useAuthStore";
import  useChatStore  from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar cursor-pointer">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div className="text-zinc-800 font-bold">
            <h3 className="font-bold text-zinc-800 cursor-pointer">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70 cursor-pointer">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button style={{ color: "black" ,marginRight:"20px"}} onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;