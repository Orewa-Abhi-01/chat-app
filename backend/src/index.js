const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./lib/db.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const {app, server} = require("./lib/socket.js");


const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/message.js");
const groupRoutes = require("./routes/group.js");

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;
console.log(MONGO_URI);
const PORT = process.env.PORT;
const __dirname = path.resolve();

// const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true, allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(express.urlencoded({ extended: true }));


//routes based on their respective paths from the routes folder
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/groups", groupRoutes);



app.get("/", (req, res) => {
    res.send("Hello from backend");
});

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

server.listen(5001, async() => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
    
});