var path = require('path');
var app = require('express')();
var ws = require('express-ws')(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.ws('/feed1', (socket, req) => {
    socket.on('message', (message) => {
        ws.getWss().clients.forEach(function(client) {
            console.log(message + 'feed 1 route server');
            client.send(message);
        }, this); 
    });
});

app.ws('/feed2', (socket, req) => {
    socket.on('message', (message) => {
        ws.getWss().clients.forEach(function(client) {
            console.log(message + 'feed 2 route server');
            client.send(message);
        }, this); 
    });
});

app.listen(3000, () => console.log("server running on port 3000"));