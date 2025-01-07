const clothingItemSchema = require('../models/clothingItem')
const { badRequest, notFound, serverError } = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const {name, weather, imageURL} = req.body;

  clothingItemSchema.create({name, weather, imageURL})
  .then((item) => {
    console.log(item);
    res.send({data:item})})
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(badRequest).send({ message: err.message });
      } if (err.name === "DocumentNotFoundError") {
        return res.status(notFound).send({ message: err.message });
      } 
        return res.status(serverError).send({ message: err.message });
      
    })
  // .catch((err) => {
  //   console.error(err);
  //   res.status(serverError).send({message: 'Error from createItem',err})
  // })
  }

const getItems = (req, res) => {
  clothingItemSchema.find({}).then((items) => res.status(200).send(items))
  .catch((err) => {
    console.error(err);
    res.status(serverError).send({message: "Error from getItems", err})
  })
}

const updateItem = (req, res) => {
  const {itemId} = req.params;
  const {imageURL} = req.body;

  clothingItemSchema.findByIdAndUpdate(itemId, {$set: {imageURL}}).orFail()
  .then((item) => {
    res.status(200).send({data:item})
  })
  .catch((err) => {
    console.error(err);
    if (err.name === "CastError") {
      return res.status(badRequest).send({ message: err.message });
    } if (err.name === "DocumentNotFoundError") {
      return res.status(notFound).send({ message: err.message });
    } 
      return res.status(serverError).send({ message: err.message });
    
  });
  // .catch((err) => {
  //   console.error(err);
  //   res.status(serverError).send({message: "Error from updateItem", err})
  // })
}

const deleteItem = (req, res) => {
  const {itemId} = req.params;

  console.log(itemId)
  clothingItemSchema.findByIdAndDelete(itemId).orFail()
  .then((item) => {
    res.status(204).send({})
  })
  .catch((err) => {
    console.error(err);
    if (err.name === "CastError") {
      return res.status(badRequest).send({ message: err.message });
    } if (err.name === "DocumentNotFoundError") {
      return res.status(notFound).send({ message: err.message });
    } 
      return res.status(serverError).send({ message: err.message });
    
  });
  // .catch((err) => {
  //   console.error(err);
  //   res.status(serverError).send({message: "Error from deleteItem", err})
  // })
}

module.exports.createClothingItem = (req, res) => {
  console.log(req.user._id);
};

module.exports = {createItem, getItems, updateItem, deleteItem}
