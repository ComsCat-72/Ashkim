const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const socketIo = require('socket.io');
const { connectDB, sequelize } = require('./config/database');
const { User, Group, Message } = require('./models');
const authRoutes = require('./routes/auth');
const groupRoutes = require('./routes/group');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/group', groupRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync(); // This creates the tables if they don't exist
    const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    const io = socketIo(server, {
      cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"]
      }
    });

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
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
};

startServer();
