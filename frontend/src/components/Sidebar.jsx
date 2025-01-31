import { useEffect, useState } from "react";
import useChatStore from "../store/useChatStore";
import useAuthStore from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full p-2 bg-blue-600 w-28 rounded-3xl shadow-2xl lg:w-72 border-r border-slate flex flex-col transition-all duration-200">
      {/* Header Section */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-8" />
          <span className="font-bold text-2xl text-white hidden lg:block">
            Chats
          </span>
        </div>

        {/* Online Filter Toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm border-2 border-white"
            />
            <span className="text-sm text-base-300">Show online only</span>
          </label>
          <span className="text-xs text-zinc-100">(online)</span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors rounded-3xl
              ${
                selectedUser?._id === user._id
                  ? "bg-base-100 ring-1 ring-base-300"
                  : ""
              }
            `}
          >
            {/* User Avatar */}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic}
                alt={user.name}
                className="size-12 object-cover rounded-full border-2 border-slate"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User Info - Hidden on Small Screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-bold truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-800">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {/* No Online Users Message */}
        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-100 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;