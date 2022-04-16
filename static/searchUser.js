
document.querySelector("#searchbar").addEventListener('click',searchUser);

function searchUser(){
    
    fetch('/get-user-json')
    .then(response => response.json())
    .then(data => {


    let userList = data.users
    console.log(userList)

    document.querySelector("#searchbar").addEventListener('input',(e)=>{

        let users = [];
        if(e.target.value){
            users = userList.filter(user => user.toLowerCase().includes(e.target.value))
            users = users.map(user => `<li> ${user} </li>`)
        }
        showUsers(users)

    })

    function showUsers(users){

        const html = !users.length ? '' : users.join('');
        document.querySelector('ul').innerHTML = html

    }
   
    });

}

