const express = require('express');
const path = require('path');
const app = express();

const http = require('http').createServer(app);

const port = process.env.PORT || 80;
const publicPath = path.join(__dirname, "build");

app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

http.listen(port, '0.0.0.0', () => {
    console.log(`Listening to port: ${port}`);
});