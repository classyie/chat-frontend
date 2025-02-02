import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const SideBar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filterUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;
  const handleToggleOnlineOnly = () => setShowOnlineOnly(!showOnlineOnly);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;
  return (
      <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
        <div className="border-b border-base-300 w-full p-5">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={handleToggleOnlineOnly}
              className="checkbox rounded-sm"
            />
            <span className="text-sm">Show Online Only</span>
          </label>
          <span className="text-xs text-zinc-500">{onlineUsers.length - 1} online</span>
        </div>
        <div className="overflow-y-auto w-full py-3">
          {filterUsers.map((user) => {
            const isActive = selectedUser?.id === user.id;
            return (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`
                    w-full p-3 flex items-center gap-3
                    hover:bg-base-300  hover:cursor-pointer transition-colors
                    ${
                      selectedUser?._id === user._id
                        ? "bg-base-300 ring-1 ring-base-300"
                        : ""
                    }
                  `}
              >
                <div className="relative mx-auto lg:mx-0">
                  <img
                    src={user.profilePicture || "/avatar.png"}
                    alt={user.fullName}
                    className={`rounded-full size-12  object-cover${
                      isActive ? "border-2 border-base-300" : ""
                    }`}
                  />
                  {onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900">
                      {" "}
                    </span>
                  )}
                </div>
                {/* user online status */}
                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-medium truncate">{user.fullName}</div>
                  <div className="text-sm text-zinc-400">
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </div>
                </div>
              </button>
            );
          })}
          {filterUsers.length === 0 && (
            <div className="text-center text-sm text-zinc-400">No online users found</div>
          )}
        </div>
      </aside>
  );
};

export default SideBar;
