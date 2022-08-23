const express = require('express')
const app = express()
const { movieRt, userRt } = require('../route')
const { seed } = require('../models')

app.use(express.json())
app.use('/movie', movieRt)
app.use('/user', userRt)


async function server (port) {

    await seed()

    app.listen(port, () => {
        console.log(`App.js running at http://localhost:${port}`)
    })

}

server(3001)
