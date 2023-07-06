const Meal = require("./meals.model")
const Order = require("./orders.model")
const Restaurant = require("./restaurants.model")
const Review = require("./reviews.model")
const User = require("./users.model")


const initModel = () => {

  Restaurant.hasMany(Review)
  Review.belongsTo(Restaurant)

  Restaurant.hasMany(Meal)
  Meal.belongsTo(Restaurant)

  User.hasMany(Review)
  Review.belongsTo(User)

  Meal.hasOne(Order)
  Order.belongsTo(Meal)

  User.hasMany(Order)
  Order.belongsTo(User)
}


module.exports = initModel