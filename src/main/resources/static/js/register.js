$(document).ready(function() {
    // on ready
});

async function registerUser() {
    let data = {};
    data.name = document.getElementById('txtFirstName').value;
    data.lastName = document.getElementById('txtLastName').value;
    data.email = document.getElementById('txtEmail').value;
    data.phone = document.getElementById('txtPhone').value;
    data.password = document.getElementById('txtInputPassword').value;

    let repeatPassword = document.getElementById('txtRepeatPassword').value

    if(repeatPassword != data.password) {
        alert('The password and repeated password are different.');
        return;
    }

    const request = await fetch('api/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    alert("Account saved successfully!");
    window.location.href = 'login.html';
}