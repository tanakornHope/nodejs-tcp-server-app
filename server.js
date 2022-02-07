const net = require('net');
const port = 7070;
const host = '127.0.0.1';
const server = net.createServer();

let sockets = [];

/* server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port +'.');
}); */

server.listen(port, () => {
    console.log(`TCP Server is running on port ${port}`);
});

server.on('connection', (sock) => {
    let incommingCount = 0;
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);

    sock.on('data', (data) => {
        incommingCount++;
        // console.log(`DATA ${sock.remoteAddress} : ${data} count: ${incommingCount}`);
        console.log(`DATA ${sock.remoteAddress} : ${data}`);
        // Write the data back to all the connected, the client will receive it as data from the server
        sockets.forEach(function(sock, index, array) {
            sock.write(`${sock.remoteAddress} : ${sock.remotePort} said Prayut huakuy. count: ${incommingCount} \n`);
        });
    });

    sock.on('close', (data) => {
        let index = sockets.findIndex(function(o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });

    sock.on('end', () => {
        console.log('Closing connection with the client');
    });

    // Don't forget to catch error, for your own sake.
    sock.on('error', (err) => {
        console.log(`Error: ${err}`);
    });
});