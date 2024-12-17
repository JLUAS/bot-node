const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");
const path = require("path");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid"); // Para generar nombres únicos de archivos
const fs = require("fs");

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
  socket.on("message-api", async (text) => {    
      try {
        const [gptResponse] = await Promise.all([
          openai.chat.completions.create({
            model: model,
            messages: [
              { role: "user", content: text},
            ],
          }),
        ]);
        const botResponse = gptResponse.choices[0].message.content;
        socket.emit("message", botResponse)
      } catch (error) {
        io.emit("error", { message: "Error al procesar la solicitud." });
      }
    
  });
})

// Iniciar servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });