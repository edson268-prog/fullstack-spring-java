$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    if (userId) {
        loadUser(userId);
    } else {
        console.log('Id not found!!');
    }
});

async function loadUser(id) {
    const request = await fetch(`api/user/${id}`, {
        method: 'GET',
        headers: getHeaders()
    });

    const user = await request.json();
    console.log(user);

    if (user) {
        document.getElementById('txtFirstName').value = user.name;
        document.getElementById('txtLastName').value = user.lastName;
        document.getElementById('txtEmail').value = user.email;
        document.getElementById('txtPhone').value = user.phone;
        document.getElementById('txtHiddenId').value = user.id;
    }

    document.getElementById('txtFirstName').disabled = true;
    document.getElementById('txtLastName').disabled = true;
}

async function updateUser() {
    const userId = document.getElementById('txtHiddenId').value;

    let data = {};
    data.email = document.getElementById('txtEmail').value;
    data.phone = document.getElementById('txtPhone').value;

    const request = await fetch('api/users/' + userId, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });

    alert("Account updated successfully!");
    window.location.href = 'users.html';
}

function getHeaders() {
    return {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
        }
}