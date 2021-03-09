const io = require('socket.io')(3000, {
    cors: {
        origin: "*",
    },
});

const users = {};

io.on('connection', socket => {
    console.log("Usuário conectado.");

    socket.on('new-user', username => {
        users[socket.id] = username;
        socket.broadcast.emit('user-connected', username);
    });

    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    });
});

