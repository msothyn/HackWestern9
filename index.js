/*
postgresql://mithila:Qd6laJPibtu9jYSDmEdUfA@wowed-sunbear-6797.7tt.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full
username = mithila
password = Qd6laJPibtu9jYSDmEdUfA
host = wowed-sunbear-6797.7tt.cockroachlabs.cloud
database = defaultdb
port = 26257
*/
const express = require('express')
const app = express()

const port = 3000

var bodyParser = require("body-parser");

app.use(bodyParser.json());

const Sequelize = require("sequelize-cockroachdb");

var sequelize = new Sequelize({
    dialect: "postgres",
    username: "mithila",
    password: "Qd6laJPibtu9jYSDmEdUfA",
    host: "wowed-sunbear-6797.7tt.cockroachlabs.cloud",
    database: "defaultdb",
    port: 26257,
    dialectOptions: {
        ssl: {

        },
    },
    logging: false,
});

const Users = sequelize.define("users", {
    // name, age, username {PK}, average cycle length, 
    username: {
        type: Sequelize.TEXT,
        primaryKey: true,
    },
    name: {
        type: Sequelize.TEXT
    },
    age: {
        type: Sequelize.INTEGER
    },
    avgCycle: {
        type: Sequelize.INTEGER
    },
    birthControl: {
        type: Sequelize.BOOLEAN
    }
})

app.get('/list', (req, res) => {
    Users.sync({
        force: false,
    })
        .then(() => {
            return Users.findAll()
        })
        .then((users) => {
            res.send(users)
        })
})

app.post('/add', (req, res) => {
    Users.sync({
        force: false,
    })
        .then(() => {
            return Users.bulkCreate([{
                username: req.body.username,
                name: req.body.name,
                age: req.body.age,
                avgCycle: req.body.avgCycle,
                birthControl: req.body.birthControl
            }])
        })
    res.send("User created with username: " + req.body.username)
})

app.post('/delete', (req, res) => {
    Users.drop()
    res.send("Users table dropped")
})


app.listen(port, () => {
    console.log(`Server started at ${port}`)
})

