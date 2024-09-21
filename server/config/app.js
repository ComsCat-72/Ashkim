module.exports = {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpirationInterval: '1h',
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      optionsSuccessStatus: 200
    },
    socketOptions: {
      cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        methods: ['GET', 'POST']
      }
    }
  };
  