const path = require('path')
const { Sequelize } = require('sequelize')

// I changed path.join(__dirname, 'data.sqlite') for ':memory:' whilst we're testing
// storing data in a file sometimes gets corrupted and confuses sequelize

const db = new Sequelize ({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'data.sqlite'),
    logging: false
})

module.exports = { db }