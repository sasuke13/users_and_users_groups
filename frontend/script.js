// btn = document.querySelector('#button');

// btn.addEventListener('click', (e)=> {
//     console.log('aaa');
// })

fetch('http://localhost:8000/users/')
    .then(response => response.json())
    .then(data => {
    if (data.users){
        array.forEach(element => {
            
        });
    }
})