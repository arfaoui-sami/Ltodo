import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import { createTransport } from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();
const sendMail = (email, subject, title, description) => {
    var transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: 'alok.yadav6000@gmail.com',
        to: email,
        subject: subject,
        html:`<h1>Task added successfully</h1><h2>Title: ${title}</h2><h3>Description: ${description}</h3>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
// Add a new task
const addTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;
    // Find the user corresponding to the ID
    const user = await userModel.find({_id: userId});
     // Create a new task with the provided data
    const newTask = new taskModel({ title, description, terminée: false, userId })
   // Save the new task to the database
    newTask.save()
        .then(() => {
            sendMail(user[0].email, "Task Added", title, description)
            return (res.status(200).json({ message: "Task added successfully" }))
        })
        .catch((error) => {
            return (
                // Handle errors and return a response in case of failure
                res.status(500).json({ message: error.message })
            )
        }
        )
}
// Remove a task
const removeTask = (req, res) => {
// Retrieve the ID of the task to be deleted from the request
    const { id } = req.body;
    console.log("id: ", id);
    // Find the task by its ID and delete it
    taskModel.findByIdAndDelete(id)
        .then(() => res.status(200).json({ message: "Task deleted successfully" }))
        .catch((error) => res.status(501).json({ message: error.message }))
}
// Get tasks for the current user
const getTask = (req, res) => {
      // Find and return all tasks belonging to the current user
    taskModel.find({ userId: req.user.id })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(501).json({ message: error.message }))
}
export { addTask, getTask,removeTask }
