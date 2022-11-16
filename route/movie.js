const express = require('express')
const movieRt = express.Router()
const { Movie, User } = require('../models')
const { db } = require('../db')
const { logAllTables } = require('sequelize-logger')
const { movieData } = require('../seeddata')

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

//delete movie from table
movieRt.delete('/delete/:mid', async (req, res) => {
    const { mid } = req.params
    const movie = await Movie.findByPk(mid)
    if (!movie) return res.status(401).send(`Movie ${mid} not found`)
    await movie.destroy()
    logAllTables(db)
    res.status(201).send(`movie ${mid} has been deleted`)
})

// show user watched a certain movie
movieRt.get('/watched/:mid', async (req, res) => {
    const { mid } = req.params
    const movieWithUsers = await Movie.findOne({
        where: { id: mid },
        include: [User]
    })
    res.send(movieWithUsers)
})

//add movie into table
movieRt.post('/addmovie', async (req, res) => {
    await Movie.create(req.body)
    logAllTables(db)
    res.sendStatus(200)
})

//Update movie details

movieRt.put('/update/:mid', async (req, res) => {
    const { mid } = req.params
    const movie = await Movie.findByPk(mid)
    if (!movie) return res.status(401).send(`Movie ${mid} not found`)
    movie.update(req.body)
    logAllTables(db)
    res.status(201).send(`movie ${mid} has been updated`)
})

module.exports = {movieRt}