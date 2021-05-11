//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/user')
const Tag = require('./models/tags')

//associations could go here!
User.hasMany(Tag)
Tag.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Tag
  },
}
