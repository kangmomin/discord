const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
var data = '', cart = '', songCount = 0, _count = 0, _IsRepeat = 0, botMsg, _connection, isSetting = false,
    _channel, percent = '', isCart = false, cartMsg


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.channels.cache.get(`810904006661505074`).send(`bot rebooting complete`)
    .then(__msg => {
        setTimeout(() => {
            __msg.delete()
        }, 10000)
    })
});

client.on('message', msg => {
    if (!msg.author.bot) {
        let koldin = '<@345062055876755459>', sasin = '<@426006925336117258>', takarada = '<@276171866341769218>',
            creshent = '<@528760244407369739>', sys = '<@806131056830316574>', jw = '<@546696761431949314>', dongwon = '<@635802477429522432>',
            jj = '<@630059294863130624>'
        if (isCart === false) {
            if (msg.content === '$ㅅㅂ' || msg.content === '$수봉' || msg.content === '$tq') {
                _sending(msg, creshent)
            } else if (msg.content === '$타카' || msg.content === '$타카라다' ||
                msg.content === '$ㅌㅋㄹㄷ' || msg.content === '$ㅌㅋ' || msg.content === '$타카 반복') {
                _sending(msg, takarada)
            } else if (msg.content == '$동원' || msg.content == '$ㄷㅇ' || msg.content == '$ehddnjs' || msg.content == '$참치'
                || msg.content == '$ed' || msg.content === '$동원 반복') {
                _sending(msg, dongwon)
            } else if (msg.content === '$koldin' || msg.content === '$콜딘' || msg.content === '$모민' || msg.content === '$ㅋㄷ'
                || msg.content === '$딸기') {
                _sending(msg, koldin)
            } else if (msg.content === '$사신' || msg.content === '$ㅅㅅ' || msg.content === '$tt' || msg.content === '$tktls') {
                _sending(msg, sasin)
            } else if (msg.content === '$씹덕' || msg.content === '$씹' || msg.content === '$Tlq' || msg.content === '$ㅅㄷ') {
                msg.channel.send(sys)
                msg.channel.send(takarada)
                msg.channel.send(jw)
            } else if (msg.content === '$유승' || msg.content === '$ㅇㅅ' || msg.content === '$유승 반복') {
                _sending(msg, sys)
            } else if (msg.content === '$재완' || msg.content === '$ㅈㅇ' || msg.content === '$재완 반복') {
                _sending(msg, jw)
            } else if (msg.content === '$정준' || msg.content === '$ㅈㅈ' || msg.content === '$정준 반복' || msg.content === '$ㅄ' || msg.content === '$병신') {
                _sending(msg, jj)
            } else if(msg.content.includes('$시간표')){
                fs.readdir('./시간표/', 'utf8', (err, data) => {
                    let i = 0
                    if(msg.content != '$시간표') {
                        while (i < data.length) {
                            if(data[i] === `시간표${msg.content.slice(5)}`) {
                                let classroom = msg.content.slice(5)
                                let today = new Date().getDay()
                                let day
                                switch (today) {
                                    case 1:
                                        day = 'mon'
                                        break
                                    case 2:
                                        day = 'tue'
                                        break
                                    case 3:
                                        day = 'wed'
                                        break
                                    case 4:
                                        day = 'thu'
                                        break
                                    case 5:
                                        day = 'fri'
                                        break
                                }
                                _day(day, msg, classroom)
                            }
                            i++
                        }
                    } else {
                        msg.channel.send('반을 입력해주십시오')
                    }                    
                })
            } else if (msg.content === '$도움말') {
                msg.channel.send(`
            사용법
    $시발 좆같은 코딩 : 부름이 만들며 ㅈ같았던 순간을 표시해준다.
    $반복 @mention : 맨션된 사람 계속 부른다.
    $@mention : 맨션된 사람을 5번 부른다.
    $종료 : 반복을 종료한다.
    $재생 ㅇㅇ : ㅇㅇ 카테고리 재생한다.
    $ㅋㅌ : 카테고리 리스트를 표시하며 번호를 입력해 재생할수있다.
    $카테고리 x : 재생중인 카테고리의 곡리스트를 뽑아주며 기본값은 1로 되있다.
    $번호 x : 재생중인 곡의 x번째 곡을 틀어준다.
    $랜덤값 x : 1 ~ x사이의 수를 랜덤으로 뽑아준다.
    $취소 : 카테고리를 쳤을때 취소한다.
    $게임 : 롤과 레식중에 랜덤으로 한게임을 정해준다.
    $게임 확률 : 말그대로 $게임의 확률을 보여준다.
    $시간표 x : 컴과고 x반의 시간표가 등록돼있다면, 당일의 시간표를 보여준다.
            `)
            } else if (msg.content === '$종료') {
                _IsRepeat = 0
                msg.channel.send(`총 ${_count}번 실행됬습니다.`)
                _count = 0
            } else if (msg.content === '$시발 좆같은 코딩') {
                msg.channel.send(`
    1 : 쓰던방법이 안될거란 개같은 생각에 1시간 ㅄ짓거리
    2 : 변수쓰다가 썪여서 1시간 공중분해
    3 : 사신이가 원하는 몇번 반복했는지 적는 기능추가하며 본래 있던 버그 고치는데 테스트하던 그부분만 삭제를 다 안해서 일어난 버그였음. 또 1시간 이상 증발tlqkf
    4 : 로컬파일 재생 기능 구현중 필요한 파일 다운을 3시간이상 하며 10개의 파일 이상 다운받음 시발 개 좆같은 코딩
    5 : 폴더 읽기를 해야하는데 파일읽기 쓰고 왜 안되는지 찾고있었음 시발
    6 : 예제는 전부 end라던데 왜 정답은 finish지 시발
    7 : 살다살다 콜론(:)을 안붙여서 2시간 낭비한적은 처음이네
    `)
            } else if (msg.content.includes('$재생')) {
                if (msg.content.length < 4) {
                    let userMsg = msg
                    msg.channel.send('카테고리를 입력하십시오.').then(_msg => {
                        setTimeout(() => {
                            _msg.delete()
                            userMsg.delete()
                        }, 3000)
                    })

                } else {
                    fs.readdir(`F:/song/${msg.content.slice(4)}`, 'utf8', (err, _data) => {
                        if (err) {
                            let userMsg = msg
                            msg.channel.send('없는 카테고립입니다.').then(msg => {
                                setTimeout(() => {
                                    msg.delete()
                                    userMsg.delete()
                                }, 3000)
                            })
                        } else {
                            if (isSetting === true) {
                                cart = msg.content.slice(4)
                                data = _data
                                msg.delete()
                            } else {
                                songCount = 0
                                data = _data
                                cart = msg.content.slice(4)
                                msg.channel.send('.').then(msg => {
                                    botMsg = msg
                                    _channel = msg.member.voice.channel
                                }).catch(err => {
                                    console.log(err)
                                })
                                msg.delete()
                                song()
                            }
                        }
                    })
                }
            } else if (msg.content === '$ㅋㅌ' || msg.content.includes('$카테고리')) {
                if(!msg.content.includes('$카테고리')) {
                    fs.readdir(`F:/song`, 'utf8', (err, data) => {
                        let list = '카테고리\n';
                        let i = 0
                        while (i < data.length) {
                            list += `${i + 1} : ${data[i]} \n`
                            i++
                        }
                        let userMsg = msg
                        msg.channel.send(list).then(_msg => {
                            isCart = true
                            cartMsg = _msg
                            userMsg.delete()
                        })
                    })
                } else {
                    if (isSetting === true) {
                        if(msg.content.slice(6) !== undefined) {
                            let msgCount = msg.content.slice(6)
                            if(msg.content !== '$카테고리') {
                                msgCount = msg.content.slice(6)
                            } else {
                                msgCount = 1
                            }
                            let list = ''
                            let array = new Array()
                            msg.delete()
                            fs.readdir(`F:/song/${cart}`, 'utf8', (err, _data) => {
                                if (msgCount <= Math.ceil(_data.length/15) || msgCount <= 0) {
                                    let i = 0
                                    let j = 0
                                    let count = 0
                                    while (i < Math.ceil(_data.length/15)) {
                                        array[i] = new Array()
                                        while (j < 15) {
                                            if(_data[count] === undefined) {
                                                j = 15
                                            } else {
                                                array[i][j] = _data[count]
                                            count++
                                            j++
                                            }
                                        }
                                        j = 0
                                        i++
                                    }
                                    list += `[${msgCount} / ${array.length}]\n`
                                    for (f = 0; f < 15; f++) {
                                        if(array[msgCount - 1][f] !== undefined) {
                                            list += `${(((msgCount - 1) * 15) + f) + 1} : ${array[msgCount - 1][f]}\n`
                                        }
                                    }
                                    msg.channel.send(list).then(_msg => {
                                        setTimeout(() => {
                                            _msg.delete()
                                        }, 30000)
                                    })
                                } else {
                                    msg.channel.send('카테고리 번호가 너무 크거나 작습니다.').then(_msg => {
                                        setTimeout(() => {
                                            msg.delete()
                                            _msg.delete()
                                        }, 3000)
                                    })
                                }
                            })
                        } else {
                            msg.channel.send('카테고리 번호를 적어주십시오.').then(msg => {
                                setTimeout(() => {
                                    msg.delete()
                                }, 30000)
                            })
                        } 
                    }
                }
            } else if (msg.content === '$ㅅㄷㄴㅅ' || msg.content.includes('$test')) {
                msg.member.voice.channel.join().then(connection => {
                    let dispatcher = connection.play(`F:/song/트위치/진자림 왜에_ 10분 연속듣기.m4a`)
                    dispatcher.on("error", (err) => {
                    })
                })

            } else if (msg.content.includes('$반복')) {
                if (msg.mentions.members.first().id != '' && msg.mentions.members.first().id != undefined) {
                    let mention = `<@${msg.mentions.members.first().id}>`
                    _repeat(msg, mention)
                }
            } else if (msg.content === '$게임') {
                let game = ''
                let math = Math.floor(Math.random() * (3 - 1)) + 1
                switch (math) {
                    case 2:
                        game = '레인보우 식스 시즈'
                        break
                    case 1:
                        game = '리그 오브 레전드'
                        break
                }

                msg.channel.send(`오늘은 ${game}인듯`)
            } else if (msg.content === '$게임 확률 code setting') {
                Calculation()
            } else if (msg.content === '$게임 확률') {
                if (percent === '') {
                    msg.channel.send('측정되지 않았습니다.')
                } else {
                    msg.channel.send(percent)
                }
            } else if(msg.content.includes('$랜덤')) {
                if(msg.content === '$랜덤') {
                    msg.channel.send('값을 입력해 주십시오.').then(_msg => {
                        setTimeout(() => {msg.delete(); _msg.delete()}, 3000)
                    })
                } else {
                    msg.channel.send(getRndInteger(1, msg.content.slice(4))).then(_msg => {
                        setTimeout(() => {
                            msg.delete()
                            _msg.delete()
                        }, 10000)
                    })
                }
            } else if (msg.content === '$rebooting bot') {
                a = b
            } else if(msg.content.includes('$번호')) {
                if(isSetting === true) {
                    fs.readdir(`F:/song/${cart}`, 'utf8', (err, _data) => {
                        if (err) throw err
                        if (_data.length >= msg.content.slice(4)) {
                            msg.delete()
                            songCount = msg.content.slice(4)
                            songCount--
                            let dispatcher = _connection.play(`\\song/${cart}/${data[songCount]}`);
                            botMsg.edit(`${data[songCount]} [${songCount + 1}/${data.length}]`)
                            dispatcher.on("finish", () => {
                                if (songCount + 1 <= data.length) {
                                    songCount++
                                    song()
                                } else {
                                    botMsg.edit('전곡 재생 완료')
                                    msg.member.voice.channel.leave();
                                    songCount = 0
                                    data = ''
                                }
                            })
                        } else {
                            botMsg.edit('번호가 너무 큼').then(() => {
                                setTimeout(() => {
                                    msg.delete()
                                    botMsg.edit(`${data[songCount]} [${songCount + 1}/${data.length}]`)
                                }, 3000)
                            })
                        }
                    })
                }
            } else if (msg.content.includes('$')) {
                if (msg.mentions.members.first()) {
                    if (msg.mentions.members.first().id != '' && msg.mentions.members.first().id != undefined) {
                        let mention = `<@${msg.mentions.members.first().id}>`
                        _sending(msg, mention)
                    }
                }
            }
        } else if (isCart === true) {
            if (msg.content === '$취소') {
                isCart = false
                msg.channel.send('취소 하였습니다.').then(_msg => {
                    setTimeout(() => {
                        cartMsg.delete()
                        msg.delete()
                        _msg.delete()
                    }, 3000)
                })
            } else if (msg.content.includes('$')) {
                msg.channel.send('번호를 입력해 주십시오.\n혹은 $취소를 사용하여 끝낼수 있습니다').then(_msg => {
                    setTimeout(() => {
                        _msg.delete()
                        msg.delete()
                    }, 3000)
                })
            } else {
                fs.readdir(`F:/song/`, 'utf8', (err, __data) => {
                    if (err) throw err
                    let i = 0
                    while (i < __data.length) {
                        if ((i + 1) == msg.content) {
                            cart = __data[i]
                            fs.readdir(`F:/song/${__data[i]}`, 'utf8', (err, _data) => {
                                if (err) {
                                    let userMsg = msg
                                    msg.channel.send('없는 카테고립입니다.').then(msg => {
                                        setTimeout(() => {
                                            msg.delete()
                                            userMsg.delete()
                                        }, 3000)
                                    })
                                } else {
                                    if (isSetting === true) {
                                        data = _data
                                        isCart = false
                                        msg.delete()
                                        cartMsg.delete()
                                    } else {
                                        songCount = 0
                                        data = _data
                                        msg.channel.send('.').then(msg => {
                                            botMsg = msg
                                            _channel = msg.member.voice.channel
                                        }).catch(err => {
                                            console.log(err)
                                        })
                                        msg.delete()
                                        cartMsg.delete()
                                        isCart = false
                                        song()
                                    }
                                }
                                i = data.length
                            })
                        }
                        i++
                    }
                })
            }
        }
    }

    function song() {
        let dispatcher
        if(isSetting === false) {
            msg.member.voice.channel.join()
            .then(connection => {
                if (songCount + 1 <= data.length) {
                    botMsg.edit(`준비중 입니다...`)
                    botMsg.react('🔀').then(() => {
                        botMsg.react('⏪').then(() => {
                            botMsg.react('⏩').then(() => {
                                botMsg.react('❌').then(() => {
                                    isSetting = true
                                    botMsg.edit(`${data[songCount]} [${songCount + 1}/${data.length}]`)
                                    _connection = connection
                                    dispatcher = _connection.play(`\\song/${cart}/${data[songCount]}`)
                                    dispatcher.on("finish", () => {
                                        if (songCount + 1 <= data.length) {
                                            songCount++
                                            song()
                                        } else {
                                            botMsg.edit('전곡 재생 완료')
                                            msg.member.voice.channel.leave();
                                            songCount = 0
                                            data = ''
                                        }
                                    })
                                })
                            })
                        })
                    })
                }
            })
        } else {
            dispatcher = _connection.play(`\\song/${cart}/${data[songCount]}`)
            dispatcher.on("finish", () => {
                if (songCount + 1 <= data.length) {
                    songCount++
                    song()
                } else {
                    botMsg.edit('전곡 재생 완료')
                    msg.member.voice.channel.leave();
                    songCount = 0
                    data = ''
                }
            })
        }
    }

    function _day(day, msg, _class) {
        fs.readFile(`./시간표/시간표${_class}/${day}.txt`, 'utf8', (err, data) => {
            msg.channel.send(`${data} \n시간표 등록은 일별로 txt파일을 만들어 alex108902@naver.com에 시간표 + 반 제목으로 보내주세요.`)
        })
    }

    function Calculation() {
        msg.channel.send('측정을 시작합니다.\n측정은 10억번의 경우의수를 합쳐 만들어지며 시간이 약 20분 이상소모될수 있습니다.').then(msg => {
            let t = 0, k = 0, i = 0, j = 0, result = [], count = 1, count1 = 0, count2 = 0, plus1 = [], plus2 = []
            while (k < 10000000) {
                while (i < 100) {
                    result.push(Math.floor(Math.random() * (3 - 1)) + 1)
                    i++
                }
                while (j < result.length) {
                    if (result[j] === 2) {
                        count1++
                    } else if (result[j] === 1) {
                        count2++
                    }
                    j++
                }
                plus1.push(count1)
                plus2.push(count2)
                count++
                k++
                j = 0
                i = 0
                result = []
                count1 = 0
                count2 = 0
            }
            count1 = 0
            count2 = 0
            while (t < plus2.length) {
                count2 = count2 + plus2[t]
                t++
            }
            t = 0
            while (t < plus1.length) {
                count1 += plus1[t]
                t++
            }
            msg.edit(`1번 : ${count1 / plus1.length}%\n2번 : ${count2 / plus2.length}%`)
            percent = `1번 : ${count1 / plus1.length}%\n2번 : ${count2 / plus2.length}%`
            percent = `1번 : 50%\n2번 : 50%`
        })
    }

    function _repeat(msg, content) {
        if (_IsRepeat === 0) {
            _IsRepeat = 1
            repeating(msg, content)
        } else {
            msg.channel.send('이미 반복실행이 진행되고 있습니다.')
        }
    }

    function repeating(msg, content) {
        if (_IsRepeat === 1) {
            _count++
            msg.channel.send(content)
            setTimeout(repeating, 1000, msg, content)
        }
    }

    function _sending(msg, content) {
        let i = 0
        while (i < 5) {
            msg.channel.send(content)
            i++
        }
    }

    function getRndInteger(min, max) {

        return Math.floor(Math.random() * (max - min) ) + min;
      
      }
});

client.on('messageReactionAdd', (reaction, user) => {
    if (isSetting === true) {
        if (reaction.emoji.name === '🔀') {
            if (data != '') {
                song(true)
            }
        } else if (reaction.emoji.name === '⏩') {
            if (data.length <= songCount + 1) {
                botMsg.edit(`마지막 곡입니다.`)
                setTimeout(() => {
                    botMsg.edit(`${data[songCount]} [${songCount + 1}/${data.length}]`)
                }, 1000)
            } else {
                songCount++
                song()
            }
        } else if (reaction.emoji.name === '❌') {
            _channel.leave()
            botMsg.delete()
            isSetting = false
        } else if (reaction.emoji.name === '⏪') {
            if (1 == songCount + 1) {
                botMsg.edit(`첫 곡입니다.`)
                setTimeout(() => {
                    botMsg.edit(`${data[songCount]} [${songCount + 1}/${data.length}]`)
                }, 1000)
            } else {
                songCount--
                song()
            }
        }
    }
    function song(random = false) {
        if (random === true) {
            songCount = Math.floor(Math.random() * data.length)
        }
        if (songCount + 1 <= data.length) {
            botMsg.edit(`${data[songCount]} [${songCount + 1}/${data.length}]`)
        }
        let dispatcher = _connection.play(`F:/song/${cart}/${data[songCount]}`);
        dispatcher.on("finish", () => {
            if (songCount + 1 <= data.length && random === false) {
                songCount++
                song()
            } else if (random === true) {
                song(true)
            } else {
                botMsg.edit('전곡 재생 완료')
                _channel.leave();
                songCount = 0
                data = ''
            }
        })
    }
})

client.on('uncaughtException', err => {
    fs.appendFile('./err.txt', err, (err) => {
        console.log(`${err} \n`)
        process.exit()
    })
})

client.login('');