// Call the dataTables jQuery plugin
$(document).ready(function() {
    loadUsers();
    $('#users').DataTable();
    updateUserInterface();
});

async function loadUsers() {
    const request = await fetch('api/users', {
        method: 'GET',
        headers: getHeaders()
    });
    const users = await request.json();

    console.log(users);

    let userListHTML = '';
    for (let user of users){
        let deleteButton = '<a href="#" onclick="deleteUser(' + user.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
        let editButton = '<a href="#" onclick="editUser(' + user.id + ')" class="btn btn-warning btn-circle btn-sm"><i class="fa fa-user-edit"></i></a>';

        let userTypeIcon = '';
        if (user.type === "1") {
            userTypeIcon = '<img class="img-profile icon-size" src="img/capy1.svg" alt="Capy1">';
        } else if (user.type === "2") {
            userTypeIcon = '<img class="img-profile icon-size" src="img/capy2.svg" alt="Capy2">';
        } else if (user.type === "3") {
            userTypeIcon = '<img class="img-profile icon-size" src="img/capy3.svg" alt="Capy3">';
        } else {
            userTypeIcon = '<img class="img-profile icon-size" src="img/default.svg" alt="Default">';
        }

        let userHTML = '<tr><td>'+ user.id +'</td><td>'+ user.name +' '+ user.lastName +'</td><td>'
        + userTypeIcon + '</td><td>'
        + user.email + '</td><td>'
        + user.phone + '</td><td>'
        + deleteButton + editButton +'</td></tr>';

        userListHTML += userHTML;
    }

    document.querySelector('#users tbody').outerHTML = userListHTML;
}

function getHeaders() {
    return {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.token
        }
}

async function deleteUser(id) {
    if(!confirm("Are you sure to delete this record? ID: " + id)) {
        return;
    }

    const request = await fetch('api/users/' + id, {
        method: 'DELETE',
        headers: getHeaders()
    });

    location.reload();
}

function updateUserInterface() {
    document.getElementById("txt-email-user").outerHTML = localStorage.email;
    let userType = localStorage.getItem('type');
        let iconSrc = '';
        if (userType === '1') {
            iconSrc = 'img/capy1.svg';
        } else if (userType === '2') {
            iconSrc = 'img/capy2.svg';
        } else if (userType === '3') {
            iconSrc = 'img/capy3.svg';
        } else {
            iconSrc = 'img/default.svg';
        }

    document.getElementById("icon-picture").src = iconSrc;
}

function editUser(id) {
    window.location.href = 'edit-user.html?id=' + id;
}
