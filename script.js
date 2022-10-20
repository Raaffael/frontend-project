var $body = $('body');
var $mainDiv = $('<div></div>');
var $textInput = $('<textarea></textarea>');
var $keyDiv = $('<div></div>')
var $keyInput = $('<textarea></textarea>');
var $encryptButton = $('<button>Encrypt</button>');
var $decryptButton = $('<button>Decrypt</button>');
var $generateKey = $('<button>Keygen</button>');

run();

function run() {
    populateDOM();
    $decryptButton.click(function () {
        decryptData($textInput.val(), $keyInput.val());
    })
    $encryptButton.click(function () {
        encryptData($textInput.val(), $keyInput.val());
    })
    $generateKey.click(function () {
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
async function genKey() {
    try {
        const response = await fetch('https://classify-web.herokuapp.com/api/keygen?length=32?symbols=1');
        const randKey = await response.json();
        $keyInput.val(randKey.key);
    } catch (error) {
        console.error(error)
    }
}
function populateDOM() {
    $body.append('<div>' +
        '<p>' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elit velit, hendrerit in lacus congue,' +
        'lobortis egestas purus. Maecenas eget gravida nunc, vitae dictum dolor. Donec sed urna vel metus scelerisque' +
        'ullamcorper. Curabitur id felis suscipit, convallis lorem eu, lacinia tortor. Fusce ut libero eu dui aliquet' +
        'fringilla. Sed non urna est. Sed consectetur, orci nec molestie semper, augue diam feugiat massa, in' +
        'interdum eros mauris vel nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac' +
        'turpis egestas. Donec et euismod erat, nec tincidunt nisi. Nulla accumsan facilisis mi, vel vestibulum leo' +
        'hendrerit quis.' +
        '<br></br>' +
        'Curabitur maximus, mauris at accumsan bibendum, libero leo condimentum sapien, non consectetur nulla neque' +
        'eget diam. Vivamus in velit nec tortor vestibulum suscipit. Praesent volutpat, mi nec vulputate finibus,' +
        'justo est mattis tortor, in molestie ligula lectus sit amet odio. Vestibulum ante ipsum primis in faucibus' +
        'orci luctus et ultrices posuere cubilia curae; Vestibulum nec lorem vel diam luctus rutrum et a magna. Cras' +
        'quis massa faucibus, rhoncus lectus a, suscipit lorem. Sed vulputate tellus in varius vestibulum. Nulla vel' +
        'augue aliquet, posuere sem eget, tristique eros. Vestibulum ante ipsum primis in faucibus orci luctus et' +
        'ultrices posuere cubilia curae; Aliquam egestas enim turpis, ac luctus tellus fringilla vel. Phasellus' +
        'euismod viverra felis. Quisque vel sapien eros. Quisque efficitur nisi at rutrum semper.' +
        '</p>' +
        '</div>')
    $mainDiv.attr('id', 'mainDiv');
    $body.append($mainDiv);
    createTextAreas();
    createButtons();

}
function createButtons() {
    $generateKey.attr('id', 'key');
    $generateKey.addClass('button');
    $keyDiv.append($generateKey);
    $encryptButton.attr('id', 'encrypt');
    $encryptButton.addClass('button');
    $keyDiv.append($encryptButton);
    $decryptButton.attr('id', 'decrypt');
    $decryptButton.addClass('button');
    $keyDiv.append($decryptButton);

}
function createTextAreas() {
    $textInput.attr('id', 'textInput');
    $textInput.attr('placeholder', 'Enter message here...');
    $textInput.addClass('textArea');
    $mainDiv.append($textInput);
    $keyDiv.attr('id', 'keyArea');
    $mainDiv.append($keyDiv);
    $keyInput.attr('id', 'keyInput');
    $keyInput.attr('placeholder', 'Enter key here...');
    $keyInput.addClass('textArea');
    $keyDiv.append($keyInput);
}
