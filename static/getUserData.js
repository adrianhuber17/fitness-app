fetch('/user-data.json')
.then(response => response.json())
.then(responseData => {

    for(let user of responseData){

        document.querySelector("tr#add").insertAdjacentHTML('beforeend',`<td>${user.user_id}</td>`)
        document.querySelector("tr#add").insertAdjacentHTML('beforeend',`<td>${user.first_name}</td>`)
        document.querySelector("tr#add").insertAdjacentHTML('beforeend',`<td>${user.last_name}</td>`)
        document.querySelector("tr#add").insertAdjacentHTML('beforeend',`<td>${user.email}</td>`)
    }
    
})
