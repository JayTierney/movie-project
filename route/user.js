const express = require('express')
const userRt = express.Router()
const { User, Movie } = require('../models')
const { db } = require('../db')
const { logAllTables } = require('sequelize-logger')

//Get all users
userRt.get('/', async (req, res) => {
    const getUsers = await User.findAll()

    let user = []
    for (val in getUsers) {
        user.push(getUsers[val].name)
    }
    res.send(user)
})

//Get single user
userRt.get('/:id', async (req, res) => {
    const singleUser = await User.findOne({where: {id: req.params.id}})
    res.send(singleUser)
})

//Adding movie to user 
userRt.post('/:uid/movies/:mid', async (req, res) => {
    const { uid, mid } = req.params

    const user = await User.findByPk(uid)
    if (!user) return res.status(401).send(`User ${uid} not found`)

    const movie = await Movie.findByPk(mid)
    if (!movie) return res.status(401).send(`Movie ${mid} not found`)

    try {
        await user.addMovie(movie)
        logAllTables(db)
        res.status(201).send(`movie ${mid} added to user ${uid}`)
    } catch (error) {
        console.log('There was an error!', error)
        res.status(500).send(error)
    }
})

//movies watched 
userRt.get('/watched/:uid', async (req, res) => {
    const { uid } = req.params

    const usersWithMovies = await User.findOne({
        where: { id: uid },
        include: [Movie]
    })
    res.send(usersWithMovies)
})

module.exports = { userRt }