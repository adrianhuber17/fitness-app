fetch('/user-data.json')
.then(response => response.json())
.then(responseData => {

    let userData = responseData[0]

    document.querySelector("tr#user").insertAdjacentHTML('beforeend',`<td>${userData.user_id}</td>`)
    document.querySelector("tr#user").insertAdjacentHTML('beforeend',`<td>${userData.first_name}</td>`)
    document.querySelector("tr#user").insertAdjacentHTML('beforeend',`<td>${userData.last_name}</td>`)
    document.querySelector("tr#user").insertAdjacentHTML('beforeend',`<td>${userData.email}</td>`)

    let followerData = responseData[1]
    console.log(followerData)
    
})
