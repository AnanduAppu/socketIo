const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors')
const dbconnection = require('./configure/dbConnection')
const userRoutes = require('./Routes/Routes')
const chatRoute = require("./Routes/chatRoutes")

dotenv.config({ path: "./configure/config.env" });

// const { chats } = require('./data/data');

// console.log(chats);

app.use(express.json())

dbconnection()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoute)
console.log("hellow")

app.listen(process.env.PORT, () => {
    console.log("Server is running",process.env.PORT,);
});
