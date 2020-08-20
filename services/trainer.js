const Trainer = require('../models/trainer');
const PokeCollection = require('../models/pokeCollection');
const fetch = require("node-fetch");
const mongoose = require('mongoose');

const getTrainer = async (req, res) => {
  const foundTrainer = await Trainer
    .findById(req.params.id)
    .populate({ path: 'pokecollection', populate: [{ path: 'pokemons' }] });
  res.status(200).json(foundTrainer);
};

const postTrainer = async (req, res) => {
  if (!req.body.name) return res.status(400).send('Invalid Input.');
  const newTrainerId = new mongoose.Types.ObjectId();
  const newPokeCollectionId = new mongoose.Types.ObjectId();
  const newTrainer = new Trainer({
    _id: newTrainerId,
    name: req.body.name,
    currency: 50,
    pokecollection: newPokeCollectionId,
  });

  const newPokeCollection = new PokeCollection({
    _id: newPokeCollectionId,
    pokemons: [],
    trainer: newTrainerId,
  });
  try {
    const newTrainerResult = await newTrainer.save();
    await newPokeCollection.save();
    const newPack = fetch('https://gottafetchemall.herokuapp.com/pokeCollection/pack',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          trainerId: newTrainerResult._id,
          packType: 'starter',
        })
      }
    )
    .then((response) => {
      return response.json();
    })
    res.status(200).json(newTrainerResult);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const putTrainerCurrency = async (req, res) => {
  const currency = req.body.currency;
  const trainerId = req.body.trainerId;

  if (!currency) res.status(400).send('no currency value supplied.')

  if (!trainerId) res.status(400).send('no trainer ID supplied')

  const foundTrainer = await Trainer
  .findById(trainerId);

  if (!foundTrainer) return res.status(400).send('No trainer found for that id.');

  foundTrainer.currency += currency;

  try {
  await foundTrainer.save();
  
  res.status(200).json(foundTrainer.currency);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = {
  getTrainer,
  postTrainer,
  putTrainerCurrency,
}
