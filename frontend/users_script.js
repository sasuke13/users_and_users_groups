let userData;
const showFormButton = document.querySelector('#showFormButton');
// const formContainer = document.querySelector('#formContainer');

const generateButtonObject = (id, text) =>{
    return {
        id: id,
        text: text
    };
}

const generateRow = (data) =>{
    let row = `
    <td>${data.id}</td>
    <td>${data.email}</td>
    <td>${data.group ? data.group.name : "None"}</td>
    <td data-value=${data.admin}>${checkMarkOrCross(data.admin)}</td>
    <td class="table_button">
    <button data-id=${data.id} id="updateButton">Update</button>
    <button data-id=${data.id} id="deleteButton">Delete</button>
    </td>
`;
    
    return row
}

const generateCreateRow = (submitButton, closeButton)  =>{
    let row = `
    <td>New user</td>
    <td>
        <input type="email" name="email" id="email" placeholder="Email">
    </td>
    <td>
        <select name="group" id="select_group"></select>
    </td>
    <td>
        <input type="checkbox" name="admin" id="is_admin" placeholder="Is admin">
    </td>
    <td>
        <button id="sendButton">Send</button>
        <button id="closeButton">Close</button>
    </td>
    `;

    return row;

    
}

const generateUpdateRow = (submitButton, closeButton, row, id)  =>{
    const email = row.querySelector('td:nth-child(2)').textContent;
    const isAdmin = row.querySelector('td:nth-child(4)').dataset.value;


    let newRow = `
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
        <td class="table_button">
            <button data-id=${id} id="saveButton">Save</button>
            <button data-id=${id} id="cancelButton">Cancel</button>
        </td>
    `;

    return newRow;
}

const generateBody = (data) =>{
    let body = {
        "name": data.name,
        "data_analytics": data.data_analytics,
        "service_analytics": data.service_analytics,
        "voice_analytics": data.voice_analytics,
        "queue_stats": data.queue_stats,
        "voice_stats": data.voice_stats,
        "video": data.video,
        "smart_access": data.smart_access,
        "diagrams": data.diagrams
    }

    return body
}

const checkMarkOrCross = (data) =>{
    if( data === false ) {
        return "×";
    } else {
        return "✔";
    }
}

const clearTable = () => {
    let table = document.querySelector('#table');
    table.innerHTML = '';
}

const addRowsFromArray = (data) => {
    let table = document.querySelector('#table');
        table.innerHTML = '';

    data.forEach(element => {
        let newRow = document.createElement('tr');
        newRow.id = element.id;
        newRow.innerHTML = generateRow(element);
        table.appendChild(newRow);
    });
};

const fillRowById = (id, row) => {
    userData.forEach(element => {
        if (element.id == id){
            row.innerHTML = generateRow(element);
        }
    });
}

const addRow = (data) => {
    let table = document.querySelector('#table');
    let newRow = document.createElement('tr');
    newRow.id = data.id;
    newRow.innerHTML = generateRow(data);
    table.appendChild(newRow);
};

const fillSelect = (data, selectId) => {
    let select = document.querySelector(`#${selectId}`);

    option = document.createElement('option');
    option.setAttribute('value', '0');
    option.appendChild(document.createTextNode('None'));
    select.appendChild(option);

    data.forEach(element =>{
        option = document.createElement('option');
        option.setAttribute('value', element.id);
        option.appendChild(document.createTextNode(element.name));
        select.appendChild(option);
    });
    
};

const clearSelect = (selectId) => {
    let select = document.querySelector(`#${selectId}`);
    while (select.length > 0) {
        select.remove(0);
    }
}

const createForm = (tableId) => {
    let table = document.querySelector(`#${tableId}`);
    let newRow = document.createElement('tr');

    let submitButton = generateButtonObject('sendButton', 'Send');
    let closeButton = generateButtonObject('closeButton', 'Close')

    newRow.innerHTML = generateCreateRow(submitButton, closeButton);

    table.appendChild(newRow);
}

const callError = (message) => {
    if (message)
    alert(message);
}

const processRequestData = (usersData) => {
    if (Array.isArray(usersData.users) && usersData.users.length > 0) {

        addRowsFromArray(usersData.users);

    } else if(usersData.user){

        addRow(usersData.user);
    
    }
}
const processRequestMessages = (usersData) => {
    if(usersData.error) {

        alert(usersData.error[0]);

    } else if(usersData.errors){
        Object.keys(usersData.errors).forEach(key => {
            usersData.errors[key].forEach(element => {
                alert(`${key}: ${element}`)
            });
          });

    }else if(usersData.message){

        alert(usersData.message);

    }
};

const fetchUsers = async () => {
    try {
        const response = await fetch('http://localhost:8000/users/');
        const data = await response.json();
        userData = data.users;
        processRequestData(data);
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

showFormButton.addEventListener('click', async () => {
    clearTable()
    createForm('table')
    let groups = await fetchGroups();
    fillSelect(groups, 'select_group');
    // formContainer.classList.remove('hidden');
});

const dataTable = document.querySelector('#dataTable');

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
            processRequestMessages(data);
            fetchUsers();
        });
    } else if(e.target.id == 'updateButton') {
        const id = e.target.dataset.id;
        const row = document.querySelector(`tr[id="${id}"]`);

        let saveButton = generateButtonObject('saveButton', 'Save');
        let cancelButton = generateButtonObject('cancelButton', 'Cancel');

        row.innerHTML = generateUpdateRow(saveButton, cancelButton, row, id);

        let groups = await fetchGroups();

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

        if (!body.email)
            return callError('Email cannot be blank!');
        else if(!body.group_id)
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
            processRequestMessages(data);
            fetchUsers();
        });

    } else if(e.target.id == 'cancelButton') {
        const id = e.target.dataset.id;
        const row = document.querySelector(`tr[id="${id}"]`);
        
        fillRowById(id, row);
    } else if(e.target.id == "sendButton"){
        let email = document.querySelector('#email');
        let admin = document.querySelector('#is_admin');
        let select = document.querySelector('#select_group');
    
        let body = {
            "email": email.value,
            "admin": admin.checked,
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
            processRequestMessages(data)
            fetchUsers();
        });

    } else if(e.target.id == "closeButton"){
        fetchUsers()
    }
});

fetchUsers();
