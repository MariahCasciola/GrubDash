const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

//middleware
function dishExists(req, res, next) {}

function dishHasId(req, res, next) {}

function idMatch(req, res, next) {}

//validation functions, error message for these should return with 400 and an error message
function hasName(req, res, next) {
  let { data: { name } = {} } = req.body;
  if (name && name.length !== 0) {
    return next();
  }
  next({ status: 400, message: "Dish must include a name" });
}

function hasDescription(req, res, next) {
  let { data: { description } = {} } = req.body;
  if (description && description.length !== 0) {
    return next();
  }
  next({ status: 400, message: "Dish must include a description" });
}

function hasPrice(req, res, next) {
  let { data: { price } = {} } = req.body;
  if (price && price > 0 && typeof(price) === "number") {
    return next();
  }
  next({ status: 400, message: "Dish must include a price" });
}

function hasImageUrl(req, res, next) {
  let { data: { image_url } = {} } = req.body;
  if (image_url && image_url.length !== 0) {
    return next();
  }
  next({ status: 400, message: "Dish must include a image_url" });
}

//crudl opertations, except delete
//get request
function list(req, res, next) {
  res.json({ data: dishes });
}

//get request w/ id
function read(req, res, next) {
  const { dishId } = req.params;
}

//put request w/ an id
function update(req, res, next) {}

//post request w/ a body
function create(req, res, next) {
  let { data: { name, description, price, image_url } = {} } = req.body;
  let newDish = {
    id: nextId(),
    name: name,
    description: description,
    price: price,
    image_url: image_url,
  };
  dishes.push(newDish);
  res.status(201).json({ data: newDish });
}

module.exports = {
  list,
  read,
  update: [
    dishExists,
    dishHasId,
    idMatch,
    hasName,
    hasDescription,
    hasPrice,
    hasImageUrl,
    update,
  ],
  create: [hasName, hasDescription, hasPrice, hasImageUrl, create],
};
