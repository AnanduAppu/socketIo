const dotenv = require('dotenv');
const express = require('express');
const app = express();
dotenv.config({ path: "./configure/config.env" });

const { chats } = require('./data/data');

console.log(chats);

app.get('/chats', (req, res) => {
    res.send(chats);
});

app.get('/chats/:id', (req, res) => {
    const singleChat = chats.find((e) => e._id === req.params.id);
    res.send(singleChat);
});

app.listen(process.env.PORT, () => {
    console.log("Server is running");
});
