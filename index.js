const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");
const path = require("path");
const cors = require("cors");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const PORT = process.env.PORT || 3000;

// Configuración Twilio y OpenAI
const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL_ID;
const openai = new OpenAI({ apiKey });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

io.on("connection", (socket) => {

})

// Iniciar servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });