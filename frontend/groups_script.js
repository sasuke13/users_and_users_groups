let groups;
const showFormButton = document.querySelector('#showFormButton');
const formContainer = document.querySelector('#formContainer');

const ifChecked = (value) =>  value == 'true' ? 'checked' : '';

const generateButtonObject = (id, text) =>{
    return {
        id: id,
        text: text
    };
}

const generateRow = (data) =>{
    let row = `
    <td>${data.id}</td>
    <td>${data.name}</td>
    <td data-value=${data.data_analytics}>${checkMarkOrCross(data.data_analytics)}</td>
    <td data-value=${data.service_analytics}>${checkMarkOrCross(data.service_analytics)}</td>
    <td data-value=${data.voice_analytics}>${checkMarkOrCross(data.voice_analytics)}</td>
    <td data-value=${data.queue_stats}>${checkMarkOrCross(data.queue_stats)}</td>
    <td data-value=${data.voice_stats}>${checkMarkOrCross(data.voice_stats)}</td>
    <td data-value=${data.video}>${checkMarkOrCross(data.video)}</td>
    <td data-value=${data.smart_access}>${checkMarkOrCross(data.smart_access)}</td>
    <td data-value=${data.diagrams}>${checkMarkOrCross(data.diagrams)}</td>

    <td class="table_button">
    <button data-id=${data.id} id="updateButton">Update</button>
    <button data-id=${data.id} id="deleteButton">Delete</button>
    </td>
    `;
    
    return row
}

const generateCreateRow = (submitButton, closeButton)  =>{
    let row = `
    <td>New group</td>
    <td>
        <input type="text" name="name" id="name" placeholder="Name">
    </td>
    <td>
        <input type="checkbox" name="data_analytics" id="data_analytics" placeholder="Data Analytics">
    </td>
    <td>
    <input type="checkbox" name="service_analytics" id="service_analytics" placeholder="Service Analytics">
    </td>
    <td>
    <input type="checkbox" name="voice_analytics" id="voice_analytics" placeholder="Voice Analytics">
    </td>
    <td>
    <input type="checkbox" name="queue_stats" id="queue_stats" placeholder="Queue Stats">
    </td>
    <td>
    <input type="checkbox" name="voice_stats" id="voice_stats" placeholder="Voice Stats">
    </td>
    <td>
    <input type="checkbox" name="video" id="video" placeholder="Video">
    </td>
    <td>
    <input type="checkbox" name="smart_access" id="smart_access" placeholder="Smart Access">
    </td>
    <td>
    <input type="checkbox" name="diagrams" id="diagrams" placeholder="Diagrams">
    </td>
    <td class="table_button">
        <button id="${submitButton.id}">${submitButton.text}</button>
        <button id="${closeButton.id}">${closeButton.text}</button>
    </td>
    `;

    return row;
}

const generateUpdateRow = (submitButton, closeButton, row, id)  =>{
    let name = row.querySelector('td:nth-child(2)').textContent;
    let data_analytics = row.querySelector('td:nth-child(3)').dataset.value;
    let service_analytics = row.querySelector('td:nth-child(4)').dataset.value;
    let voice_analytics = row.querySelector('td:nth-child(5)').dataset.value;
    let queue_stats = row.querySelector('td:nth-child(6)').dataset.value;
    let voice_stats = row.querySelector('td:nth-child(7)').dataset.value;
    let video = row.querySelector('td:nth-child(8)').dataset.value;
    let smart_access = row.querySelector('td:nth-child(9)').dataset.value;
    let diagrams = row.querySelector('td:nth-child(10)').dataset.value;

    let newRow = `
    <td id="${id}">${id}</td>
    <td>
        <input type="text" name="name" id="name" placeholder="Name" value="${name}">
    </td>
    <td>
        <input type="checkbox" name="data_analytics" id="data_analytics" placeholder="Data Analytics" ${ifChecked(data_analytics)}>
    </td>
    <td>
    <input type="checkbox" name="service_analytics" id="service_analytics" placeholder="Service Analytics" ${ifChecked(service_analytics)}>
    </td>
    <td>
    <input type="checkbox" name="voice_analytics" id="voice_analytics" placeholder="Voice Analytics" ${ifChecked(voice_analytics)}>
    </td>
    <td>
    <input type="checkbox" name="queue_stats" id="queue_stats" placeholder="Queue Stats" ${ifChecked(queue_stats)}>
    </td>
    <td>
    <input type="checkbox" name="voice_stats" id="voice_stats" placeholder="Voice Stats" ${ifChecked(voice_stats)}>
    </td>
    <td>
    <input type="checkbox" name="video" id="video" placeholder="Video" ${ifChecked(video)}>
    </td>
    <td>
    <input type="checkbox" name="smart_access" id="smart_access" placeholder="Smart Access" ${ifChecked(smart_access)}>
    </td>
    <td>
    <input type="checkbox" name="diagrams" id="diagrams" placeholder="Diagrams" ${ifChecked(diagrams)}>
    </td>
    <td class="table_button">
        <button data-id=${id} id="${submitButton.id}">${submitButton.text}</button>
        <button data-id=${id} id="${closeButton.id}">${closeButton.text}</button>
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
    groups.forEach(element => {
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

const clearSelect = (selectId) => {
    let select = document.querySelector(`#${selectId}`);
    while (select.length > 0) {
        select.remove(0);
    }
}

const generateCreateForm = (tableId) => {
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

const processRequestData = (groupsData) => {
    if (Array.isArray(groupsData.groups) && groupsData.groups.length > 0) {

        addRowsFromArray(groupsData.groups);

    } else if(groupsData.group){

        addRow(groupsData.group);
    
    }
}
const processRequestMessages = (groupsData) => {
    if(groupsData.error) {

        alert(groupsData.error[0]);

    } else if(groupsData.errors){
        Object.keys(groupsData.errors).forEach(key => {
            groupsData.errors[key].forEach(element => {
                alert(`${key}: ${element}`)
            });
          });

    }else if(groupsData.message){

        alert(groupsData.message);

    }
};

const fetchGroups = async () => {
    try {
        const response = await fetch('http://localhost:8000/groups/');
        const data = await response.json();
        groups = data.groups;
        processRequestData(data);
    } catch (error) {
        console.error(error);
    }
};

showFormButton.addEventListener('click', async () => {
    clearTable();
    generateCreateForm('table');
});

const dataTable = document.querySelector('#dataTable');

dataTable.addEventListener('click', async (e) => {
    if(e.target.id == 'deleteButton') {
        const group_id = e.target?.dataset?.id;
        if(!group_id)
            return;

        fetch(`http://localhost:8000/groups/${group_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            processRequestMessages(data);
            fetchGroups();
        });
    } else if(e.target.id == 'updateButton') {
        const id = e.target.dataset.id;
        const row = document.querySelector(`tr[id="${id}"]`);

        let saveButton = generateButtonObject('saveButton', 'Save');
        let cancelButton = generateButtonObject('cancelButton', 'Cancel');

        row.innerHTML = generateUpdateRow(saveButton, cancelButton, row, id);

    } else if(e.target.id == 'saveButton') {
        const id = e.target.dataset.id;
        const row = document.querySelector(`tr[id="${id}"]`);

        let name = row.querySelector('td:nth-child(2)').querySelector('input');
        let data_analytics = row.querySelector('td:nth-child(3)').querySelector('input');
        let service_analytics = row.querySelector('td:nth-child(4)').querySelector('input');
        let voice_analytics = row.querySelector('td:nth-child(5)').querySelector('input');
        let queue_stats = row.querySelector('td:nth-child(6)').querySelector('input');
        let voice_stats = row.querySelector('td:nth-child(7)').querySelector('input');
        let video = row.querySelector('td:nth-child(8)').querySelector('input');
        let smart_access = row.querySelector('td:nth-child(9)').querySelector('input');
        let diagrams = row.querySelector('td:nth-child(10)').querySelector('input');
        
        let body = {
            "name": name.value,
            "data_analytics": data_analytics.checked,
            "service_analytics": service_analytics.checked,
            "voice_analytics": voice_analytics.checked,
            "queue_stats": queue_stats.checked,
            "voice_stats": voice_stats.checked,
            "video": video.checked,
            "smart_access": smart_access.checked,
            "diagrams": diagrams.checked
        }

        if (!name)
            return callError('Name cannot be blank!');
        
        fetch(`http://localhost:8000/groups/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
            processRequestMessages(data);
            fetchGroups();
        });

        

    } else if(e.target.id == 'cancelButton') {
        const id = e.target.dataset.id;
        const row = document.querySelector(`tr[id="${id}"]`);
        fillRowById(id, row);

    } else if(e.target.id == "sendButton"){
        let name = document.querySelector('#name');
        let data_analytics = document.querySelector('#data_analytics');
        let service_analytics = document.querySelector('#service_analytics');
        let voice_analytics = document.querySelector('#voice_analytics');
        let queue_stats = document.querySelector('#queue_stats');
        let voice_stats = document.querySelector('#voice_stats');
        let video = document.querySelector('#video');
        let smart_access = document.querySelector('#smart_access');
        let diagrams = document.querySelector('#diagrams');
        
        let body = {
            "name": name.value,
            "data_analytics": data_analytics.checked,
            "service_analytics": service_analytics.checked,
            "voice_analytics": voice_analytics.checked,
            "queue_stats": queue_stats.checked,
            "voice_stats": voice_stats.checked,
            "video": video.checked,
            "smart_access": smart_access.checked,
            "diagrams": diagrams.checked
        }

        if (!body.name)
            return callError('Name cannot be blank!');
        
        fetch('http://localhost:8000/groups/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
            processRequestMessages(data)
            fetchGroups();
        });

    } else if(e.target.id == "closeButton"){
        fetchGroups()
    }
});

fetchGroups();