// // import { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

// const NotificationSection = () => {
//     // const [notifications, setNotifications] = useState([]);

//     // useEffect(() => {
//     //     const newNotifications = messages.reduce((acc, message) => {
//     //         const sender = message.sender;
//     //         if (!acc[sender]) {
//     //             acc[sender] = 0;
//     //         }
//     //         acc[sender]++;
//     //         return acc;
//     //     }, {});

//     //     const formattedNotifications = Object.keys(newNotifications).map(sender => ({
//     //         sender,
//     //         count: newNotifications[sender]
//     //     }));

//     //     setNotifications(formattedNotifications);
//     // }, [messages]);

//     return (
//         <div className="notification-section">
//             {/* {notifications.map((notification, index) => ( */}
//                 <div  className="notification">
//                     <p>You have received  message(s) from </p>
//                 </div>
//             {/* ))} */}
//         </div>
//     );
// };

// export default NotificationSection;

// import React from 'react'

function NotificationSection() {
  return (
    <div className="h-dvh rounded-3xl shadow-xl  max-w  overflow-hidden">
      <Link to="/">
        <div>
          <h1 className="text-2xl font-semibold absolute top-4 left-4">
            Go Back
          </h1>
        </div>
      </Link>
      
      <div className="h-[calc(100vh-100px)] pt-20 bg-blue-400 ">
      <h1>Notification Section</h1>
      </div>
    </div>
  );
}

export default NotificationSection;
