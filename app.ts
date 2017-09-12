import * as path from 'path';
import * as expressModule from 'express';
import * as webSocket from 'express-ws';

let express: expressModule.Application = expressModule();
let ws = webSocket(express);

express.get('/', (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '../index.html'));
});

express["ws"]('/feed1', (socket, req) => {
    socket.on('message', (message) => {
        if (!ws.getWss() || !ws.getWss().clients) {
            return;
        }
        ws.getWss().clients.forEach((client) => {
            if (client.upgradeReq.originalUrl.indexOf('/feed1') > -1) {
                client.send(message);
            }
        }, this);
    });
});


express["ws"]('/feed2', (socket, req) => {
    socket.on('message', (message) => {
        if (!ws.getWss() || !ws.getWss().clients) {
            return;
        }
        ws.getWss().clients.forEach((client) => {
            if (client.upgradeReq.originalUrl.indexOf('/feed2') > -1) {
                client.send(message);
            }
        }, this);
    });
});

express.listen(3000, () => console.log("server running on port 3000"));