const express = require("express");
const http = require("http");
const { Server } = require("socket.io");



const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://zaptalk-men.onrender.com", // frontend URL
    methods: ["GET", "POST"]
  }
});
 

const userSocketMap={};
const getRecieverSocketId = (recieverId) => {
  return userSocketMap[recieverId];
};

io.on("connection", (socket) => {
 const userId = socket.handshake.query.userId; 
 if(userId!== undefined) {
  //  console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
    userSocketMap[userId] = socket.id; // Store userId and socket id

  }
  io.emit("getOnlineUsers",Object.keys(userSocketMap))
  socket.on("disconnect", () => {
    if (userId && userSocketMap[userId]) {
      delete userSocketMap[userId]; // Remove user from map on disconnect
      io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Notify all clients
    }
  }

 
)});



module.exports = { app, io, server, getRecieverSocketId }; // Exporting for use in other files
