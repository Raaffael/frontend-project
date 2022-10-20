var $body = $('body');
var $textInput = $('#textInput');
var $keyInput = $('#keyInput');
var $encryptButton = $('#encrypt');
var $decryptButton = $('#decrypt');
var $generateKey = $('#key');



run();





function run(){
    $decryptButton.click(function(){
        decryptData($textInput.val(),$keyInput.val());
    })
    $encryptButton.click(function(){
        encryptData($textInput.val(),$keyInput.val());
    })
    $generateKey.click(function(){
        $keyInput.val('');
        genKey();
    })
}

async function encryptData(message, secret) {
    try {
        const url = 'https://classify-web.herokuapp.com/api/encrypt';
        const jsonData = JSON.stringify({
            data: message, key: secret
        });
        console.log(jsonData)
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: jsonData
        });
        const result = await response.json();
        console.log(result);
        $textInput.val(result.result);
    } catch (error) {
        console.error(error);
    }
}
async function decryptData(message, secret) {
    try {
        const url = 'https://classify-web.herokuapp.com/api/decrypt';
        const jsonData = JSON.stringify({
            data: message, key: secret
        });
        console.log(jsonData)
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: jsonData
        });
        const result = await response.json();
        console.log(result);
        $textInput.val(result.result);
    } catch (error) {
        console.error(error);
    }
}
async function genKey(){
    try {
        const response = await fetch('https://classify-web.herokuapp.com/api/keygen?length=32?symbols=1');
        const randKey = await response.json();
        $keyInput.val(randKey.key);
    } catch (error) {
        console.error(error)
    }
}

