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
var fs = require('fs')

app.post('/writeUsername/:username', (req, res) => {
    var obj = {
        username: req.params.username
    }
    var json = JSON.stringify(obj)
    fs.writeFile("username.json", json, function (err) {
        if (err) throw err;

        res.send('File written successfully')
    })
})

app.get('/getStoredUsername', (req, res) => {
    fs.readFile("username.json", "utf8", function read(err, data) {
        if (err) {
            throw err;
        }
        res.send(data)
    })
})

app.use(bodyParser.json());
app.use('/', express.static('static'));

const Sequelize = require("sequelize-cockroachdb");
const { QueryTypes } = require('sequelize-cockroachdb');

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
    dayLeft: {
        type: Sequelize.INTEGER
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
                dayLeft: req.body.dayLeft,
            }],
                {
                    updateOnDuplicate: ["name", "age", "avgCycle", "dayLeft"]
                })
        })
    res.send("User created with username: " + req.body.username)
})

app.post('/delete', (req, res) => {
    Users.drop()
    res.send("Users table dropped")
})

app.get('/getUsername/:username', async (req, res) => {
    const data = await sequelize.query(`SELECT username FROM users WHERE username = '${req.params.username}'`, { type: QueryTypes.SELECT })
    res.send(data)
})

app.listen(port, () => {
    console.log(`Server started at ${port}`)
})

