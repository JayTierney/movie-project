const { db } = require('../db')
const { Movie, seedMovie } = require('./movie')
const { User, seedUser } = require('./user')

//define relationships
//Movie and User has a n - m relationshiop

Movie.belongsToMany(User, {through: 'Movies_Watched'})
User.belongsToMany(Movie, {through: 'Movies_Watched'})

async function seed () {
    await db.sync({ force: true })
    await seedUser()
    await seedMovie()
    console.log('Database Seeded')
}

module.exports = { Movie, User, seed }