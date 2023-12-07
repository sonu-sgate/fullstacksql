const express = require('express');
const cors = require('cors');
const http = require('http');
// const bodyParser=require("body")
const { Server } = require('socket.io');
const { connection } = require('./Connection/connection');
const { adminRouter } = require('./Routes/Amdinroutes');
const { adminactivityRouter } = require('./Routes/AdminActivityRoutes');
const { auth } = require('./Middleware/Auth');
const cookieParser = require('cookie-parser');
const { empRouter } = require('./Routes/EmplyoeeRoutes');
const { empActivityrouter } = require('./Routes/EmpActivityRouter');
const { empauth } = require('./Middleware/Empauth');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    credentials: true,
  },
});

app.use(express.static('build'));

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'PATCH'],
  credentials: true,
}));
app.use(express.json());
const users = {};

app.use("/auth",adminRouter);
// for urlpurpose
// app.use(bodyParser.urlencoded({ extended: true }));
// Important to get static data (images)
app.use(cookieParser());

app.use(express.static('Public'));

app.use("/adminside",adminactivityRouter);
app.use("/empside",empRouter);
app.use('/empactivity',empauth,  empActivityrouter);
// io.use(empauth)
io.on('connection', (socket) => {
  console.log('A user connected');
//   console.log(socket)

  socket.on('message', (message) => {
    console.log('Received message:', message);

    io.emit('message', { text: message.text, sender: 'bot',recieverId:message.recieverId });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

httpServer.listen(3000, async (req, res) => {
  try {
    connection.connect((error) => {
      if (error) {
        console.log('Not able to connect with the database');
      } else {
        console.log('Connected to the database');
      }
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.log('Something went wrong:', error);
  }
});
