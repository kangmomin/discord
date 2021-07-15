const app = require('express').Router()
const mysqli = require('mysql').createConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "discord", port: 3306 })

app.post('/addUser_process', (req, res) => {
    const ip = req.header('x-forwarded-for') || req.connection.remoteAddress
    const { name, pwd, area, school, birthday } = req.body
    if((name, pwd, birthday, area, school) === null) return res.send("null")
    let json = {
        "name" : name,
        "birthday" : birthday,
        "school" : school,
        "area" : area,
        "password" : pwd
    }
    let params = [name, ip, JSON.stringify(json)]
    mysqli.query('INSERT INTO userInfo (name, ip, selfCheck) VALUES (?, ?, ?)', params, (err, row) => {
        if(err) {
            console.log(err)
            return res.send('err')
        }
        res.send(row.insertId.toString())
    })
})

module.exports = app