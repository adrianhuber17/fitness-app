
document.querySelector("#searchbar").addEventListener('click',searchUser);

function searchUser(){
    
    fetch('/get-user-json')
    .then(response => response.json())
    .then(data => {

    let userList = data.map(user => user.fullName)
    console.log(userList)
   

    document.querySelector("#searchbar").addEventListener('input',(e)=>{

        let users = [];
        if(e.target.value){
            users = userList.filter(user => user.toLowerCase().includes(e.target.value))
            users = users.map((user,index) => `<li> ${user} </li>`)
        }
        showUsers(users)

    })

    function showUsers(users){

        const html = !users.length ? '' : users.join('');
        document.querySelector('ul').innerHTML = html

    }

    document.querySelector("ul").addEventListener('click',(e)=>{
        
        let selectedUser = e.target.innerText;
        let userObj = data.filter(user => user.fullName === selectedUser)
        let userId = userObj[0].userId
        location.assign(`/other-user-profile?userId=${userId}`)
      })
   
    });
}
