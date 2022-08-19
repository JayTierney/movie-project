const { db } = require('../db')
const { DataTypes } = require('sequelize')
const { movieData } = require('../seeddata')

const Movie = db.define('Movie', {
    title: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    },
    genre: {
        type: DataTypes.STRING
    }
}, { timestamps: false })

//I have used a let of loop method to allow for the code to be more adapable to more key values
async function seedMovie () {
    for (let movie of movieData) {
        await Movie.create(movie)
    }
}

module.exports = { Movie, seedMovie }