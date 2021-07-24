const port = 4000
const Discord = require('discord.js')
const client = new Discord.Client()
const { selfcheck }  = require('selfcheck')
const fs = require('fs')
const express = require('express')
const app = express()
const mysqli = require('mysql').createConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "discord", port: 3306 })

const bp = require('body-parser')
const cp = require('cookie-parser')
const compression = require('compression')

const addUser_process = require('./router/addUser_process')
const sm = require('./router/showMenu')

let _count = 0, _IsRepeat = 0

app.use(express.json())
app.use(cp())
app.post('*', bp.urlencoded({ extended: false}))
app.set('views', __dirname + '/public')
app.use(express.static(__dirname + '/public'))
app.use(compression())
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

app.get('/', (req, res) => res.render('index.html'))
app.post('/addUser_process', addUser_process)

app.listen(port, () => console.log(`project discord-server is running on port ${port}`))

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.channels.cache.get(`810904006661505074`).send(`bot rebooting complete`)
    .then(__msg => {
        setTimeout(() => {
            __msg.delete()
        }, 10000)
    })
});

setInterval( async () => {
    const users = await printBirthday()

    for (user of users) {
        client.channels.cache.get(`863353505430503444`).send(`${user}님 생일 축하드립니다!`)
    }

}, 86400000)

setInterval(async () => {
    let date = new Date()
    let hours = date.getHours().toString()
    let min = date.getMinutes().toString()

    if(
        min != '0' ||
        (
        hours != '1' && 
        hours != '6' && 
        hours != '7' 
        )
    ) return 0
    mysqli.query('SELECT * FROM userInfo', async (err, infoes) => {
        if(err) console.log(err)
        for (info of infoes) {
            await selfcheck(JSON.parse(info.selfCheck))
                .then(() => {
                    console.log(`${info.name}님의 자가진단 성공 ${hours} : ${min}`)
                    client.channels.cache.get(`838480416129286145`).send(`${info.name}님의 자가진단 성공 ${hours} : ${min}`)
                })
                .catch(err => {
                    console.error('오류 발생', err)
                    client.channels.cache.get(`838480416129286145`).send(`${info.name}님 입력 정보를 확인해 주십시오. \n ${err}`)
                })
        }
    })

    
}, 60000)

client.on('message', async (msg) => {
    if (msg.author.bot) return 0
    
    if (msg.content === '$자가진단 실행') startSelfCheck()
    else if (msg.content.includes('$설정')) msg.channel.send('추후 업뎃함')
    else if (msg.content === '$종료') endRepeat()
    else if (msg.content === '$자가진단 등록') sendLink()
    else if (msg.content.includes('$자가진단 해제')) msg.channel.send('추후 업뎃함')
    else if (msg.content.includes('$반복')) repeatMention()
    else if (msg.content === '$rebooting bot') a = b
    else if (msg.content.includes('$계정등록')) addAcount()
    else if (msg.content.includes('$급식')) sm.main(msg)
    else if (msg.content.includes("$학교 검색")) return
    else if (msg.content.includes('$p') || msg.content.includes('$pr')) player()
    else if (msg.content.includes('$stop')) msg.member.voice.channel.leave()
    // else if (msg.content.startsWith('$s')) 
    else if (msg.content.includes('$')) mention()

    function showCart(carts) {
        let content = "카테고리를 적어주십시오.\n"
        for (cart of carts) {
            content += `${cart}\n`
        }
        msg.channel.send(content).then((botMsg) => {
            setTimeout(() => {
                botMsg.delete()
                msg.delete()
            }, 10000);
        })
    }

    async function player() {
        const carts = fs.readdirSync('F:/song')
        const cart = msg.content.trim().split(' ')
        if (
            cart.length != 2 ||
            cart[1] == ' ' || 
            !carts.includes(cart[1])
            ) return showCart(carts)
        const channel = msg.member.voice.channel
        const songs = fs.readdirSync(`f:/song/${cart[1]}`)
        const conn = await channel.join()
        let botMsg = await msg.channel.send("the song will be start...")
        for (let i = 0; i < songs.length; i++) {
            if (msg.content.includes('pr')) {
                i = Math.floor(Math.random() * songs.length)
            }
            const songFile = conn.play(`F:/song/${cart[1]}/${songs[i]}`)
            botMsg.edit(songs[i])
            await playSong(songFile).catch((err) => console.log(err))
            if (msg.content.includes('pr')) i--
        }
        msg.delete()
        botMsg.delete()
        msg.member.voice.channel.leave()
    }

    async function playSong(song) {
        return new Promise((resolve, reject) => {
            song.on('error', (err) => reject(err))
            song.on("finish", () => resolve())
        })
    }

    function startSelfCheck() {
        let date = new Date()
        let hours = date.getHours().toString()
        let min = date.getMinutes().toString()
        mysqli.query('SELECT * FROM userInfo', async (err, infoes) => {
            if(err) console.log(err)
            for (info of infoes) {
                await selfcheck(JSON.parse(info.selfCheck))
                    .then(() => {
                        console.log(`${info.name}님의 자가진단 성공 ${hours} : ${min}`)
                        client.channels.cache.get(`838480416129286145`).send(`${info.name}님의 자가진단 성공 ${hours} : ${min}`)
                    })
                    .catch(err => {
                        console.error('오류 발생', err)
                        client.channels.cache.get(`838480416129286145`).send(`${info.name}님 입력 정보를 확인해 주십시오. \n ${err}`)
                    })
            }
        })
    }

    function endRepeat() {
        _IsRepeat = 0
        msg.channel.send(`총 ${_count}번 실행됬습니다.`)
        _count = 0
    }

    function sendLink() {
        if(msg.content.slice(9).length < 10) return msg.channel.send(`
        http://koldin.myddns.me:4000/
        `)
    }

    function repeatMention() {
        if (msg.mentions.members.first().id != '' && msg.mentions.members.first().id != undefined) {
            let mention = `<@${msg.mentions.members.first().id}>`
            _repeat(msg, mention)
        }
    }

    function addAcount() {
        const prefix = "!"
        const args = msg.content.slice(prefix.length).trim().split(' ')
        mysqli.query("SELECT * FROM userInfo", (err, row) => {
            for (info of row) {
                if(info.id == args[1]) {
                    if(JSON.parse(info.selfCheck).password == args[2]) {
                        return mysqli.query(`UPDATE userInfo SET account="${args[3]}" WHERE id=${args[1]}`, (err, row) => {
                            msg.channel.send("정상적으로 작동하였습니다.").then(botMsg => {
                                setTimeout(() => {
                                    botMsg.delete()
                                    msg.delete()
                                }, 3000)
                            })
                        })
                    }
                }
            }
        })
    }

    function mention() {
        if (msg.mentions.members.first()) {
            if (msg.mentions.members.first().id != '' && msg.mentions.members.first().id != undefined) {
                let mention = `<@${msg.mentions.members.first().id}>`
                _sending(msg, mention)
            }
        }
    }

    function _repeat(msg, content) {
        if (!_IsRepeat) {
            _IsRepeat = 1
            return repeating(msg, content)
        }
        msg.channel.send('이미 반복실행이 진행되고 있습니다.')
    }

    function repeating(msg, content) {
        if (_IsRepeat) {
            _count++
            msg.channel.send(content)
            setTimeout(repeating, 1000, msg, content)
        }
    }

    function _sending(msg, content) {
        for (let i; i < 5; i++) msg.channel.send(content)
    }
})

client.on('uncaughtException', err => {
    fs.appendFile('./err.txt', err, (err) => {
        console.log(`${err} \n`)
        process.exit()
    })
})

client.login('ODExMTc5MDc2NTk2NjYyMjgy.YCubYg.4OInElB2HV447OzEHBY_2fbN9ow');

async function printBirthday() {
    const today = getToday()
    let infoes = await getUserInfo()
    let todayBirthday = new Array()

    console.log(infoes)

    for (info of infoes) {
        const selfCheck = JSON.parse(info.selfCheck)
        const birthday = selfCheck.birthday
        const user = info.account || info.name
        if(birthday.slice(2) == today) {
            todayBirthday.push(user)
        }
    }
    return todayBirthday

    function getUserInfo() {
        return new Promise((resolve, reject) => {
            mysqli.query('SELECT * FROM userInfo', (err, row) => {
                if (err)
                    reject(err)
                else
                    resolve(row)
            })
        })
    }

    function getToday() {
        const fullDate = new Date()
        const date = fullDate.getDate().toString()
        const month = (fullDate.getMonth() + 1).toString()
        let result = month + date

        if(month.length == 1) result = "0" + month + date

        return result
    }
}
