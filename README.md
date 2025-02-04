Realtime Chat Application


A real-time chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and Socket.io for instant messaging. This application supports private and group chats, secure user authentication with JWT, and image sharing with Cloudinary.

Features
Real-Time Messaging: Instant communication using Socket.io for real-time updates.
Private & Group Chats: Send messages to individual users or create group chats.
User Authentication: Secure login and registration using JWT (JSON Web Token).
Image Uploading: Users can upload and share images using Cloudinary.
Message Management: Features for message deletion and emoji reactions to enhance user experience.
Responsive UI: Designed using Tailwind CSS and Daisy UI components for a clean, modern interface.
Technologies Used
Frontend:

React.js
Socket.io-client
Tailwind CSS (for styling)
Daisy UI (for pre-built components)
JWT (for user authentication)
Backend:

Node.js with Express.js
Socket.io (for real-time communication)  
MongoDB (for storing user data and messages)
Cloudinary (for image upload and sharing)
Installation
1. Clone the Repository

git clone https://github.com/your-username/realtime-chat-app.git
cd realtime-chat-app

2. Install Dependencies
Backend
Navigate to the backend directory and install dependencies:

cd backend
npm install
Frontend
Navigate to the frontend directory and install dependencies:

bash
Copy
cd frontend
npm install
3. Environment Variables
Create a .env file in both backend and frontend directories with the following variables:

Backend (.env)

MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret Key>
CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
CLOUDINARY_API_KEY=<Your Cloudinary API Key>
CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
Frontend (.env)


REACT_APP_SOCKET_SERVER_URL=http://localhost:5000
4. Start the Application
Backend
Start the backend server:


cd backend
npm start
Frontend
Start the frontend development server:


cd frontend
npm start
The app will be running on http://localhost:3000 by default.

Usage
Register: Create a new user account using the registration form.
Login: Use your credentials to log in and access the chat.
Start Chatting: Join public chat rooms or create private/group chats.
Send Messages: Type and send messages to individual users or groups.
Send Images: Upload and share images directly in the chat.
Emoji Reactions: React to messages with emojis.
Delete Messages: Remove any messages you've sent from the chat.
Screenshots
Include some screenshots here to demonstrate the app's interface.



Contributing
Fork the repository.
Create a new branch (git checkout -b feature-name).
Commit your changes (git commit -am 'Add feature').
Push to the branch (git push origin feature-name).
Open a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Notes:
Replace <Your MongoDB URI>, <Your JWT Secret Key>, and other placeholders with your actual credentials.
If you want to include specific screenshots, make sure to place them in a screenshots/ folder or link to external images.
Feel free to modify the usage instructions based on your app's exact flow.
