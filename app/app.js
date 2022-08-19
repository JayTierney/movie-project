const express = require('express')
const app = express()
const { movieRt, userRt } = require('../route')
const { seed } = require('../models')

app.use(express.json())
app.use('/movies', movieRt)
app.use('/users', userRt)


async function serve (port) {

    await seed()

    app.listen(port, () => {
        console.log(`App.js running at http://localhost:${port}`)
    })

}

serve(3001)
