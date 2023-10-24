const addRowsFromArray = (data) => {
    var table = document.querySelector('#table');
        table.innerHTML = '';
        table.innerHTML = `            
        <tr class="hidden" id="edit_form">
            <td id="id"></td>
            <td>
                <input type="email" id="email_edit">
            </td>
            <td>
                <select name="group" id="select_group_edit"></select>
            </td>
            <td>
                <input type="checkbox" name="admin" id="is_admin_edit" placeholder="Is admin">
            </td>
            <td>
                <button id="updateButton">Update</button>
            </td>
        </tr>
    `;
    data.forEach(element => {
        var newRow = document.createElement('tr');
        newRow.id = element.id;
        newRow.innerHTML = `
            <td>${element.id}</td>
            <td>${element.email}</td>
            <td>${element.group.name}</td>
            <td data-value=${element.admin}>${element.admin}</td>
            <td>
            <button class="" data-id=${element.id} id="updateButton">Змінити</button>
            <button class="" data-id=${element.id} id="deleteButton">Видалити</button>
            </td>
        `;
        table.appendChild(newRow);
    });
};

const callError = (message) => {
    if (message)
    alert(message);
}

const addRow = (data) => {
    var table = document.querySelector('#table');
    var newRow = document.createElement('tr');
    newRow.id = data.id;
    newRow.innerHTML = `
        <td>${data.id}</td>
        <td>${data.email}</td>
        <td>${data.group.name}</td>
        <td data-value=${data.admin}>${data.admin}</td>
        <td>
        <button class="" data-id=${data.id} id="updateButton">Змінити</button>
        <button class="" data-id=${data.id} id="deleteButton">Видалити</button>
        </td>
    `;
    table.appendChild(newRow);
};

const fillSelect = (data, select_id) => {
    var select = document.querySelector(`#${select_id}`);

    data.forEach(element =>{
        option = document.createElement('option');
        option.setAttribute('value', element.id);
        option.appendChild(document.createTextNode(element.name));
        select.appendChild(option);
    });
    
};

const processRequest = (userData) => {
    if (Array.isArray(userData.users) && userData.users.length > 0) {

        addRowsFromArray(userData.users);

    } else if(userData.user){

        addRow(userData.user);

    }
    
    if(userData.error) {

        alert(userData.error[0]);

    } else if(userData.message){

        alert(userData.message);

    }
};

const fetchUsers = async () => {
    try {
        const response = await fetch('http://localhost:8000/users/');
        const data = await response.json();
        userData = data.users;
        processRequest(data);
    } catch (error) {
        console.error(error);
    }
};

const fetchGroups = async () => {
    try {
        const response = await fetch('http://localhost:8000/groups/');
        const data = await response.json();
        return data.groups;
    } catch (error) {
        console.error(error);
    }
};

let btn = document.querySelector('#sendButton');

btn.addEventListener('click', (e) => {
    var email = document.querySelector('#email');
    var admin = document.querySelector('#is_admin');
    var select = document.querySelector('#select_group');

    var body = {
        "email": email.value,
        "admin": admin.value,
        "group_id": select.value
    }

    if (!email.value)
        return callError('Email cannot be blank!');
    else if(!select.value)
        delete body.group_id
    
    fetch('http://localhost:8000/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        processRequest(data)
    });

});



const showFormButton = document.querySelector('#showFormButton');
const formContainer = document.querySelector('#formContainer');
const hideFormButtonAndCreateUser = document.querySelector('#sendButton');
const hideFormButton = document.querySelector('#closeButton');

showFormButton.addEventListener('click', async () => {
    var groups = await fetchGroups();
    fillSelect(groups, 'select_group');
    formContainer.classList.remove('hidden');
});

hideFormButtonAndCreateUser.addEventListener('click', () => {
    formContainer.classList.add('hidden');
});

hideFormButton.addEventListener('click', () => {
    formContainer.classList.add('hidden');
});

fetchUsers();


let dataTable = document.querySelector('#dataTable');

dataTable.addEventListener('click', async (e) => {
    if(e.target.id == 'deleteButton') {
        const user_id = e.target?.dataset?.id;
        if(!user_id)
            return;

        fetch(`http://localhost:8000/users/${user_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            processRequest(data);
            fetchUsers();
        });
    } else if(e.target.id == 'updateButton') {
        const id = e.target.dataset.id;
        const row = document.querySelector(`tr[id="${id}"]`);

        const email = row.querySelector('td:nth-child(2)').textContent;
        const group = row.querySelector('td:nth-child(3)').textContent;
        const isAdmin = row.querySelector('td:nth-child(4)').dataset.value;

        var groups = await fetchGroups();

        row.innerHTML = `
            <td id="${id}">${id}</td>
            <td>
                <input type="email" id="email_edit" value="${email}">
            </td>
            <td>
                <select name="group" id="select_group_edit${id}"></select>
            </td>
            <td>
                <input type="checkbox" name="admin" id="is_admin_edit" placeholder="Is admin" ${isAdmin == 'true' ? 'checked' : ''}>
            </td>
            <td>
                <button data-id=${id} id="saveButton">Save</button>
                <button data-id=${id} id="cancelButton">Cancel</button>
            </td>
        `;

        fillSelect(groups, `select_group_edit${id}`);
    } else if(e.target.id == 'saveButton') {
        const id = e.target.dataset.id;

        const row = document.querySelector(`tr[id="${id}"]`);

        const email = row.querySelector('td:nth-child(2)').querySelector('input');
        const group = row.querySelector('td:nth-child(3)').querySelector('select');
        const isAdmin = row.querySelector('td:nth-child(4)').querySelector('input');
        
        var body = {
            "email": email.value,
            "admin": isAdmin.checked,
            "group_id": group.value
        }

        if (!email)
            return callError('Email cannot be blank!');
        else if(!group)
            delete body.group_id;
        
        fetch(`http://localhost:8000/users/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
            processRequest(data)
        });
    } else if(e.target.id == 'cancelButton') {
        const id = e.target.dataset.id;
        const row = document.querySelector(`tr[id="${id}"]`);

        userData.forEach(element => {
            if (element.id == id){
                row.innerHTML = `
                <td>${element.id}</td>
                <td>${element.email}</td>
                <td>${element.group.name}</td>
                <td data-value=${element.admin}>${element.admin}</td>
                <td>
                <button class="" data-id=${element.id} id="updateButton">Змінити</button>
                <button class="" data-id=${element.id} id="deleteButton">Видалити</button>
                </td>
            `;
            }
        });
    }
});

