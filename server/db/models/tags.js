const Sequelize = require('sequelize')
const db = require('../db')


const Tag = db.define('tag', {
  title: {
      type: Sequelize.STRING,
      defaultValue: 'TBD',
      allowNull: false
  },
  imageUrl:  {
    type: Sequelize.TEXT,
    allowNull: false
  },
})

module.exports = Tag