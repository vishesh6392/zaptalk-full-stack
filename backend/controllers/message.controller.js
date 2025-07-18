const  Message = require('../model/messageModel.js');
const conversationModel = require('../model/conversationModel.js');
const { uploadOncloudinary } = require('../config/cloudinary.js');
const mongoose = require('mongoose');

 const sendMessage = async (req, res) => {
          console.log(req.params)
    try {
        let sender= req.userId;
        let receiver  = req.params.reciverId;
        let { content, image } = req.body;
        console.log("Sender ID:", sender);
        console.log("Receiver ID:", receiver);          
        console.log("Content:", content);
        
        // if (!content || !image) {
        //     return res.status(400).json({ message: "Content or image is required" });
        // }
        if(req.file){
            imageUlr=await uploadOncloudinary(req.file.path);
            console.log(imageUlr);
            image=imageUlr;
        }

       
         const newMessage = await Message.create({
            sender,
            receiver: receiver,
            content,
            image,
        
        });
           
           console.log("Sender ID:", sender, typeof sender);
console.log("Receiver ID:", receiver, typeof receiver);

         let conversation= await conversationModel.findOne({
            participants: { $all: [sender, receiver] }
        });
        console.log("Conversation:", conversation);
        if (!conversation) {
            conversation = await conversationModel.create({
                participants: [sender, receiver],
                messages: [newMessage._id]
                
            })
        }

        else {
            conversation.messages.push(newMessage._id);
            await conversation.save();
        }
        console.log("Conversation:", conversation);
        console.log("New message created:", newMessage);
        res.status(200).json(newMessage);
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "massage error" });
    }
}

const getMessages = async (req, res) => {
    try {
        let sender = req.userId;
        let receiver = req.params.reciverId;
        console.log("Sender ID:", sender);
        console.log("Receiver ID:", receiver);
        let conversation= await conversationModel.findOne({
            participants: { $all: [sender, receiver] }
        }).populate("messages") ;
        console.log("Conversation:", conversation); 
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }
        res.status(200).json(conversation?.messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Error fetching messages" });
    }
}

module.exports = {
    sendMessage,
    getMessages
}