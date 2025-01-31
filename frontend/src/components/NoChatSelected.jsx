// import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-300/50 shadow-2xl rounded-3xl">
      
      <div className="max-w-md text-center animate-bounce">
        {/* Icon Display */}
        <div className="flex justify-center gap-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center mb-4"
            >
              <img
                src="https://scontent.fixc1-8.fna.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=1-7&_nc_sid=f537c7&_nc_ohc=fd_JDjKK0BkQ7kNvgEgMqxA&_nc_zt=14&_nc_ht=scontent.fixc1-8.fna&_nc_gid=AHRs2jwVeBBFbsqV65S_3AV&oh=00_AYDnyRWjec89EWjitzk2R-YW2C2B8engEqWXhTfR0bY84Q&oe=679BF8BD"
                alt="logo"
                width={34}
                height={34}
              />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl font-bold  ">Welcome to Messenger !</h2>
        <p className="text-black text-medium">
          Select a conversation from the sidebar to start chatting <span className="text-lg">🗨️</span>
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
