const express = require('express');
const cors = require('cors');
const app = express();

// permite o acesso de qualquer origem

// permite o acesso apenas de origens específicas

app.use(cors());

app.use(express.json());

const db = require('./config/db');
const routes = require('./routes');
app.use(routes);

// const corsOptions = {
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   optionsSuccessStatus: 200, // Alguns navegadores legados (IE11, várias versões do Safari) não suportam o status 204
// };

// app.use(cors(corsOptions));


db.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
