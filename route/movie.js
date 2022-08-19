const express = require('express')
const movieRt = express.Router()
const { Movie, User } = require('../models')

//Get all Movies
movieRt.get('/titles', async (req, res) => {
    const getMovie = await Movie.findAll()

    let title = []
    for (val in getMovie) {
        title.push(getMovie[val].title)
    }
    res.send(title)
})

//Get a single Movie by title
movieRt.get('/:id', async (req, res) => {
    const singleMovie = await Movie.findOne({where: {id: req.params.id}})
    res.send(singleMovie)
})

//Get a Movie(s) of a specific genre
movieRt.get('/genre/:genre', async (req,res)=>{
    const findGenre = await Movie.findAll({where: {genre: req.params.genre}})
    console.log(findGenre)
    res.send(findGenre)
})


module.exports = {movieRt}