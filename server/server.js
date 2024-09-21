// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');
// const groupRoutes = require('./routes/group');

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('MongoDB connection error:', err));

// app.use('/api/auth', authRoutes);
// app.use('/api/group', groupRoutes);

// const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const io = require('socket.io')(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"]
//   }
// });

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('join_group', (groupId) => {
//     socket.join(groupId);
//   });

//   socket.on('send_message', (data) => {
//     io.to(data.groupId).emit('receive_message', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const socketIo = require('socket.io');
const connectDB = require('./config/database');
const appConfig = require('./config/app');
const authRoutes = require('./routes/auth');
const groupRoutes = require('./routes/group');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors(appConfig.cors));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/group', groupRoutes);

const server = app.listen(appConfig.port, () => console.log(`Server running on port ${appConfig.port}`));

const io = socketIo(server, appConfig.socketOptions);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join_group', (groupId) => {
    socket.join(groupId);
  });

  socket.on('send_message', (data) => {
    io.to(data.groupId).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
