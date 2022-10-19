var $body = $('body');
var $textInput = $('#textInput');
var $keyInput = $('#keyInput');
var $encryptButton = $('#encrypt');
var $generateKey = $('#key');



run();





function run(){
    $encryptButton.click(function(){
        $textInput.val('');
        encryptData($textInput.val(),$keyInput.val())
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
async function genKey(){
    try {
        const response = await fetch('https://classify-web.herokuapp.com/api/keygen?length=32?symbols=1');
        $keyInput.val(response);
        console.log(response.body)
    } catch (error) {
        console.error(error)
    }
}

