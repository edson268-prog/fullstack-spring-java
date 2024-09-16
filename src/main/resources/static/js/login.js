$(document).ready(function() {
    // on ready
});

async function login() {
    let data = {};
    data.email = document.getElementById('txtEmail').value;
    data.password = document.getElementById('txtInputPassword').value;

    const request = await fetch('api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (request.ok) {
        const response = await request.json();
        if (response[0] !== 'FAIL') {
            localStorage.token = response[0];
            localStorage.email = data.email;
            localStorage.type = response[1];
            window.location.href = 'users.html';
        } else {
            alert("The credentials are not valid. Please try again!")
        }
    } else {
        alert("An error occurred. Please try again later.");
    }
}