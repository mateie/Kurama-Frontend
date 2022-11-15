require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

let server = process.env.NODE_ENV !== 'development' ? require('https').createServer({
    privateKey: fs.readFileSync('private.key'),
    certificate: fs.readFileSync('public.cer')
}, app) : require('http').createServer(app);

const port = process.env.NODE_ENV === 'development' ? 80 : 443;
const publicPath = path.join(__dirname, "build");

app.use(express.static(publicPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

server.listen(port, '0.0.0.0', () => {
    console.log(`Listening to port: ${port}`);
});
