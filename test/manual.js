const { User, Movie, seed } = require('../models')
const { db } = require('../db')
const { logAllTables } = require('sequelize-logger')

async function test () {

    await seed()

    const user = await User.findByPk(1)
    const movie = await Movie.findByPk(1)

    await user.addMovie(movie)

    logAllTables(db)

}

test()
