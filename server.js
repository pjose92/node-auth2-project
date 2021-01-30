const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet")

const usersRouter = require("./data/users/users-router")
const authRouter=require("./data/auth/auth-router")
const middlewares = require("./data/middleware/index")

server.use(cors());
server.use(express.json());
server.use(helmet());

server.use("/api/users", middlewares.authenticator, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => res.send("<h1> Json Web Tokens (JWT)</h1>"));

module.exports = server;