import React from "react";
import { useChatStore } from "../store/useChatStore";
import SideBar from "../components/SideBar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div>
      <div className="h-screen bg-base-200">
        <div className="flex justify-center items-center pt-20 px-4">
          <div className="text-center bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]">
            <div className="flex h-full rounded-lg overflow-hidden">
              <SideBar />
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
