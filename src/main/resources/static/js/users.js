// Call the dataTables jQuery plugin
$(document).ready(function() {
    loadUsers();
    $('#users').DataTable();
    updateUserEmail();
});

async function loadUsers(){
    const request = await fetch('api/users', {
        method: 'GET',
        headers: getHeaders()
    });
    const users = await request.json();

    console.log(users);

    let userListHTML = '';
    for (let user of users){
        let deleteButton = '<a href="#" onclick="deleteUser(' + user.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

        let userHTML = '<tr><td>'+ user.id +'</td><td>'+ user.name +' '+ user.lastName +'</td><td>'
        + user.email+'</td><td>'+ user.phone
        + '</td><td>'+ deleteButton +'</td></tr>';

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

function updateUserEmail() {
    document.getElementById("txt-email-user").outerHTML = localStorage.email;
}
