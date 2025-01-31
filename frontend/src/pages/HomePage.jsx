import {  useRef } from "react";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";
import useChatStore from "../store/useChatStore";
// import { Link } from "react-router-dom";
// import useAuthStore from "../store/useAuthStore";

const HomePage = () => {
  // const [showChatContainer, setShowChatContainer] = useState(false);
  const { selectedUser } = useChatStore();
  const chatContainerRef = useRef(null);


  return (
    <div className="h-dvh bg-blue-400">
      <div className="flex flex-col md:flex-row items-center justify-between pt-4 px-4 gap-4">
       

        {/* Main Chat Container */}
        <div className="bg-base-100 rounded-3xl shadow-xl w-full h-[calc(100vh-4.5rem)]">
          <div className="flex justify-between p-4 max-w-9xl h-full rounded-lg overflow-hidden gap-4">
            <div ref={chatContainerRef} className="w-full md:w-auto">
              <Sidebar />
            </div>

            {selectedUser ? <ChatContainer /> : <NoChatSelected />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;