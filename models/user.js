const {db} = require('../db')
const {DataTypes} = require('sequelize')
const {userData} = require('../seeddata')

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
    }
},  { timestamps: false })

//I have used a let of loop method to allow for the code to be more adapable to more key values
async function seedUser () {
    for (let user of userData) {
        await User.create(user)
    }
}

module.exports = { User, seedUser }