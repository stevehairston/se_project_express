const clothingItemSchema = require('../models/clothingItem')

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const {name, weather, imageURL} = req.body;

  clothingItemSchema.create({name, weather, imageURL})
  .then((item) => {
    console.log(item);
    res.send({data:item})})
  .catch((e) => {
    res.status(500).send({message: 'Error from createItem',e})
  })
  }

const getItems = (req, res) => {
  clothingItemSchema.find({}).then((items) => res.status(200).send(items))
  .catch((e) => {
    res.status(500).send({message: "Error from getItems", e})
  })
}

const updateItem = (req, res) => {
  const {itemId} = req.params;
  const {imageURL} = req.body;

  clothingItemSchema.findByIdAndUpdate(itemId, {$set: {imageURL}}).orFail()
  .then((item) => {
    res.status(200).send({data:item})
  })
  .catch((e) => {
    res.status(500).send({message: "Error from updateItem", e})
  })
}

const deleteItem = (req, res) => {
  const {itemId} = req.params;

  console.log(itemId)
  clothingItemSchema.findByIdAndDelete(itemId).orFail()
  .then((item) => {
    res.status(204).send({})
  })
  .catch((e) => {
    res.status(500).send({message: "Error from deleteItem", e})
  })
}

module.exports.createClothingItem = (req, res) => {
  console.log(req.user._id);
};

module.exports = {createItem, getItems, updateItem, deleteItem}
