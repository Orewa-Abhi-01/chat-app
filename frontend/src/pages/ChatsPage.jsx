import useChatStore from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
// import MainSidebar from "../components/MainSidebar";
import { useRef } from "react";
import { Link } from "react-router-dom";

const ChatsPage = () => {
  const { selectedUser } = useChatStore();

  const chatContainerRef = useRef(null);
  return (
    <div className="h-dvh overflow-hidden">
      <Link to="/">
        <div>
          <h1 className="text-2xl font-semibold absolute top-4 left-4">
            Go Back
          </h1>
        </div>
      </Link>
      <div
        className=" chats-container bg-base-100 rounded-3xl shadow-xl w-full  mt-12
          max-w-full h-[calc(100vh-4.5rem)] "
      >
        <div className="flex justify-between p-4 max-w-9xl  h-full rounded-lg overflow-hidden gap-4 ">
          <div ref={chatContainerRef}>
            <Sidebar />
          </div>

          {/* <NoChatSelected /> */}
          {selectedUser ? <ChatContainer /> : <NoChatSelected />}
          {/* {!selectedUser ? <NoChatSelected /> : <ChatContainer />} */}
        </div>
      </div>
    </div>
  );
};

export default ChatsPage;

{
  /* <Sidebar /> */
}
{
  /* <MainSidebar /> */
}
{
  /* {selectedUser ? <ChatContainer /> : <NoChatSelected />} */
}

{
  /* <div className=" bg-base-100  rounded-3xl shadow-xl w-48 max-w h-[calc(100vh-4.5rem)] overflow-hidden">
<Link to="/chats">
  <div
    id="option-sidebar-container"
    className="flex items-center gap-2 p-4 hover:bg-base-300 cursor-pointer "
    onClick={handleChatContainerClick}
  >
    <svg
      viewBox="6 6 24 24"
      fill="currentColor"
      width="20"
      height="20"
      aria-hidden="true"
      className="xfx01vb x1lliihq x1tzjh5l"
      overflow="visible"
      style={{ "--color": "var(--icon-primary-color)" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29 17.504c0 6.103-4.606 10.57-11 10.57-1.065 0-2.08-.095-3.032-.327a4.26 4.26 0 0 0-2.39.09L8.91 28.962c-.59.202-1.164-.372-.964-.985l.729-2.411a3.007 3.007 0 0 0-.291-2.5C7.414 21.484 7 19.596 7 17.504v-.002c0-6.103 4.607-10.498 11-10.498S29 11.399 29 17.502v.002z"
      ></path>
    </svg>
    Chats
  </div>
</Link>

<Link to={"/notifications"}>
  <div className="flex items-center gap-2 p-4 hover:bg-base-300 cursor-pointer rounded-lg">
    <svg
      viewBox="6 6 24 24"
      fill="currentColor"
      width="20"
      height="20"
      aria-hidden="true"
      className="xfx01vb x1lliihq x1tzjh5l"
      overflow="visible"
      style={{ "--color": " var(--icon-primary-color)" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 28.074c6.394 0 11-4.467 11-10.57v-.002c0-6.103-4.606-10.498-11-10.498-6.392 0-10.998 4.395-11 10.498v.002c.001 2.091.415 3.98 1.384 5.562.458.747.563 1.664.29 2.5l-.728 2.41c-.2.614.373 1.188.964.986l3.668-1.125a4.26 4.26 0 0 1 2.39-.09c.953.232 1.967.327 3.032.327zM13 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm6.5-1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
      ></path>
    </svg>
    Notifications
  </div>
</Link>

<Link
  to="/settings"
  // className="flex items-center gap-2 p-4 hover:bg-base-300 cursor-pointer rounded-lg"
>
  <div className="flex items-center gap-2 p-4 hover:bg-base-300 cursor-pointer rounded-lg">
    <svg
      viewBox="6 6 24 24"
      fill="currentColor"
      width="16"
      height="16"
      className="xfx01vb x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq"
      overflow="visible"
      style={{ "--color": "var(--primary-icon)" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.842 7.526A1.5 1.5 0 0 0 18.419 6.5h-.838a1.5 1.5 0 0 0-1.423 1.026l-.352 1.056c-.157.472-.541.827-1.006 1.003a8.93 8.93 0 0 0-.487.202c-.453.204-.976.225-1.42.002l-.997-.498a1.5 1.5 0 0 0-1.732.281l-.592.592a1.5 1.5 0 0 0-.28 1.732l.497.996c.223.445.202.968-.002 1.421-.072.16-.139.323-.202.487-.176.465-.531.849-1.003 1.006l-1.056.352A1.5 1.5 0 0 0 6.5 17.581v.838a1.5 1.5 0 0 0 1.026 1.423l1.056.352c.472.157.827.541 1.003 1.006.063.164.13.327.202.487.204.453.225.976.002 1.42l-.498.997a1.5 1.5 0 0 0 .281 1.732l.593.592a1.5 1.5 0 0 0 1.73.28l.998-.497c.444-.223.967-.202 1.42.002.16.072.323.139.487.202.465.176.849.531 1.006 1.003l.352 1.056a1.5 1.5 0 0 0 1.423 1.026h.838a1.5 1.5 0 0 0 1.423-1.026l.352-1.056c.157-.472.541-.827 1.006-1.003.164-.063.327-.13.486-.202.454-.204.977-.225 1.421-.002l.997.498a1.5 1.5 0 0 0 1.732-.281l.592-.592a1.5 1.5 0 0 0 .28-1.732l-.497-.996c-.223-.445-.202-.968.002-1.421.072-.16.139-.323.202-.487.176-.465.531-.849 1.003-1.006l1.056-.352a1.5 1.5 0 0 0 1.026-1.423v-.838a1.5 1.5 0 0 0-1.026-1.423l-1.056-.352c-.472-.157-.827-.541-1.003-1.006a8.991 8.991 0 0 0-.202-.487c-.204-.453-.225-.976-.002-1.42l.498-.997a1.5 1.5 0 0 0-.281-1.732l-.593-.592a1.5 1.5 0 0 0-1.73-.28l-.998.497c-.444.223-.967.202-1.42-.002a8.938 8.938 0 0 0-.487-.202c-.465-.176-.849-.531-1.006-1.003l-.352-1.056zM18 23.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
      ></path>
    </svg>
    Settings
  </div>
</Link>

<Link to={"/profile"}>
  <div className="flex items-center gap-2 p-4 hover:bg-base-300 cursor-pointer rounded-lg">
    <img
      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZWx8ZW58MHx8MHx8fDA%3D"
      alt=""
      style={{
        height: "28px",
        width: "28px",
        objectFit: "cover",
        borderRadius: "50%",
      }}
    />
    Profile
  </div>
</Link>

<button onClick={logout}>
  <div className="flex items-center gap-2 p-4 hover:bg-base-300 cursor-pointer rounded-lg">
    <svg
      viewBox="6 6 24 24"
      fill="currentColor"
      width="16"
      height="16"
      className="xfx01vb x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq"
      overflow="visible"
      style={{ "--color": "var(--primary-icon)" }}
    >
      <path d="M21.498 14.75a1 1 0 0 0 1-1V12a4 4 0 0 0-4-4h-6.5a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h6.5a4 4 0 0 0 4-4v-1.75a1 1 0 0 0-1-1h-.5a1 1 0 0 0-1 1V24a1.5 1.5 0 0 1-1.5 1.5h-6.5a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5h6.5a1.5 1.5 0 0 1 1.5 1.5v1.75a1 1 0 0 0 1 1h.5z"></path>
      <path d="M14.498 16.75h9.752a.25.25 0 0 0 .25-.25v-1.858a1 1 0 0 1 1.643-.766l4.002 3.356a1 1 0 0 1 0 1.532l-4.002 3.357a1 1 0 0 1-1.643-.767V19.5a.25.25 0 0 0-.25-.25h-9.752a1 1 0 0 1-1-1v-.5a1 1 0 0 1 1-1z"></path>
    </svg>
    Logout
  </div>
</button>
</div> */
}
