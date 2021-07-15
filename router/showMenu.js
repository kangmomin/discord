const axios = require('axios')

module.exports = {
    main: async function (msg) {
        const schoolInfo = await this.getSchool(msg)
        // msg.channel.send(schoolInfo)
    },
    getSchool : async function(msg) {
        const cmd = fillter => msg.content.startsWith('$')
        msg.channel.send("학교검색 키워드를 입력해 주십시오. ex) $ 신도")
        msg.channel.awaitMessages(cmd, {max: 1, time: 60000, errors: ['error']})
        .then((keyword) => {
            let count = 0

            console.log(keyword.first().content)
    
            // axios.get(`http://jrady721.cafe24.com/api/school/${keyword}`)
            // .then((res) => {
            //     let result = res;
            //     if(res.length > 1) {
            //         let resultList = new Array()
            //         for (school of res.schools) {
            //             msg.channel.send(`${count} : ${school.name} / ${school.address}`)
            //             .then(() => count++)
            //         }
            //         const number = msg.channel.awaitMessages(cmd, {max: 1, time: 60000, error: ['error']})
            //         result = res.schools[number]
            //     }
            //     return result
            // })
        })
        .catch(err => console.log("| error |" + err))
    },
    getMenu : async function (info) {

    }
}