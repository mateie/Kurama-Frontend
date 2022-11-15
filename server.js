require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

let server = process.env.NODE_ENV !== 'development' ? require('https').createServer({
    privateKey: fs.readFileSync(__dirname + '/private.key', 'utf-8'),
    certificate: fs.readFileSync(__dirname + '/intermidiate.cer', 'utf-8')
}, app) : require('http').createServer(app);

const port = process.env.NODE_ENV === 'development' ? 80 : 443;
const publicPath = path.join(__dirname, "build");

app.use(express.static(publicPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

server.listen(port, () => {
    console.log(`Listening to port: ${port}`);
});
