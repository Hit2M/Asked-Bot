const axios = require('axios');
const fs = require('fs');
const readline = require('readline');
const qs = require('querystring');
const BASE_URL = "https://asked.kr";
let number, count;
let idlist = "";

fs.readFile('./number.txt', 'utf-8', (err, data) => {
    number = data;
})

fs.readFile('./id.txt', 'utf-8', (err, data) => {
    idlist = data;
})

function RandomStr() {
    let str = Math.random().toString(36).substr(2,13); 
    return str;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question("input count: ", (ans) => {
    count = ans;
    console.log(`Asked.kr Bot Start\ntarget: ${number} count: ${count}`);
    start();
    rl.close();
})


async function start() {
    for(let i = 0; i < count; i++) {
        let ID, PW;
        ID = RandomStr();
        PW = RandomStr();
        idlist += `\nID: ${ID} & PW: ${PW}\n`;

        let create_res = await axios.default.post(BASE_URL + '/sing_up.php', qs.stringify({
            reg_name: 'sfsfsf',
            reg_email: ID + "@glxm.com",
            reg_id: PW,
            reg_pw: 'qwe123a!',
        }));
        
        let cookie = create_res.headers["set-cookie"][0].split(" ")[0] + " ";
        console.log(`[${i + 1}] ID: ${ID} & PW: ${PW}`);
    
        let follow_res = axios.post(BASE_URL + '/query.php?query=22', qs.stringify({
            num: number,
        }), { headers : { Cookie: cookie }}); 
    }
    fs.writeFile('./id.txt', idlist, 'utf-8', function(err){
    })
}