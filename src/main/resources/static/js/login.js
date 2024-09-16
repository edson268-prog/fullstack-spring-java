$(document).ready(function() {
    // on ready
});

async function login() {
    let data = {};
    data.email = document.getElementById('txtEmail').value;
    data.password = document.getElementById('txtInputPassword').value;
//    alert(data.email);
//    alert(data.password);

    const request = await fetch('api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const response = await request.text();
    alert("response ", response);
    if(response != 'FAIL') {
        localStorage.token = response;
        localStorage.email = data.email;
        window.location.href = 'users.html';
    } else {
        alert("The credentials are not valid. Please try again!")
    }
}