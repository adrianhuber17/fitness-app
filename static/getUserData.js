fetch('/user-data.json')
.then(response => response.json())
.then(responseData => {

    let userData = responseData.userData

    document.querySelector("tr#user").insertAdjacentHTML('beforeend',`<td>${userData.user_id}</td>`)
    document.querySelector("tr#user").insertAdjacentHTML('beforeend',`<td>${userData.first_name}</td>`)
    document.querySelector("tr#user").insertAdjacentHTML('beforeend',`<td>${userData.last_name}</td>`)
    document.querySelector("tr#user").insertAdjacentHTML('beforeend',`<td>${userData.email}</td>`)

    let followingDataArray = responseData.followingData
    let followingCount = followingDataArray.length
    
    document.getElementById("following-h1").innerText = `Following ${followingCount} users`

    let tbody = document.getElementById("following")

    for (followingData of followingDataArray){
        let newRow = tbody.insertRow()
        newRow.insertAdjacentHTML('beforeend',`<td>${followingData.userId}</td>`)
        newRow.insertAdjacentHTML('beforeend',`<td>${followingData.firstName}</td>`)
        newRow.insertAdjacentHTML('beforeend',`<td>${followingData.lastName}</td>`)
        newRow.insertAdjacentHTML('beforeend',`<td>${followingData.email}</td>`)

    }
    
})
