const express = require("express");
const cors = require('cors');
require("dotenv").config({ path: ".env" });
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const JWT_SIGNING_KEY = process.env.JWT_SIGNING_KEY;

// Initialize the express server
const app = express();
app.use(cookieParser());
app.use(cors({credentials: true, origin: process.env.UI_HOST}));
app.use(express.json());

// Middleware to check JWT
app.use((req, res, next) => {
  if (req.cookies.session_id) {
      try {
          userDetails = jwt.verify(req.cookies.session_id, JWT_SIGNING_KEY)
      } catch (error) {
          console.error('Error in verifying JWT :: ', error)
          return res.status(401).json({ success: false, data: "Invalid session" })
      }
  }
  next()
})

// Get routes
const ticketsRouter = require('./routes/ticket')
const projectsRouter = require('./routes/project');
const usersRouter = require('./routes/user');
app.use('/ticket', ticketsRouter);
app.use('/user', usersRouter);
app.use('/project', projectsRouter);

// Listen to port
app.listen(process.env.PORT, () => {
	console.log(`Server is running on port: ${process.env.PORT}`);
});
