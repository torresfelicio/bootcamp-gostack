var xhr = new XMLHttpRequest();


xhr.open('GET', 'https://api.github.com/users/torresfelicio');
xhr.send(null);

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) //4 é quando a resposta voltou ok
    {
        console.log(JSON.parse(xhr.responseText));
    }
}