const { db } = require('../db')
const { DataTypes } = require('sequelize')
const { movieData } = require('../seeddata')
const sequelize = require('sequelize')

const Movie = db.define('Movie', {
    title: sequelize.STRING,
    rating: sequelize.STRING,
    genre: sequelize.STRING,
}, { timestamps: false })

//I have used a for-let loop method to allow for the code to be more adapable to more key values
async function seedMovie () {
    for (let movie of movieData) {
        await Movie.create(movie)
    }
}


module.exports = { Movie, seedMovie }