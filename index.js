require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

const { getTrainer, postTrainer } = require('./services/trainer');
const postPokemon = require('./services/pokemon');
const { postPack, postEvolve } = require('./services/pokeCollection');

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

// CONFIG CORS TO WORK ONLY WITH DESIGNATED URL

app.use(cors())

app.use(express.json());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("I'm connected to the DB!");
});

const checkBearerToken = (req, res, next) => {
  if (req.headers.authorization !== "Bearer moo") {
    return res.status(401).send('You are not allowed');
  }
  console.log('we did something');
  next();
};

app.get('/trainer/:id', getTrainer);
app.post('/trainer',  postTrainer);

app.post('/pokemon', postPokemon);

app.post('/pokeCollection/pack', postPack);
app.post('/pokeCollection/evolve', postEvolve);

app.listen(port, () => console.log(`PokeCollection app listening at http://localhost:${port}`));
