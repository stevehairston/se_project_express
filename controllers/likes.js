module.exports.likeItem = (req, res) => ClothingItem.findByIdAndUp (
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    {new: true},)
    
    module.exports.dislikeItem = (req, res) => ClothingItem.findByIdAndUpdate(
        req.params.itemId,
        { $pull: { likes: req.user._id } }, // remove _id from the array
        { new: true },
      ) 