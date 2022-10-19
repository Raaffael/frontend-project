var $body = $('body');
var $textInput = $('#textInput');
var $keyInput = $('#keyInput');
var $encryptButton = $('#encrypt')



run();





function run(){
    $encryptButton.click(function(){
        encryptData($textInput.val(),$keyInput.val())
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
        alert('Your encrypted message is: '+result.result)
    } catch (error) {
        console.error(error);
    }
}

